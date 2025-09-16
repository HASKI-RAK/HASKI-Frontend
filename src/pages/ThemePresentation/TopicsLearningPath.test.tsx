import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TopicsLearningPath } from '@pages'
import { AuthContext } from '@services'

describe('TopicsLearningPath tests', () => {
  it('should render TopicsLearningPath', async () => {
    const topicsLearningPath = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <TopicsLearningPath />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(topicsLearningPath).toBeTruthy()
  })

  it('should display correct cards', async () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <TopicsLearningPath />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    await waitFor(() => {
      expect(getByText('Themenbereich 1')).toBeInTheDocument()
      expect(getByText('Themenbereich 2')).toBeInTheDocument()
      expect(getByText('Themenbereich 3')).toBeInTheDocument()
    })
  })
})
