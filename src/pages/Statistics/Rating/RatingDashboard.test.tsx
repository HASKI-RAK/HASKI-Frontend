import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import Rating from './Rating'

describe('RatingDashboard tests', () => {
  it('renders correctly and buttons can be pressed', () => {
    const { getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <Rating />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(buttons[1])
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false')
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true')
  })
})
