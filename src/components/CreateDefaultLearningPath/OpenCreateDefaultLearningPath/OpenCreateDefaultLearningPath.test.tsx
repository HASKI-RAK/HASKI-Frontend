import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { FC, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType, SnackbarContext } from '@services'
import { ReactFlowProvider } from 'reactflow'
import OpenCreateDefaultLearningPath from './OpenCreateDefaultLearningPath'
import { CookiesProvider, useCookies } from 'react-cookie'

// --- Mocks --- //
jest.mock('react-cookie', () => ({
  useCookies: jest.fn()
}))

class FakeCookiesProvider {
  cookies = {}
  context = {}
  state = {}
  refs = {}
  render() {
    return null
  }
}

const fakePrivacyModalHookReturn = {
  privacyPolicyCookie: new FakeCookiesProvider() as unknown as CookiesProvider,
  handleAccept: jest.fn()
}

describe('OpenCreateDefaultLearningPath component', () => {
  const setCookieMock = jest.fn()

  afterEach(() => {
    jest.resetAllMocks()
    cleanup()
  })

  const addSnackbarMock = jest.fn()
  const mockAddSnackbar = {
    snackbarsErrorWarning: [],
    snackbarsSuccessInfo: [],
    setSnackbarsErrorWarning: (a: any[]) => a,
    setSnackbarsSuccessInfo: (a: any) => a,
    addSnackbar: (a: any) => {
      addSnackbarMock(a)
      return a
    },
    updateSnackbar: (a: any) => a,
    removeSnackbar: (a: any) => a
  }

  // Create a dummy provider for AuthContext and RoleContext.
  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const DummyProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <ReactFlowProvider>
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <SnackbarContext.Provider value={mockAddSnackbar}>
            <RoleContext.Provider value={courseCreatorContext}>{children}</RoleContext.Provider>
          </SnackbarContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    </ReactFlowProvider>
  )

  it('renders the DefaultLearningPathModal when no cookie exists and fetchDefaultLearningPath returns an error', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValue([{}, setCookieMock])
    // Simulate fetching returns an empty array (no default learning path exists).
    mockServices.fetchUser.mockImplementationOnce(
      jest.fn(() => Promise.resolve({ settings: { user_id: 1 }, lms_user_id: 1 }))
    )
    mockServices.fetchDefaultLearningPath.mockRejectedValue(new Error('fetchDefaultLearningPath error'))

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    // Wait for the useEffect to run and update state.
    await waitFor(() => {
      expect(screen.getByTestId('close-default-learning-path-modal-button')).toBeInTheDocument()
      expect(addSnackbarMock).toHaveBeenCalledWith(
        expect.objectContaining({
          autoHideDuration: 3000,
          message: 'error.fetchDefaultLearningPath',
          severity: 'error'
        })
      )
    })
    mockServices.fetchDefaultLearningPath.mockReset()
  })

  it('renders the DefaultLearningPathModal when no cookie exists and fetchDefaultLearningPath returns an empty array', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValueOnce([{}, setCookieMock])
    mockServices.fetchUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )
    // Simulate fetching returns an empty array (no default learning path exists).
    mockServices.fetchDefaultLearningPath.mockImplementationOnce(jest.fn(() => Promise.resolve([])))

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    // Wait for the useEffect to run and update state.
    await waitFor(() => {
      expect(screen.getByTestId('close-default-learning-path-modal-button')).toBeInTheDocument()
    })
  })

  it('does not render the DefaultLearningPathModal when no cookie exists but fetchDefaultLearningPath returns a valid array', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValueOnce([{}, setCookieMock])
    mockServices.fetchUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    await waitFor(() => {
      expect(screen.queryByTestId('close-default-learning-path-modal-button')).not.toBeInTheDocument()
    })
  })

  it('does render the DefaultLearningPathModal and closes it', async () => {
    ;(useCookies as jest.Mock).mockReturnValueOnce([{ default_learningpath_sent_token: false }, setCookieMock])
    mockServices.fetchUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    mockServices.fetchDefaultLearningPath.mockImplementationOnce(jest.fn(() => Promise.resolve([])))

    const { getByTestId, queryByTestId } = render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    await waitFor(() => {
      expect(getByTestId('close-default-learning-path-modal-button')).toBeInTheDocument()
    })
    fireEvent.click(getByTestId('close-default-learning-path-modal-button'))
    await waitFor(() => {
      expect(queryByTestId('default-learning-path-modal')).not.toBeInTheDocument()
    })
  })

  it('does render the DefaultLearningPathModal and closes it with backdropclick', async () => {
    window.confirm = jest.fn(() => true) // always click 'yes'
    ;(useCookies as jest.Mock).mockReturnValueOnce([{ default_learningpath_sent_token: false }, setCookieMock])

    mockServices.fetchDefaultLearningPath.mockImplementationOnce(jest.fn(() => Promise.resolve([])))
    mockServices.fetchUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    const { getByTestId, queryByTestId } = render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    await waitFor(() => {
      expect(getByTestId('close-default-learning-path-modal-button')).toBeInTheDocument()
    })

    const backdrop = document.querySelector('.MuiBackdrop-root')
    if (!backdrop) {
      throw new Error('Backdrop not found! Ensure your modal uses Material UI backdrop structure.')
    }

    fireEvent.mouseDown(backdrop)
    fireEvent.click(backdrop)

    await waitFor(() => {
      expect(queryByTestId('default-learning-path-modal')).not.toBeInTheDocument()
    })
    window.confirm = jest.fn()
  })

  it('does not render the DefaultLearningPathModal when the cookie exists', async () => {
    // Simulate that the cookie already exists.
    ;(useCookies as jest.Mock).mockReturnValueOnce([{ default_learningpath_sent_token: true }, setCookieMock])
    mockServices.fetchUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Thaddäus Tentakel',
        role: 'Tester',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    // Wait to ensure the component has run its effects.
    await waitFor(() => {
      expect(screen.queryByTestId('close-default-learning-path-modal-button')).not.toBeInTheDocument()
    })
  })

  it('renders the DefaultLearningPathModal when no cookie exists and fetchUser returns an error', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValue([{}, setCookieMock])
    // Simulate fetching returns an empty array (no default learning path exists).
    mockServices.fetchUser.mockRejectedValueOnce(new Error('fetchUser error'))

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath usePrivacyModal={() => fakePrivacyModalHookReturn} />
      </DummyProvider>
    )

    // Wait for the useEffect to run and update state.
    await waitFor(() => {
      expect(screen.getByTestId('close-default-learning-path-modal-button')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(addSnackbarMock).toHaveBeenCalledWith(
        expect.objectContaining({
          autoHideDuration: 3000,
          message: 'error.fetchUser',
          severity: 'error'
        })
      )
    })
  })
})
