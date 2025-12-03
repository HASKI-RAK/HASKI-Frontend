import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { FC, ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, RoleContext, RoleContextType } from '@services'
import { ReactFlowProvider } from 'reactflow'
import OpenCreateDefaultLearningPath from './OpenCreateDefaultLearningPath'
import { CookiesProvider, useCookies } from 'react-cookie'

describe('[HASKI-REQ-0026] OpenCreateDefaultLearningPath', () => {
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
    const setCookieMock = jest.fn()

    afterEach(() => {
        jest.resetAllMocks()
    })

  // Create a dummy provider for AuthContext and RoleContext.
  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const DummyProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <ReactFlowProvider>
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <RoleContext.Provider value={courseCreatorContext}>{children}</RoleContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    </ReactFlowProvider>
  )

  it('renders the DefaultLearningPathModal when no cookie exists and fetchDefaultLearningPath returns an empty array', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValueOnce([{}, setCookieMock])
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

  it('does render the DefaultLearningPathModal and closes it', async () => {
    ;(useCookies as jest.Mock).mockReturnValueOnce([{ default_learningpath_sent_token: false }, setCookieMock])

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

  it('renders the DefaultLearningPathModal when no cookie exists and fetchDefaultLearningPath returns an error', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValueOnce([{}, setCookieMock])
    // Simulate fetching returns an empty array (no default learning path exists).
    mockServices.fetchDefaultLearningPath.mockImplementation(() => {
      throw new Error('fetchDefaultLearningPath error')
    })

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

  it('renders the DefaultLearningPathModal when no cookie exists and fetchUser returns an error', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValueOnce([{}, setCookieMock])
    // Simulate fetching returns an empty array (no default learning path exists).
    mockServices.fetchUser.mockImplementation(() => {
      throw new Error('fetchUser error')
    })

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
})
