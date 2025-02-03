import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ReactFlowProvider } from 'reactflow'
import { mockReactFlow } from '@mocks'
import { AuthContext } from '@services'
import LearningElementLearningPath from './LearningElementLearningPath'

describe('LearningElementLearningPath tests', () => {
  beforeEach(() => {
    mockReactFlow()
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
  })
})
