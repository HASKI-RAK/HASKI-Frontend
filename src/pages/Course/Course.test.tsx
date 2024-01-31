import { AuthContext } from '@services'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import Course from './Course'
import * as router from 'react-router'
import { mockServices } from 'jest.setup'

const navigate = jest.fn()
jest.useFakeTimers()

describe('Course', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('user is redirected to /login if not Authenticated', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    jest.runAllTimers()
    expect(navigate).toHaveBeenCalledWith('/login')
  })

  it('renders course page with topics, clicking on first topic', async () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, clicking on second topic', async () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[1])
    })

    expect(navigate).toHaveBeenCalledWith('topic/2')
  })

  it('renders course page, clicking button navigates to topic page', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('Course-Card-Topic-Informatik'))
      expect(navigate).toHaveBeenCalledWith('topic/2')
    })
  })

  it('renders course page with topics, getLearningPathElement throws error', async () => {
    mockServices.fetchLearningPathElement.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, getLearningPathElementStatus throws error', async () => {
    mockServices.fetchLearningPathElementStatus.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getAllByRole('button')[0])
    })

    expect(navigate).toHaveBeenCalledWith('topic/1')
  })

  it('renders course page with topics, getUser throws error', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('getLearningPathElement error')
    })

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

  })

  it('renders course page with topics, all learning elements are done (100%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementation(() =>
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

    mockServices.fetchLearningPathElement = jest.fn().mockImplementation(() =>
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
          }
        ]
      })
    )

    const { getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )
  })

  it('renders course page with topics, some learning elements are done (50%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementation(() =>
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

    mockServices.fetchLearningPathElement = jest.fn().mockImplementation(() =>
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
          }
        ]
      })
    )

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

  })

  it('renders course page with topics, none learning elements are done (0%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementation(() =>
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

    mockServices.fetchLearningPathElement = jest.fn().mockImplementation(() =>
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
          }
        ]
      })
    )

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

  })
})
