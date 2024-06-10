import '@testing-library/jest-dom'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { mockServices } from 'jest.setup'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { useLearningPathTopic } from '@common/hooks'
import { Topic } from '@core'
import { AuthContext } from '@services'
import LocalNav, { LocalNavProps } from './LocalNav'

import resetModules = jest.resetModules

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}))

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: true,
      addListener: function () {},
      removeListener: function () {}
    }
  }

const navigate = jest.fn()
const useParamsMock = jest.fn().mockReturnValue({ courseId: '1', topicId: '1' })

describe('LocalNav tests', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    jest.spyOn(router, 'useParams').mockImplementation(() => useParamsMock())
  })

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

    const { getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <LocalNav {...props} />
      </MemoryRouter>
    )

    const topic1 = getByText('test')
    expect(topic1.textContent).toContain('test')

    const topic2 = getByText('test2')
    expect(topic2.textContent).toContain('test2')
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

  it('should not render the drawer while the window has a small width', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const result = render(
      <MemoryRouter>
        <LocalNav {...props} />
      </MemoryRouter>
    )
    expect(result).toBeTruthy()
  })
})

describe('getSortedLearningPath works as expected', () => {
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
})

describe('useLearningPathTopic tests', () => {
  beforeEach(() => {
    resetModules()
  })

  test('getLearningPathTopic fails', async () => {
    mockServices.fetchLearningPathTopic.mockImplementationOnce(() =>
      Promise.reject(new Error('getLearningPathTopic failed'))
    )

    const { result } = renderHook(() => useLearningPathTopic('2'))

    await waitFor(() => {
      expect(result.current.loading).toBeTruthy()
      expect(result.current.topics).toStrictEqual([])
    })
  })

  test('getUser fails', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('getUser failed')))

    const { result } = renderHook(() => useLearningPathTopic('2'))

    await waitFor(() => {
      expect(result.current.loading).toBeTruthy()
      expect(result.current.topics).toStrictEqual([])
    })
  })

  /*test('fetch learningPathElement fails', async () => {
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
  })*/

  /*test('useLearningPathElement getUser fails', async () => {
    const mockTopic: Topic = {
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
    }

    mockServices.fetchUser.mockImplementationOnce(() => Promise.reject(new Error('getUser failed')))

    const { result } = renderHook(() => useLearningPathElement(mockTopic, '2'))

    await waitFor(() => {
      expect(result.current.loadingElements).toBeTruthy()
      expect(result.current.learningPaths).toStrictEqual(undefined)
    })
  })*/
})
