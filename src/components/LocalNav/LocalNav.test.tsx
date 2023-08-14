import '@testing-library/jest-dom'
import { act, fireEvent, render } from '@testing-library/react'
import LocalNav, { LocalNavProps } from './LocalNav'
import * as router from 'react-router'
import { LearningPathElement, LearningPathLearningElement, Topic, LearningElement } from '@core'
import StudentLearningElement from '../../common/core/StudentLearningElement/StudentLearningElement'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from '../../../jest.setup'
import { renderHook } from '@testing-library/react-hooks'
import { getSortedLearningPath, useLearningPathTopic, useLearningPathElement } from './LocalNav.hooks'
import resetModules = jest.resetModules
import LazyLoadingLearningPathElement, { LazyLoadingLearningPathElementProps } from './LazyLoadingLearningPathElement'

const navigate = jest.fn()

describe('LocalNav', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
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

  const mockLearningPathElement: LearningPathElement = {
    id: 1,
    course_id: 1,
    based_on: 'some-Algorithm',
    calculated_on: 'today',
    path: mockLearningPathLearningElement
  }

  const topics: Topic[] = [
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
    topics: topics
  })

  const mockUseLearningPathElement = jest.fn().mockReturnValue({
    loadingElements: true,
    learningPaths: mockLearningPathElement
  })

  const props: LocalNavProps = {
    useLearningPathTopic: mockUseLearningPathTopic,
    useLearningPathElement: mockUseLearningPathElement
  }

  it('should render the LocalNav', () => {
    const result = render(<LocalNav />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with Topic and learningElementPath loading Topics', () => {
    const { container } = render(<LocalNav {...props} />)

    expect(container.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
  })

  it('should render the LocalNav with Topic and learningElementPath loading Elements', () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: true,
      learningPaths: mockLearningPathElement
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const { getAllByTestId } = render(<LocalNav {...props} />)

    const topicAccordions = getAllByTestId(/topic-Accordion/)
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(topicAccordions[0])
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('true')

    const loadingSkeletons = getAllByTestId(/LocalNav-Skeleton-Element/)
    expect(loadingSkeletons).toHaveLength(1)

    fireEvent.click(topicAccordions[0])
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false')
  })

  it('should render the LocalNav with Topic and learningElementPath rendered', () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const result = render(<LocalNav {...props} />)
    expect(result).toBeTruthy()
  })

  it('should render the LocalNav with Topic and learningElementPath clicked (opened)', () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const { getAllByTestId } = render(<LocalNav {...props} />)

    const topicAccordions = getAllByTestId(/topic-Accordion/)
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(topicAccordions[0])
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(topicAccordions[0])
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false')
  })

  it('should render the LocalNav with Topic and learningElementPath clicked on Element', () => {
    const mockUseLearningPathTopic = jest.fn().mockReturnValue({
      loading: false,
      topics: topics
    })

    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement
    })

    const props: LocalNavProps = {
      useLearningPathTopic: mockUseLearningPathTopic,
      useLearningPathElement: mockUseLearningPathElement
    }

    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LocalNav {...props} />
      </MemoryRouter>
    )

    const topicAccordions = getAllByTestId(/topic-Accordion/)
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(topicAccordions[0])
    expect(topicAccordions[0].getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(getByTestId('Quiz on Chapter 3'))
  })

  it('should render the lazy learning path element with prop mock', () => {
    const mockUseLearningPathElement = jest.fn().mockReturnValue({
      loadingElements: false,
      learningPaths: mockLearningPathElement
    })

    const props: LazyLoadingLearningPathElementProps = {
      topic: topics[0],
      courseId: '2',
      useLearningPathElement: mockUseLearningPathElement
    }

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LazyLoadingLearningPathElement {...props} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('Quiz on Chapter 3'))
  })

  it('should render the lazy learning path element without giving mock prop', () => {
    const props: LazyLoadingLearningPathElementProps = {
      topic: topics[0],
      courseId: '2'
    }

    const { container } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LazyLoadingLearningPathElement {...props} />
      </MemoryRouter>
    )

    expect(container.innerHTML).toContain('MuiSkeleton-root')
  })
})

describe('getSortedLearningPath works as expected', () => {
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

  const topic: Topic = {
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
    const result = await getSortedLearningPath(userid, lmsUserid, studentid, topic, '2', mockFetchLearningPathElement)
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
    expect(mockFetchLearningPathElement).toHaveBeenCalledWith(userid, lmsUserid, studentid, '2', topic.id.toString())
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

    const { result, waitForNextUpdate } = renderHook(() => useLearningPathTopic('2'))

    expect(result.current.loading).toBe(true)
    expect(result.current.topics).toEqual([])

    await waitForNextUpdate()

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

  test('fetches learning path elements for a topic and returns the loading state', async () => {
    mockFetchUser.mockResolvedValueOnce({ settings: { user_id: 1 }, lms_user_id: 1, id: 1 })

    const { result, waitForNextUpdate } = renderHook(() => useLearningPathElement(topic, '2'))

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
    const mockgetLearningPathTopic = jest.fn(() => {
      return Promise.reject(new Error('getLearningPathTopic failed'))
    })

    act(() => {
      mockServices.getLearningPathTopic.mockImplementationOnce(mockgetLearningPathTopic)
      const { result } = renderHook(() => useLearningPathTopic('2'))

      expect(result.current).toBeUndefined()
    })
  })

  test('fetch learningPathElement fails', async () => {
    const topic = {
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

    const mockgetLearningPathElement = jest.fn(() => {
      return Promise.reject(new Error('getLearningPathElement failed'))
    })

    act(() => {
      mockServices.getLearningPathElement.mockImplementationOnce(mockgetLearningPathElement)
      const { result } = renderHook(() => useLearningPathElement(topic, '2'))

      expect(result.current).toBeUndefined()
    })
  })
})
