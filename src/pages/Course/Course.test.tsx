import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import * as router from 'react-router'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType } from '@services'
import Course from './Course'

const navigate = jest.fn()
jest.useFakeTimers()

describe('[HASKI-REQ-0101] Course tests', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  /** [HASKI-REQ-0035] */
  it('renders course page with topics and clicking on first topic navigates to topic/1', async () => {
    const { getAllByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      fireEvent.click(getAllByTestId('Topic-Navigate-Button')[0])
      expect(navigate).toHaveBeenCalledWith('topic/1')
    })
  }, 20000)

  /** [HASKI-REQ-0035] */
  it('renders course page with topics and clicking on second topic navigates to topic/2', async () => {
    const { getAllByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Course />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    await waitFor(() => {
      fireEvent.click(getAllByTestId('Topic-Navigate-Button')[1])
    })

    expect(navigate).toHaveBeenCalledWith('topic/2')
  }, 20000)

  /** [HASKI-REQ-0036] */
  test('students do not see create topic button', async () => {
    const studentContext = {
      isStudentRole: true,
      isCourseCreatorRole: false
    } as RoleContextType

    const { queryByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={studentContext}>
            <Course />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      act(() => {
        expect(queryByText('create-topic-button')).not.toBeInTheDocument()
      })
    })
  })

  /** [HASKI-REQ-0036] */
  test('course creator can see create topic button and open create topic modal', async () => {
    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <Course />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      act(() => {
        expect(getByTestId('create-topic-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-topic-button'))
        expect(getByTestId('create-topic-modal-close-button')).toBeInTheDocument()
        //expect(getAllByTestId('settings-menu')[0]).toBeInTheDocument()
      })
    })
  })

  /** [HASKI-REQ-0036] */
  test('course creator can fill out create topic details and close modal', async () => {
    const courseCreatorContext = {
      isStudentRole: false,
      isCourseCreatorRole: true
    } as RoleContextType

    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>
            <Course />
          </RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      act(() => {
        expect(getByTestId('create-topic-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-topic-button'))
        expect(getByTestId('create-topic-modal-close-button')).toBeInTheDocument()
        fireEvent.click(getByTestId('create-topic-modal-close-button'))
      })
    })
    await waitFor(() => {
      act(() => {
        expect(queryByTestId('create-topic-modal-close-button')).not.toBeInTheDocument()
      })
    })
  })
})
