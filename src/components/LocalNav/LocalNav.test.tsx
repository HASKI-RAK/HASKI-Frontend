import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { LearningElement, LearningPathLearningElement, StudentLearningElement, Topic } from '@core'
import LocalNav, { LocalNavProps } from './LocalNav'
import { getSortedLearningPath, useLearningPathElement, useLearningPathTopic } from './LocalNav.hooks'
import resetModules = jest.resetModules
import { AuthContext } from '@services'

jest.mock('@common/hooks', () => ({
  ...jest.requireActual('@common/hooks'),
  useMediaQuery: jest.fn()
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Preserve the original module behavior
  useParams: jest.fn() // Mock useParams as a jest.fn()
}))

const navigate = jest.fn()
const useParamsMock = jest.fn().mockReturnValue({ courseId: '1', topicId: '1' })

describe('LocalNav tests', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    jest.spyOn(router, 'useParams').mockImplementation(() => useParamsMock())
  })

  const mockStudentLearningElement: StudentLearningElement = {
    id: 1,
    student_id: 1,
    learning_element_id: 1,
    done: false,
    done_at: 'null'
  }

  const mockLearningElement: LearningElement = {
    id: 1,
    lms_id: 1,
    activity_type: 'Quiz',
    classification: 'Formative',
    name: 'Quiz on Chapter 3',
    university: 'HS-KE',
    created_by: 'John Doe',
    created_at: '2023-04-19T10:30:00.000Z',
    last_updated: '2023-04-20T15:45:00.000Z',
    student_learning_element: mockStudentLearningElement
  }

  const mockLearningPathLearningElement: LearningPathLearningElement[] = [
    {
      id: 1,
      learning_element_id: 1,
      learning_path_id: 1,
      recommended: true,
      position: 1,
      learning_element: mockLearningElement
    }
  ]

  const mockTopics: Topic[] = [
    {
      contains_le: true,
      created_at: '2021-09-01T12:00:00.000Z',
      created_by: 'dimitri',
      id: 1,
      is_topic: true,
      last_updated: '2021-09-01T12:00:00.000Z',
      lms_id: 1,
      name: 'test',
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
    },
    {
      contains_le: true,
      created_at: '2021-09-01T12:00:00.000Z',
      created_by: 'dimitri',
      id: 2,
      is_topic: true,
      last_updated: '2021-09-01T12:00:00.000Z',
      lms_id: 1,
      name: 'test2',
      parent_id: 1,
      student_topic: {
        done: false,
        done_at: null,
        id: 2,
        student_id: 1,
        topic_id: 1,
        visits: []
      },
      university: 'HS-KE'
    }
  ]

  const mockUseLearningPathTopic = jest.fn().mockReturnValue({
    loading: true,
    topics: mockTopics
  })

  const props: LocalNavProps = {
    useLearningPathTopic: mockUseLearningPathTopic
  }

  it('should render the LocalNav', () => {
    const result = render(<LocalNav />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with Topic and learningElementPath loading Topics', () => {
    const { container } = render(<LocalNav {...props} />)

    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
  })

  it('should render the LocalNav with Topic and learningElementPath rendered', () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: mockTopics
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic
    }

    const result = render(
      <MemoryRouter>
        <LocalNav {...props} />
      </MemoryRouter>
    )
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with all Topics, as text', () => {
    jest.restoreAllMocks()

    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: mockTopics
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic
    }

    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LocalNav {...props} />
      </MemoryRouter>
    )

    const topicList = getAllByRole('list')
    expect(topicList[0].textContent).toContain('testtest2')
  })

  it('should render the LocalNav with all Topics, as listelements', () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: mockTopics
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic
    }

    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LocalNav {...props} />
      </MemoryRouter>
    )

    const topicList = getAllByRole('listitem')
    expect(topicList.length).toBe(2)
  })

  it('should render the LocalNav with all Topics, clicking on 2nd element', async () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: mockTopics
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic
    }

    const { getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter initialEntries={['/login']}>
          <LocalNav {...props} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await act(async () => {
      const topicList = getAllByRole('button')
      expect(topicList.length).toBe(2)
      fireEvent.click(topicList[1])
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/course/1/topic/2')
      })
    })
  })

  it('should highlight selected topic', async () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: mockTopics
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic
    }

    const { getAllByRole, getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter initialEntries={['/course/1/topic/1']}>
          <LocalNav {...props} />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await act(async () => {
      const topicListButton = getAllByRole('button')
      const topicList = getByTestId('topic-list-item-1')
      expect(topicListButton.length).toBe(2)
      expect(topicListButton[0].textContent).toContain('test')
      expect(topicListButton[1].textContent).toContain('test2')
      fireEvent.click(topicListButton[1])
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/course/1/topic/2')
        expect(topicList).toHaveStyle('background-color: lightgrey')
      })
    })
  })
})

describe('getSortedLearningPath works as expected', () => {
  const mockGetLearningPathElement = jest.fn().mockResolvedValue({
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

  const mockTopic: Topic = {
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
    const mockUserId = 1
    const mockLmsUserId = 1
    const mockStudentId = 1

    const result = await getSortedLearningPath(
      mockUserId,
      mockLmsUserId,
      mockStudentId,
      mockTopic,
      '2',
      mockGetLearningPathElement
    )
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
    expect(mockGetLearningPathElement).toHaveBeenCalledWith(
      mockUserId,
      mockLmsUserId,
      mockStudentId,
      '2',
      mockTopic.id.toString()
    )
  })

  test('fetches learning path topics and returns the loading state', async () => {
    await act(async () => {
      const { result } = renderHook(() => useLearningPathTopic('2'))

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
        expect(result.current.topics).toEqual([
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
  })

  test('fetches learning path elements for a topic and returns the loading state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLearningPathElement(mockTopic, '2'))

    expect(result.current.loadingElements).toBe(true)
    expect(result.current.learningPaths).toBeUndefined()

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
          recommended: false,
          position: 1,
          learning_element: {
            id: 1,
            lms_id: 1,
            activity_type: 'test',
            classification: 'KÜ',
            name: 'test',
            university: 'test',
            created_by: 'test',
            created_at: 'test',
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
          learning_path_id: 2,
          learning_element: {
            activity_type: 'test',
            classification: 'ÜB',
            created_at: 'test',
            created_by: 'test',
            id: 2,
            last_updated: 'test',
            lms_id: 2,
            name: 'test',
            student_learning_element: {
              done: false,
              done_at: 'test',
              id: 2,
              learning_element_id: 2,
              student_id: 1
            },
            university: 'test'
          },
          learning_element_id: 2,
          position: 2,
          recommended: false
        },
        {
          id: 3,
          learning_element: {
            activity_type: 'test',
            classification: 'ÜB',
            created_at: 'test',
            created_by: 'test',
            id: 3,
            last_updated: 'test',
            lms_id: 3,
            name: 'test',
            student_learning_element: {
              done: false,
              done_at: 'test',
              id: 3,
              learning_element_id: 3,
              student_id: 1
            },
            university: 'test'
          },
          learning_element_id: 3,
          learning_path_id: 3,
          position: 3,
          recommended: false
        },
        {
          id: 4,
          learning_path_id: 4,
          learning_element: {
            activity_type: 'test',
            classification: 'KÜ',
            created_at: 'test',
            created_by: 'test',
            id: 4,
            last_updated: 'test',
            lms_id: 4,
            name: 'test',
            student_learning_element: {
              done: false,
              done_at: 'test',
              id: 4,
              learning_element_id: 4,
              student_id: 1
            },
            university: 'test'
          },
          learning_element_id: 4,
          position: 4,
          recommended: false
        }
      ]
    })
  })
})

describe('useLearningPathTopic', () => {
  beforeEach(() => {
    resetModules()
  })

  test('fetch learningPathTopics fails', async () => {
    mockServices.fetchLearningPathTopic = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error('fetchLearningPathTopic failed')))

    act(() => {
      const { result } = renderHook(() => useLearningPathTopic('2'))
      expect(result.current).toBeUndefined()
    })
  })

  test('fetch learningPathElement fails', async () => {
    const mockTopic = {
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
    mockServices.fetchLearningPathElement = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error('fetchLearningPathElement failed')))

    act(() => {
      const { result } = renderHook(() => useLearningPathElement(mockTopic, '2'))
      expect(result.current).toBeUndefined()
    })
  })
})
