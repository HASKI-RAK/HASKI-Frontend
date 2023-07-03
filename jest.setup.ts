// ############################## Common ############################## //
jest.mock('reactflow/dist/style.css', () => jest.fn())
// ############################## Auth ############################## //
export const mockgetUser = jest.fn().mockImplementation(() => {
    return Promise.reject(new Error("getUser failed"));
});
jest.mock('@services', () => {
    return {
        __esModule: true,    //    <----- this __esModule: true is important
        ...jest.requireActual('@services')
    };
})

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
