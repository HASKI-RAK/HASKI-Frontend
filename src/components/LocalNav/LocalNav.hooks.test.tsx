import { renderHook } from '@testing-library/react-hooks'
import { getSortedLearningPath, useLearningPathTopic, useLearningPathElement } from './LocalNav.hooks'
import {LearningPathElement} from "@core";
import {Topic} from "@services";


const initialLearningPathElement: LearningPathElement = {
  id: 99999,
  course_id: 99999,
  based_on: 'initial LearningPathElement',
  calculated_on: 'initial LearningPathElement',
  path: [
    {
      id: 99999,
      learning_element_id: 99999,
      learning_path_id: 99999,
      recommended: true,
      position: 99999,
      learning_element: {
        id: 99999,
        lms_id: 99999,
        activity_type: 'initial LearningPathElement',
        classification: 'initial LearningPathElement',
        name: 'initial LearningPathElement',
        university: 'initial LearningPathElement',
        created_by: 'initial LearningPathElement',
        created_at: 'initial LearningPathElement',
        last_updated: 'initial LearningPathElement',
        student_learning_element: {
          id: 99999,
          student_id: 99999,
          learning_element_id: 99999,
          done: false,
          done_at: 'initial LearningPathElement'
        }
      }
    }
  ]
}

// Mock fetchLearningPath
const mockFetchLearningPathElement = jest.fn().mockResolvedValue({
  id: 99999,
  course_id: 99999,
  based_on: 'mock LearningPathElement',
  calculated_on: 'mock LearningPathElement',
  path: [
    {
      id: 99999,
      learning_element_id: 99999,
      learning_path_id: 99999,
      recommended: true,
      position: 99999,
      learning_element: {
        id: 99999,
        lms_id: 99999,
        activity_type: 'mock LearningPathElement',
        classification: 'mock LearningPathElement',
        name: 'mock LearningPathElement',
        university: 'mock LearningPathElement',
        created_by: 'mock LearningPathElement',
        created_at: 'mock LearningPathElement',
        last_updated: 'mock LearningPathElement',
        student_learning_element: {
          id: 99999,
          student_id: 99999,
          learning_element_id: 99999,
          done: false,
          done_at: 'mock LearningPathElement'
        }
      }
    }
  ]
})

// Mock fetchUser
const mockFetchUser = jest.fn().mockResolvedValue({
  settings: { user_id: 1 },
  lms_user_id: 1,
  id: 1
})

// Mock fetchLearningPathTopic
const mockFetchLearningPathTopic = jest.fn().mockResolvedValue({
  topics: [
    { id: 1, name: 'Topic 1' },
    { id: 2, name: 'Topic 2' },
    { id: 3, name: 'Topic 3' }
  ]
})



describe('getSortedLearningPath', () => {

  const topic: Topic =
    {
      contains_le: true,
      created_at: '2021-09-01T12:00:00.000Z',
      created_by: 'dimitri',
      id: 1,
      is_topic: true,
      last_updated: '2021-09-01T12:00:00.000Z',
      lms_id: 1,
      name: 'Allgemeine Informatik',
      parent_id: 1,
      student_topic: {
        done: false,
        done_at: null,
        id: 1,
        student_id: 1,
        topic_id: 1,
        visits: []
      },
      university: 'HS-KE'
    }

  test('returns a sorted learning path', async () => {
    const userid = 1
    const lmsUserid = 1
    const studentid = 1
    const result = await getSortedLearningPath(userid, lmsUserid, studentid, topic, mockFetchLearningPathElement)
    expect(result).toEqual({
      id: 99999,
      course_id: 99999,
      based_on: 'mock LearningPathElement',
      calculated_on: 'mock LearningPathElement',
      path: [
        {
          id: 99999,
          learning_element_id: 99999,
          learning_path_id: 99999,
          recommended: true,
          position: 99999,
          learning_element: {
            id: 99999,
            lms_id: 99999,
            activity_type: 'mock LearningPathElement',
            classification: 'mock LearningPathElement',
            name: 'mock LearningPathElement',
            university: 'mock LearningPathElement',
            created_by: 'mock LearningPathElement',
            created_at: 'mock LearningPathElement',
            last_updated: 'mock LearningPathElement',
            student_learning_element: {
              id: 99999,
              student_id: 99999,
              learning_element_id: 99999,
              done: false,
              done_at: 'mock LearningPathElement'
            }
          }
        }
      ]
    })
    expect(mockFetchLearningPathElement).toHaveBeenCalledWith(userid, lmsUserid, studentid, 2, topic.id)
  })

  test('fetches learning path topics and returns the loading state', async () => {
    mockFetchUser.mockResolvedValueOnce({ settings: { user_id: 1 }, lms_user_id: 1, id: 1 })
    mockFetchLearningPathTopic.mockResolvedValueOnce({
      topics: [
        { id: 1, name: 'Topic 1' },
        { id: 2, name: 'Topic 2' },
        { id: 3, name: 'Topic 3' }
      ]
    })

    const { result, waitForNextUpdate } = renderHook(() => useLearningPathTopic())

    expect(result.current.loading).toBe(true)
    expect(result.current.topics).toEqual([])

    await waitForNextUpdate()

    expect(result.current.loading).toBe(false)
    expect(result.current.topics).toEqual([{
      contains_le: true,
      created_at: 'string',
      created_by: 'string',
      id: 1,
      is_topic: true,
      last_updated: 'string',
      lms_id: 1,
      name: 'string',
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
    }
    ])
  })

  test('fetches learning path elements for a topic and returns the loading state', async () => {
    mockFetchUser.mockResolvedValueOnce({ settings: { user_id: 1 }, lms_user_id: 1, id: 1 })

    const { result, waitForNextUpdate } = renderHook(() => useLearningPathElement(topic))

    expect(result.current.loadingElements).toBe(true)
    expect(result.current.learningPaths).toEqual(initialLearningPathElement)

    await waitForNextUpdate()

    expect(result.current.loadingElements).toBe(false)
    expect(result.current.learningPaths).toEqual({
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
            created_by: 'string',
            created_at: 'string',
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
  })
})