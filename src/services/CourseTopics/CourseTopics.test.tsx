import { renderHook, waitFor } from '@testing-library/react'
import { useCourseTopics } from './CourseTopics.hooks'
import { mockServices } from 'jest.setup'
import { AuthContext } from '@services'

describe('useCourseTopics [HASKI-REQ-0055]', () => {
  it('correctly fetches topics from all courses', async () => {
    const { result } = renderHook(() => useCourseTopics(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topics).toHaveLength(4)
      expect(result.current.topics).toStrictEqual([
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
        },
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
      ])
    })
  })

  it('returns an empty topic list when fetchLearningPathTopic fails', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() =>
      Promise.reject(new Error('fetchLearningPathTopic error'))
    )
    const { result } = renderHook(() => useCourseTopics(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.topics).toStrictEqual([])
    })
  })

  it('returns an empty topic list when fetchUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('fetchUser error')))
    const { result } = renderHook(() => useCourseTopics(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(async () => {
      expect(result.current.topics).toStrictEqual([])
    })
  })

  it('returns an empty topic list when fetchCourses fails', async () => {
    mockServices.fetchCourses.mockImplementationOnce(() => Promise.reject(new Error('fetchCourses error')))
    const { result } = renderHook(() => useCourseTopics(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(async () => {
      expect(result.current.topics).toStrictEqual([])
    })
  })

  it('returns an empty topic list when isAuth is false', async () => {
    const { result } = renderHook(() => useCourseTopics(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          {children}
        </AuthContext.Provider>
      )
    })

    await waitFor(async () => {
      expect(result.current.topics).toStrictEqual([])
    })
  })
})
