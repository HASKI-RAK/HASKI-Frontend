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
 * use import { mockServices } from 'jest.setup' to override global mocks
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
  fetchLogout: jest.fn(() => Promise.resolve()),
  postLoginCredentials: jest.fn(() =>
    Promise.resolve({
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
  ),
  fetchUser: jest.fn(() =>
    Promise.resolve({
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
  ),
  fetchDisabledClassifications: jest.fn(() => Promise.resolve(['KÜ', 'EK'])),
  fetchLearningPathElement: jest.fn(() =>
    Promise.resolve({
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
  ),
  postLearningElement: jest.fn(() =>
    Promise.resolve({
      id: 1,
      lms_id: 1,
      activity_type: 'h5p',
      classification: 'KÜ',
      name: 'Introduction to Machine Learning',
      university: 'University of Example',
      created_by: 'Dr. John Smith',
      created_at: '2023-08-10T10:45:00Z',
      last_updated: '2023-09-01T14:30:00Z',
      student_learning_element: {
        id: 10,
        student_id: 11,
        learning_element_id: 1,
        done: true,
        done_at: '2023-09-05T09:15:00Z',
        visits: ['2023-08-12T13:00:00Z', '2023-08-15T15:30:00Z', '2023-09-05T09:00:00Z']
      }
    })
  ),
  fetchLearningPathTopic: jest.fn(() =>
    Promise.resolve({
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
  ),
  postTopic: jest.fn(() =>
    Promise.resolve({
      contains_le: true,
      created_at: '2023-09-15T14:30:00Z',
      created_by: 'Professor Jane Doe',
      id: 3,
      is_topic: true,
      last_updated: '2023-10-01T12:00:00Z',
      lms_id: 3,
      name: 'Introduction to Data Science',
      parent_id: null,
      student_topic: {
        done: false,
        done_at: null,
        id: 2,
        student_id: 10,
        topic_id: 1,
        visits: ['2023-09-16T09:00:00Z', '2023-09-17T10:30:00Z', '2023-09-18T11:00:00Z']
      },
      university: 'HS-KE'
    })
  ),
  postCourse: jest.fn(() =>
    Promise.resolve({
      id: 2,
      lms_id: 2,
      name: 'Introduction to Computer Science',
      university: 'HS-KE',
      created_at: '2024-01-15T10:00:00Z',
      created_by: 1,
      last_updated: '2024-02-10T14:30:00Z',
      start_date: '2024-03-01T09:00:00Z'
    })
  ),
  postCalculateLearningPathForAllStudents: jest.fn(() =>
    Promise.resolve({
      based_on: 'aco',
      calculated_on: '2023-10-10T08:30:00Z',
      course_id: 1,
      id: 5,
      path: '1,2,3,4,5',
      student_id: 1,
      topic_id: 2
    })
  ),
  postContactForm: jest.fn(() => Promise.resolve({ status: undefined })),
  postLogin: jest.fn(() =>
    Promise.resolve({
      expiration: 999999999999999
    })
  ),
  postDefaultLearningPath: jest.fn(() =>
    Promise.resolve([
      {
        classification: 'KÜ',
        position: 1,
        disabled: true,
        university: 'HS-KE'
      },
      {
        classification: 'EK',
        position: 2,
        disabled: true,
        university: 'HS-KE'
      },
      {
        classification: 'ÜB',
        position: 3,
        disabled: false,
        university: 'HS-KE'
      }
    ])
  ),
  fetchRedirectMoodleLogin: jest.fn(() =>
    Promise.resolve({
      lti_launch_view: 'test'
    })
  ),
  fetchCourses: jest.fn(() =>
    Promise.resolve({
      courses: [
        {
          id: 1,
          lms_id: 1,
          name: 'test',
          university: 'test',
          created_at: 'test',
          created_by: 'test',
          last_updated: 'test',
          start_date: 'Thu, 31 Oct 2024 15:05:57 GMT'
        },
        {
          id: 2,
          lms_id: 2,
          name: 'test',
          university: 'test',
          created_at: 'test',
          created_by: 'test',
          last_updated: 'test',
          start_date: 'Thu, 31 Oct 3024 15:05:57 GMT'
        }
      ]
    })
  ),
  fetchILS: jest.fn(() =>
    Promise.resolve({
      characteristic_id: 1,
      id: 1,
      input_dimension: 'test',
      input_value: 1,
      perception_dimension: 'test',
      perception_value: 1,
      processing_dimension: 'test',
      processing_value: 1,
      understanding_dimension: 'test',
      understanding_value: 1
    })
  ),
  fetchListK: jest.fn(() =>
    Promise.resolve({
      att: 1,
      characteristic_id: 1,
      cogn_str: 1,
      con: 1,
      crit_rev: 1,
      eff: 1,
      elab: 1,
      ext_res_mng_str: 1,
      goal_plan: 1,
      id: 1,
      int_res_mng_str: 1,
      lit_res: 1,
      lrn_env: 1,
      lrn_w_cls: 1,
      metacogn_str: 1,
      org: 1,
      reg: 1,
      rep: 1,
      time: 1
    })
  ),
  postILS: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED',
      url: 'http://fakedomain.com:5000/lms/student/1/questionnaire/ils'
    })
  ),
  postCalculateLearningPathILS: jest.fn(() =>
    Promise.resolve({
      based_on: 'graf',
      calculated_on: 'Mon, 24 Mar 2025 15:28:16 GMT',
      course_id: 2,
      id: 2,
      path: 'KÜ, EK, AN, LZ',
      student_id: 1,
      topic_id: 1
    })
  ),
  postListK: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED',
      url: 'http://fakedomain.com:5000/lms/student/1/questionnaire/listk'
    })
  ),
  fetchDefaultLearningPath: jest.fn(() =>
    Promise.resolve([
      {
        classification: 'EK',
        disabled: false,
        id: 25,
        position: 1,
        university: 'HS-KE'
      },
      {
        classification: 'AN',
        disabled: false,
        id: 26,
        position: 2,
        university: 'HS-KE'
      },
      {
        classification: 'FO',
        disabled: false,
        id: 27,
        position: 3,
        university: 'HS-KE'
      },
      {
        classification: 'LZ',
        disabled: true,
        id: 28,
        position: 9000,
        university: 'HS-KE'
      },
      {
        classification: 'KÜ',
        disabled: true,
        id: 29,
        position: 9001,
        university: 'HS-KE'
      },
      {
        classification: 'BE',
        disabled: true,
        id: 30,
        position: 9002,
        university: 'HS-KE'
      }
    ])
  ),
  fetchLearningPathElementStatus: jest.fn(() =>
    Promise.resolve([
      {
        cmid: 1,
        state: 0,
        timecompleted: '1699967821'
      },
      {
        cmid: 2,
        state: 1,
        timecompleted: '1699967821'
      },
      {
        cmid: 3,
        state: 1,
        timecompleted: '1699967821'
      },
      {
        cmid: 4,
        state: 0,
        timecompleted: '1699967821'
      }
    ])
  ),
  fetchLearningPathElementSpecificStatus: jest.fn(() =>
    Promise.resolve([
      {
        cmid: 1,
        state: 0,
        timecompleted: '1699967821'
      },
      {
        cmid: 2,
        state: 1,
        timecompleted: '1699967821'
      },
      {
        cmid: 3,
        state: 1,
        timecompleted: '1699967821'
      },
      {
        cmid: 4,
        state: 0,
        timecompleted: '1699967821'
      }
    ])
  ),
  postLearningPathAlgorithm: jest.fn(() =>
    Promise.resolve({
      contains_le: true,
      created_at: '2023-09-15T14:30:00Z',
      created_by: 'Professor Jane Doe',
      id: 101,
      is_topic: true,
      last_updated: '2023-10-01T12:00:00Z',
      lms_id: 2001,
      name: 'Introduction to Artificial Intelligence',
      parent_id: null,
      student_topic: {
        done: true,
        done_at: '2023-10-05T15:00:00Z',
        id: 501,
        student_id: 1001,
        topic_id: 101,
        visits: ['2023-09-16T09:00:00Z', '2023-09-17T10:30:00Z', '2023-09-18T11:00:00Z', '2023-10-01T14:00:00Z']
      },
      university: 'HS-KE'
    })
  ),
  fetchStudentLpLeAlg: jest.fn(() =>
    Promise.resolve({
      algorithm_id: 1,
      id: 1,
      short_name: 'default',
      student_id: 1,
      topic_id: 1
    })
  ),
  fetchTeacherLpLeAlg: jest.fn(() =>
    Promise.resolve({
      algorithm_id: 1,
      short_name: 'default',
      topic_id: 1
    })
  ),
  postStudentLpLeAlg: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED',
      url: 'https://fakedomain.com:5000/userId/topicId/studentAlgorithm'
    })
  ),
  postTeacherLpLeAlg: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED',
      url: 'https://fakedomain.com:5000/userId/topicId/teacherAlgorithm'
    })
  ),
  fetchNews: jest.fn(() =>
    Promise.resolve({
      news: [
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 1,
          language_id: 'en',
          news_content: 'We are currently testing the site',
          university: 'TH-AB'
        },
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 2,
          language_id: 'en',
          news_content: 'We are currently testing the site',
          university: 'TH-AB'
        }
      ]
    })
  ),
  fetchRemoteTopics: jest.fn(() =>
    Promise.resolve([
      {
        lms_learning_elements: [
          {
            lms_activity_type: 'forum',
            lms_id: 1,
            lms_learning_element_name: 'Announcements'
          },
          {
            lms_activity_type: 'resource',
            lms_id: 38,
            lms_learning_element_name: 'superKnowledge.pdf'
          },
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 39,
            lms_learning_element_name: 'Strategie Übung - Leicht'
          }
        ],
        topic_lms_id: 3,
        topic_lms_name: 'General'
      },
      {
        lms_learning_elements: [
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 4,
            lms_learning_element_name: 'DefinitionDeklaration und AufrufeinerFunktion'
          }
        ],
        topic_lms_id: 4,
        topic_lms_name: 'Bekannte Entwurfsmuster'
      }
    ])
  ),
  fetchRemoteCourses: jest.fn(() =>
    Promise.resolve([
      {
        enddate: 1702166400,
        fullname: 'Kurs-1',
        id: 2,
        shortname: 'kurs',
        startdate: 1670630400,
        timecreated: 1670578503,
        timemodified: 1670578503
      },
      {
        enddate: 1718406000,
        fullname: 'Kurs-2',
        id: 3,
        shortname: 'ku2',
        startdate: 1686870000,
        timecreated: 1686830366,
        timemodified: 1692021711
      }
    ])
  ),
  postBufferContent: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED'
    })
  ),
  postAddAllStudentsToTopics: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED'
    })
  ),
  postAddAllStudentsToCourse: jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 201,
      statusText: 'CREATED'
    })
  ),
  deleteCourse: jest.fn(() =>
    Promise.resolve({
      message: 'Deletion successful!'
    })
  ),
  deleteTopic: jest.fn(() =>
    Promise.resolve({
      message: 'Deletion successful!'
    })
  ),
  deleteLearningElement: jest.fn(() =>
    Promise.resolve({
      message: 'Deletion successful!'
    })
  ),
  postUserSettings: jest.fn(() =>
    Promise.resolve({
      id: 2,
      pswd: null,
      theme: 'HaskiTheme',
      user_id: '2'
    })
  )
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

jest.mock('@dnd-kit/core', () => {
  const originalModule = jest.requireActual('@dnd-kit/core')
  return {
    __esModule: true,
    ...originalModule,
    useDroppable: jest.fn(() => ({
      isOver: true,
      setNodeRef: jest.fn()
    })),
    useDraggable: jest.fn(() => ({
      listeners: {},
      attributes: {
        role: 'button',
        tabIndex: 0,
        'aria-disabled': false,
        'aria-roledescription': 'draggable',
        'aria-describedby': ''
      },
      setNodeRef: jest.fn(),
      isDragging: true,
      transform: {
        x: 0,
        y: 0
      }
    }))
  }
})

jest.mock('@dnd-kit/sortable', () => {
  const originalModule = jest.requireActual('@dnd-kit/sortable')
  return {
    __esModule: true,
    ...originalModule,
    useSortable: jest.fn(() => ({
      attributes: {
        role: 'button',
        tabIndex: 0,
        'aria-disabled': false,
        'aria-roledescription': 'draggable',
        'aria-describedby': ''
      },
      listeners: { onClick: jest.fn() },
      setNodeRef: jest.fn(),
      transform: {
        x: 0,
        y: 0
      },
      transition: 'transform 250ms ease',
      isDragging: true
    }))
  }
})

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
