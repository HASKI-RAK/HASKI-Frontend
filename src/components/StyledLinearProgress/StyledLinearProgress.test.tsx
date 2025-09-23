import { getByTestId, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { StyledLinearProgress } from '@components'
import { Course } from '@pages'
import { AuthContext } from '@services'

jest.mock('@common/hooks', () => ({
  ...jest.requireActual('@common/hooks'),
  useMediaQuery: jest.fn().mockReturnValue(true)
}))

describe('StyledLinearProgress-1', () => {
  it('renders course page with topics, some learning elements are done (33%)', () => {
    mockServices.fetchLearningPathElementStatus.mockImplementation(() =>
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
          state: 0,
          timecompleted: '1699967821'
        }
      ])
    )

    mockServices.fetchLearningPathElement.mockImplementation(() =>
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
          }
        ]
      })
    )

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    waitFor(() => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent).toBe(
        'components.LinearProgressWithLabel.learningProgress: 1/3'
      )
    })
  })

  it('renders course page with topics, all learning elements are done (100%)', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementation(() =>
      Promise.resolve([
        {
          cmid: 1,
          state: 1,
          timecompleted: '1699967821'
        },
        {
          cmid: 2,
          state: 1,
          timecompleted: '1699967821'
        }
      ])
    )

    mockServices.fetchLearningPathElement.mockImplementation(() =>
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
                done: true,
                done_at: 'test'
              }
            }
          },
          {
            id: 2,
            learning_element_id: 2,
            learning_path_id: 2,
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
                done: true,
                done_at: 'test'
              }
            }
          }
        ]
      })
    )
    await waitFor(() => {
      const { getAllByTestId } = render(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Course />
          </AuthContext.Provider>
        </MemoryRouter>
      )

      waitFor(() => {
        expect(getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent).toBe('Learning progress: 2/2')
      })
    })
  })

  it('renders course page with error', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementation(() => [])

    mockServices.fetchLearningPathElement.mockImplementation(() =>
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
                done: true,
                done_at: 'test'
              }
            }
          }
        ]
      })
    )

    await waitFor(() => {
      const { getAllByTestId } = render(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <Course />
          </AuthContext.Provider>
        </MemoryRouter>
      )

      waitFor(() => {
        expect(getAllByTestId('Course-Card-Topic-Progress')[1].parentNode?.textContent).toBe(
          'components.LinearProgressWithLabel.learningProgress: error..'
        )
      })
    })
  })

  it('renders course page with topics, some learning elements are done (50%)', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementation(() =>
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
        }
      ])
    )

    mockServices.fetchLearningPathElement.mockImplementation(() =>
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
                done: true,
                done_at: 'test'
              }
            }
          }
        ]
      })
    )

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    waitFor(() => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[1].parentNode?.textContent).toBe('1/2')
    })
  })

  it('renders styledLinearProgress without input', () => {
    const styledLinearProgress = render(<StyledLinearProgress />)
    expect(styledLinearProgress).toBeTruthy()
  })
})
describe('Course3', () => {
  it('renders course page with topics, none learning elements are done (0%)', () => {
    mockServices.fetchLearningPathElementStatus.mockImplementation(() =>
      Promise.resolve([
        {
          cmid: 1,
          state: 0,
          timecompleted: '1699967821'
        },
        {
          cmid: 2,
          state: 0,
          timecompleted: '1699967821'
        }
      ])
    )

    mockServices.fetchLearningPathElement.mockImplementation(() =>
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
          }
        ]
      })
    )

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    waitFor(() => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent).toBe(
        'components.LinearProgressWithLabel.learningProgress: 0/2'
      )
    })
  })

  it('renders StyledLinearProgress with 33% progress', () => {
    const { getAllByTestId } = render(<StyledLinearProgress learningElementProgressTopics={[1, 3]} />)
    const styledLinearProgress = getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent
    expect(styledLinearProgress).toBe('components.StyledLinearProgress.linearProgressWithLabel.learningProgress: 1/3')
  })

  it('renders StyledLinearProgress with no progress', () => {
    const { getAllByTestId } = render(<StyledLinearProgress learningElementProgressTopics={[0, 3]} />)
    const styledLinearProgress = getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent
    expect(styledLinearProgress).toBe('components.StyledLinearProgress.linearProgressWithLabel.learningProgress: 0/3')
  })
})
