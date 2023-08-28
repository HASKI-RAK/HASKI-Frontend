import { resetAllSlices } from '@store'

/**
 * Type definition for {@link mockDataServices}
 * @category Testing
 * @packageDocumentation
 */
type MockDataServices = {
  [key: string]: jest.Mock<any, any>
}

/**
 * Add custom mocks here to be used in tests
 * use import { mockServices } from 'jest.setup' to import mocks
 * use mockServices.<mockName> to access a mock
 * use mockServices.<mockName>.mockImplementationOnce(() => {}) to define a mock for a single test
 * @remarks
 * This file is automatically imported by Jest
 * @packageDocumentation
 * @module jest.setup
 * @category Testing
 * @preferred
 * @see {@link https://jestjs.io/docs/configuration#setupfilesafterenv-array | Jest setupFilesAfterEnv}
 * @see {@link https://jestjs.io/docs/mock-functions | Jest Mock Functions}
 */
const mockDataServices: MockDataServices = {
  getLogout: jest.fn(() => {
    return Promise.resolve()
  }),
  postLoginCredentials: jest.fn(() => {
    return Promise.resolve({
      id: 1,
      lms_user_id: 1,
      name: 'Thaddäus Tentakel',
      role: 'Tester',
      role_id: 1,
      settings: {
        id: 1,
        user_id: 1,
        pswd: '1234',
        theme: 'test'
      },
      university: 'HS Kempten'
    })
  }),
  getUser: jest.fn(() => {
    return Promise.resolve({
      id: 1,
      lms_user_id: 1,
      name: 'Thaddäus Tentakel',
      role: 'Tester',
      role_id: 1,
      settings: {
        id: 1,
        user_id: 1,
        pswd: '1234',
        theme: 'test'
      },
      university: 'HS Kempten'
    })
  }),
  getLearningPathElement: jest.fn(() => {
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
          recommended: false,
          position: 1,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: 'test',
            classification: 'KÜ',
            name: 'test',
            university: 'test',
            created_at: 'test',
            created_by: 'test',
            last_updated: 'test',
            student_learning_element: {
              id: 1,
              student_id: 1,
              learning_element_id: 1,
              done: false,
              done_at: 'test'
            }
          }
        },
        {
          id: 2,
          learning_element_id: 2,
          learning_path_id: 2,
          recommended: false,
          position: 2,
          learning_element: {
            id: 2,
            lms_id: 2,
            activity_type: 'test',
            classification: 'ÜB',
            name: 'test',
            university: 'test',
            created_at: 'test',
            created_by: 'test',
            last_updated: 'test',
            student_learning_element: {
              id: 2,
              student_id: 1,
              learning_element_id: 2,
              done: false,
              done_at: 'test'
            }
          }
        },
        {
          id: 3,
          learning_element_id: 3,
          learning_path_id: 3,
          recommended: false,
          position: 3,
          learning_element: {
            id: 3,
            lms_id: 3,
            activity_type: 'test',
            classification: 'ÜB',
            name: 'test',
            university: 'test',
            created_at: 'test',
            created_by: 'test',
            last_updated: 'test',
            student_learning_element: {
              id: 3,
              student_id: 1,
              learning_element_id: 3,
              done: false,
              done_at: 'test'
            }
          }
        },
        {
          id: 4,
          learning_element_id: 4,
          learning_path_id: 4,
          recommended: false,
          position: 4,
          learning_element: {
            id: 4,
            lms_id: 4,
            activity_type: 'test',
            classification: 'KÜ',
            name: 'test',
            university: 'test',
            created_at: 'test',
            created_by: 'test',
            last_updated: 'test',
            student_learning_element: {
              id: 4,
              student_id: 1,
              learning_element_id: 4,
              done: false,
              done_at: 'test'
            }
          }
        }
      ]
    })
  }),
  getLearningPathTopic: jest.fn(() => {
    return Promise.resolve({
      topics: [
        {
          contains_le: true,
          created_at: 'string',
          created_by: 'string',
          id: 1,
          is_topic: true,
          last_updated: 'string',
          lms_id: 1,
          name: 'Wirtschaftsinformatik',
          parent_id: 1,
          university: 'HS-Kempten',
          student_topic: {
            done: true,
            done_at: 'string',
            id: 1,
            student_id: 1,
            topic_id: 1,
            visits: ['string']
          }
        },
        {
          contains_le: true,
          created_at: 'string',
          created_by: 'string',
          id: 2,
          is_topic: true,
          last_updated: 'string',
          lms_id: 1,
          name: 'Informatik',
          parent_id: 1,
          university: 'HS-Kempten',
          student_topic: {
            done: true,
            done_at: 'string',
            id: 2,
            student_id: 1,
            topic_id: 2,
            visits: ['string']
          }
        }
      ]
    })
  }),
  postContactForm: jest.fn(() => {
    return Promise.resolve
  }),
  postLogin: jest.fn(() => {
    return Promise.resolve({
      expiration: 999999999999999
    })
  }),
  redirectMoodleLogin: jest.fn(() => {
    return Promise.resolve({
      lti_launch_view: 'test'
    })
  }),
  getCourses: jest.fn(() => {
    return Promise.resolve({
      courses: [
        {
          id: 1,
          lms_id: 1,
          name: 'test',
          university: 'test',
          created_at: 'test',
          created_by: 'test',
          last_updated: 'test'
        },
        {
          id: 2,
          lms_id: 2,
          name: 'test',
          university: 'test',
          created_at: 'test',
          created_by: 'test',
          last_updated: 'test'
        }
      ]
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
 * @category Testing
 * @see {@link https://jestjs.io/docs/mock-functions | Jest Mock Functions}
 */
const mockImplementations: { [key: string]: jest.Mock } = {
  ...mockDataServices
  // Add more predefined mocks here
}
/**
 * This object acts as a proxy for {@link mockImplementations}. If a mock is not defined in {@link mockImplementations}, it is created and added to {@link mockImplementations}.
 * @remarks
 * Do not use {@link mockImplementations} directly, use {@link mockServices} instead
 * @category Testing
 * @packageDocumentation
 */
export const mockServices = new Proxy(mockImplementations, {
  get: (target, property, receiver) => {
    // If the mock does exist, return it
    if (typeof property === 'string' && property in mockImplementations) {
      return Reflect.get(target, property, receiver)
    }
    // Return undefined if the mock does not exist
    return undefined
  },
  set: (target, property, value, receiver) => {
    // This gets called when a mock is set via: mockServices.mockName = jest.fn()
    return Reflect.set(target, property, value, receiver)
  }
})

/**
 * This function is called after each test. It removes all mocks that are not defined in {@link mockDataServices}.
 * @remarks
 * By default, all mocks are removed after each test. If you want to keep a mock, add it to {@link mockDataServices}
 * @category Testing
 * @packageDocumentation
 */
afterEach(() => {
  Object.keys(mockImplementations).forEach((key) => {
    if (!(key in mockDataServices)) {
      delete mockImplementations[key]
    }
  })
  // Reset store!
  resetAllSlices()
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
 * @category Testing
 * @preferred
 */
jest.mock<typeof import('@services')>('@services', () => {
  const actualModule = jest.requireActual('@services')
  return new Proxy(actualModule, {
    get: (target, property) => {
      // If a predefined mock exists, use it
      if (typeof property === 'string' && mockServices[property]) {
        return mockServices[property]
      }
      // Otherwise, use the actual implementation
      return Reflect.get(target, property)
    },
    set: (target, property, value, receiver) => {
      // If a predefined mock exists, use it
      if (typeof property === 'string' && mockServices[property]) {
        return true
      }
      // Otherwise, use the actual implementation
      return Reflect.set(target, property, value, receiver)
    }
  })
})
