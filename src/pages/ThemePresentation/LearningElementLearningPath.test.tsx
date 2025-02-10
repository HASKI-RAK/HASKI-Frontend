import '@testing-library/jest-dom'
import { act, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ReactFlowProvider } from 'reactflow'
import { mockReactFlow } from '@mocks'
import { AuthContext } from '@services'
import LearningElementLearningPath from './LearningElementLearningPath'

jest.useFakeTimers()

describe('LearningElementLearningPath tests', () => {
  beforeEach(() => {
    mockReactFlow()
    jest.clearAllTimers()
  })
  it('should render LearningElementLearningPath', async () => {
    const leLearningPath = render(
      <ReactFlowProvider>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>
            <LearningElementLearningPath />
          </MemoryRouter>
        </AuthContext.Provider>
      </ReactFlowProvider>
    )
    expect(leLearningPath).toBeTruthy()
  })

  it('should display correct nodes', async () => {
    const { getByText } = render(
      <ReactFlowProvider>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <MemoryRouter>
            <LearningElementLearningPath />
          </MemoryRouter>
        </AuthContext.Provider>
      </ReactFlowProvider>
    )
    await waitFor(() => {
      expect(getByText('Kurzübersicht')).toBeInTheDocument()
    })
    act(() => {
      // Replace runAllTimers with a more controlled approach
      jest.advanceTimersByTime(200) // Adjust timing as needed
    })
    await waitFor(() => {
      expect(getByText('Zusammenfassung')).toBeInTheDocument()
    })
  })
})
