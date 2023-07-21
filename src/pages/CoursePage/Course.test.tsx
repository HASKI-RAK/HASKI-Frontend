import { AuthContext } from '@services'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import Course from './Course'

describe('Course', () => {
  it('renders the real topics', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <Course />
        </AuthContext.Provider>
      </MemoryRouter>
    )
  })
})
