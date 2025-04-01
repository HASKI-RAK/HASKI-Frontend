// OpenCreateDefaultLearningPath.test.tsx
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import React from 'react'
import { useCookies } from 'react-cookie'
import { AuthContext, RoleContext, RoleContextType, fetchDefaultLearningPath } from '@services'
import OpenCreateDefaultLearningPath from './OpenCreateDefaultLearningPath'

// --- Mocks --- //
jest.mock('react-cookie', () => ({
  useCookies: jest.fn()
}))

// Mock the privacy modal hook to always return a truthy privacyPolicyCookie.
jest.mock('@components', () => ({
  usePrivacyModal: () => ({ privacyPolicyCookie: true })
}))

// Mock the DefaultLearningPathModal to render a simple div with a test id.
jest.mock('../Modal/CreateDefaultLearningPathModal', () => (props: any) => (
  <div data-testid="default-learning-path-modal" {...props}>
    DefaultLearningPathModal
  </div>
))

// --- Test Suite --- //
describe('OpenCreateDefaultLearningPath component', () => {
  let setCookieMock: jest.Mock

  // Create a dummy provider for AuthContext and RoleContext.
  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  const DummyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
      <RoleContext.Provider value={courseCreatorContext}>{children}</RoleContext.Provider>
    </AuthContext.Provider>
  )

  beforeEach(() => {
    // For useCookies: By default, no cookie.
    setCookieMock = jest.fn()
    ;(useCookies as jest.Mock).mockReturnValue([{}, setCookieMock])
  })

  it('renders the DefaultLearningPathModal when no cookie exists and fetch returns an empty array', async () => {
    // Simulate that no cookie exists.
    ;(useCookies as jest.Mock).mockReturnValue([{}, setCookieMock])
    // Simulate fetching returns an empty array (no default learning path exists).
    mockServices.fetchDefaultLearningPath.mockResolvedValue(jest.fn(() => []))

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath />
      </DummyProvider>
    )

    // Wait for the useEffect to run and update state.
    await waitFor(() => {
      expect(screen.getByTestId('default-learning-path-modal')).toBeInTheDocument()
    })
  })

  it('does not render the DefaultLearningPathModal when the cookie exists', async () => {
    // Simulate that the cookie already exists.
    ;(useCookies as jest.Mock).mockReturnValue([{ default_learningpath_sent_token: true }, setCookieMock])
    // Even if fetchDefaultLearningPath is called, it would not change state.
    ;(fetchDefaultLearningPath as jest.Mock).mockResolvedValue([])

    render(
      <DummyProvider>
        <OpenCreateDefaultLearningPath />
      </DummyProvider>
    )

    // Wait to ensure the component has run its effects.
    await waitFor(() => {
      expect(screen.queryByTestId('default-learning-path-modal')).not.toBeInTheDocument()
    })
  })
})
