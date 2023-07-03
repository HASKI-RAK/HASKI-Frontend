// Jest setup file
const original = {
  getUser: jest.fn().mockImplementation(() => {
    console.log('mockgetUser')
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
  })
}
const mockImplementations: { [key: string]: jest.Mock } = {
  ...original,
  // Add more predefined mocks here
}
// use a proxy when the user adds a mock that doesn't exist
export const mockServices = new Proxy(mockImplementations, {
  get: (target, property) => {
    // If the mock does not exist on mocks, return user defined mock
    if (typeof property === 'string' && !(property in mockImplementations)) {
      mockImplementations[property] = jest.fn();
    }
    return Reflect.get(target, property);
  }
});

// cleanup after each test
afterEach(() => {
  // remove key in mockImplementations if not present in original object
  Object.keys(mockImplementations).forEach(key => {
    if (!(key in original)) {
      delete mockImplementations[key];
    }
  })
});


// ############################## Common ############################## //
jest.mock('reactflow/dist/style.css', () => jest.fn())

jest.mock<typeof import("@services")>('@services', () => {
  const actualModule = jest.requireActual('@services');
  return new Proxy(actualModule, {
    get: (target, property) => {
      // If a predefined mock exists, use it
      if (typeof property === 'string' && mockImplementations[property]) {
        return mockImplementations[property];
      }
      // Otherwise, use the actual implementation
      return Reflect.get(target, property);
    }
  });
});

// ############################## Services ############################## //



// const servic = prepareMock("./src/common/services/auth", "getUser", mockgetUser);
// console.log(servic)



// jest.mock<typeof import("@services")>('@services', () => {
//     const services = jest.requireActual<typeof import("@services")>('@services');
//     console.log('mocking services')
//     return {
//         __esModule: true,    //    <----- this __esModule: true is important
//         ...jest.requireActual('@services'),
//         getUser: mockgetUser
//     };
// })
// jest.spyOn(services, 'getLogout').mockImplementation(() => {
//     return Promise.resolve(undefined)
// })

// jest.spyOn(services, 'postLogin').mockImplementation(() => {
//     return Promise.resolve({
//         expiration: 999999999999999,
//     })
// })
// // ############################## Log ############################## //

// // ############################## LearningPath ############################## //
// // SpyOn getLearningPath to return a mock learning path
// jest.spyOn(services, 'getLearningPath').mockImplementation(() => {
//     return Promise.resolve({
//         id: 1,
//         course_id: 2,
//         based_on: 'string',
//         calculated_on: 'string',
//         path: [
//             {
//                 id: 1,
//                 learning_element_id: 1,
//                 learning_path_id: 1,
//                 recommended: true,
//                 position: 1,
//                 learning_element: {
//                     id: 1,
//                     lms_id: 1,
//                     activity_type: 'KÜ',
//                     classification: 'KÜ',
//                     name: 'Kurzüberblick',
//                     university: 'HS-Kempten',
//                     created_at: 'string',
//                     created_by: 'string',
//                     last_updated: 'string',
//                     student_learning_element: {
//                         id: 1,
//                         student_id: 1,
//                         learning_element_id: 1,
//                         done: true,
//                         done_at: 'string'
//                     }
//                 }
//             }
//         ]
//     })
// })
