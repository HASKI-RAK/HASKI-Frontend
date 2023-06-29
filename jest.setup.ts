import * as services from '@services'
// ############################## Common ############################## //
jest.mock('reactflow/dist/style.css', () => jest.fn())
// ############################## Auth ############################## //
// SpyOn getUser to return a mock user
jest.spyOn(services, 'getUser').mockImplementation(() => {
  return Promise.resolve({
    id: 1,
    lmsUserId: 1,
    name: 'Theodor Tester',
    role: 'Tester',
    roleId: 1,
    settings: {
      id: 1,
      userId: 1,
      pswd: 'test',
      theme: 'test'
    },
    university: 'test'
  })
})

jest.spyOn(services, 'getLogout').mockImplementation(() => {
  return Promise.resolve(undefined)
})

jest.spyOn(services, 'postLogin').mockImplementation(() => {
  return Promise.resolve({
    expiration: 999999999999999
  })
})
// ############################## Log ############################## //

// ############################## LearningPath ############################## //
// SpyOn getLearningPath to return a mock learning path
jest.spyOn(services, 'getLearningPath').mockImplementation(() => {
  return Promise.resolve({
    id: 1,
    courseId: 2,
    basedOn: 'string',
    calculatedOn: 'string',
    path: [
      {
        id: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: true,
        position: 1,
        learningElement: {
          id: 1,
          lmsId: 1,
          activityType: 'KÜ',
          classification: 'KÜ',
          name: 'Kurzüberblick',
          university: 'HS-Kempten',
          createdAt: 'string',
          createdBy: 'string',
          lastUpdated: 'string',
          studentLearningElement: {
            id: 1,
            studentId: 1,
            learningElementId: 1,
            done: true,
            doneAt: 'string'
          }
        }
      }
    ]
  })
})
