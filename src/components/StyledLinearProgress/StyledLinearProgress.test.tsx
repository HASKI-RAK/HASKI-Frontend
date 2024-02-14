import { mockServices } from 'jest.setup'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import { Course } from '@pages'

jest.mock('@common/hooks', () => ({
  ...jest.requireActual('@common/hooks'),
  useMediaQuery: jest.fn().mockReturnValue(true)
}))

describe('Course2', () => {
  jest.restoreAllMocks()

  it('renders course page with topics, none learning elements are done (0%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementationOnce(() =>
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

    mockServices.fetchLearningPathElement = jest.fn().mockImplementationOnce(() =>
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

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(async () => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent).toBe('Learning progress: 0/2')
    })
  })
})

describe('Course3', () => {
  jest.restoreAllMocks()

  it('renders course page with topics, some learning elements are done (50%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementationOnce(() =>
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

    mockServices.fetchLearningPathElement = jest.fn().mockImplementationOnce(() =>
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

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent).toBe('Learning progress: 1/2')
    })
  })
})

describe('Course4', () => {
  jest.restoreAllMocks()

  it('renders course page with topics, all learning elements are done (100%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementationOnce(() =>
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

    mockServices.fetchLearningPathElement = jest.fn().mockImplementationOnce(() =>
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

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(async () => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[0].parentNode?.textContent).toBe('Learning progress: 2/2')
    })
  })
})

describe('Course5', () => {
  jest.restoreAllMocks()

  it('renders course page with topics, some learning elements are done (50%)', async () => {
    mockServices.fetchLearningPathElementStatus = jest.fn().mockImplementationOnce(() => Promise.resolve([]))

    mockServices.fetchLearningPathElement = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        course_id: 2,
        based_on: 'string',
        calculated_on: 'string',
        path: []
      })
    )

    const { getAllByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getAllByTestId('Course-Card-Topic-Progress')[1].parentNode?.textContent).toBe('Learning progress: error..')
    })
  })
})
