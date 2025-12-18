import { renderHook, waitFor } from '@testing-library/react'
import { useLearningElementRecommendation } from './LearningElementRecommendation.hooks'
import * as router from 'react-router'
import { mockServices } from 'jest.setup'
import { AuthContext, RoleContext } from '@services'

jest.spyOn(router, 'useParams').mockReturnValue({ courseId: '2', topicId: '1' })

describe('[HASKI-REQ-0072] LearningElementRecommendation', () => {
  it('returns recommendedLearningElement when isAuth is true', async () => {
    const { result } = renderHook(() => useLearningElementRecommendation(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={{ isStudentRole: true, isCourseCreatorRole: false }}>
            {children}
          </RoleContext.Provider>
        </AuthContext.Provider>
      )
    })

    await waitFor(() => {
      expect(result.current.recommendedLearningElement).toBeDefined()
      expect(result.current.recommendedLearningElement).toStrictEqual({
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
      })
    })
  })

  it('returns recommendedLearningElement undefined when isAuth is false', async () => {
    const { result } = renderHook(() => useLearningElementRecommendation(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={{ isStudentRole: true, isCourseCreatorRole: false }}>
            {children}
          </RoleContext.Provider>
        </AuthContext.Provider>
      )
    })

    expect(result.current.recommendedLearningElement).toBeUndefined()
  })

  it('returns recommendedLearningElement undefined when fetchUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch user')))

    const { result } = renderHook(() => useLearningElementRecommendation(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={{ isStudentRole: true, isCourseCreatorRole: false }}>
            {children}
          </RoleContext.Provider>
        </AuthContext.Provider>
      )
    })

    expect(result.current.recommendedLearningElement).toBeUndefined()
  })

  it('returns recommendedLearningElement undefined when fetchLearningPathElementStatus fails', () => {
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch learning element status'))
    )

    const { result } = renderHook(() => useLearningElementRecommendation(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={{ isStudentRole: true, isCourseCreatorRole: false }}>
            {children}
          </RoleContext.Provider>
        </AuthContext.Provider>
      )
    })

    expect(result.current.recommendedLearningElement).toBeUndefined()
  })

  it('returns recommendedLearningElement undefined when fetchUser fails', async () => {
    mockServices.fetchLearningElementRecommendation.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch learning element recommendation'))
    )

    const { result } = renderHook(() => useLearningElementRecommendation(), {
      wrapper: ({ children }) => (
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={{ isStudentRole: true, isCourseCreatorRole: false }}>
            {children}
          </RoleContext.Provider>
        </AuthContext.Provider>
      )
    })

    expect(result.current.recommendedLearningElement).toBeUndefined()
  })
})
