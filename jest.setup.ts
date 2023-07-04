
type MockDataServices = {
  [key: string]: jest.Mock<any, any>
}

/**
 * Add custom mocks here to be used in tests
 * use import { mockServices } from '@tests/jest.setup' to import mocks
 * use mockServices.<mockName> to access a mock
 * use mockServices.<mockName>.mockImplementationOnce(() => {}) to define a mock for a single test
 * @remarks
 * This file is automatically imported by Jest
 * @packageDocumentation
 * @module jest.setup
 * @preferred
 * @see {@link https://jestjs.io/docs/configuration#setupfilesafterenv-array | Jest setupFilesAfterEnv}
 * @see {@link https://jestjs.io/docs/mock-functions | Jest Mock Functions}
 */
const mockDataServices: MockDataServices = {
  getUser: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      id: 1,
      lmsUserId: 1,
      name: 'string',
      role: 'string',
      roleId: 1,
      settings: {
        id: 1,
        pswd: 'string',
        theme: 'string',
        userId: 1
      },
      university: 'string'
    })
  }),
  getLearningPath: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      id: 1,
      course_id: 2,
      based_on: 'string',
      calculated_on: 'string',
      path: [
        {
          id: 1,
          learning_element_id: 1,
          learning_path_id: 1,
          recommended: true,
          position: 1,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: 'KÜ',
            classification: 'KÜ',
            name: 'Kurzüberblick',
            university: 'HS-Kempten',
            created_at: 'string',
            created_by: 'string',
            last_updated: 'string',
            student_learning_element: {
              id: 1,
              student_id: 1,
              learning_element_id: 1,
              done: true,
              done_at: 'string'
            }
          }
        }
      ]
    })
  }),
  postLogin: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      expiration: 999999999999999
    })
  })
}
/**
 * This object is used to store mocks. After each test, the object is cleaned up.
 * @remarks
 * Do not use this object directly, use the proxy {@link mockServices} instead
 * @packageDocumentation
 * @module jest.setup
 * @preferred
 */
const mockImplementations: { [key: string]: jest.Mock } = {
  ...mockDataServices
  // Add more predefined mocks here
}
/**
 * This object acts as a proxy for {@link mockImplementations}. If a mock is not defined in {@link mockImplementations}, it is created and added to {@link mockImplementations}.
 * @remarks
 * Do not use {@link mockImplementations} directly, use {@link mockServices} instead
 */
export const mockServices = new Proxy(mockImplementations, {
  get: (target, property) => {
    // If the mock does not exist on mocks, return user defined mock
    if (typeof property === 'string' && !(property in mockImplementations)) {
      mockImplementations[property] = jest.fn()
    }
    return Reflect.get(target, property)
  }
})

/**
 * This function is called after each test. It removes all mocks that are not defined in {@link mockDataServices}.
 * @remarks
 * By default, all mocks are removed after each test. If you want to keep a mock, add it to {@link mockDataServices}
 */
afterEach(() => {
  Object.keys(mockImplementations).forEach((key) => {
    if (!(key in mockDataServices)) {
      delete mockImplementations[key]
    }
  })
})
// Reset mock implementations to mockDataServices after each test suite
afterAll(() => {
  Object.keys(mockDataServices).forEach((key) => {
    mockImplementations[key] = mockDataServices[key]
  })
})


// ############################## Common ############################## //

jest.mock('reactflow/dist/style.css', () => jest.fn())

// ############################## Services ############################## //
/**
 * This mock is used to mock all services. If a predefined mock exists, it is used. Otherwise, the actual implementation is used.
 * @remarks
 * If you want to mock a new module, duplicate this mock and replace the module name.
 * @packageDocumentation
 * @module jest.setup
 * @preferred
 */
jest.mock<typeof import('@services')>('@services', () => {
  const actualModule = jest.requireActual('@services')
  return new Proxy(actualModule, {
    get: (target, property) => {
      // If a predefined mock exists, use it
      if (typeof property === 'string' && mockImplementations[property]) {
        return mockImplementations[property]
      }
      // Otherwise, use the actual implementation
      return Reflect.get(target, property)
    }
  })
})
