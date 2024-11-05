import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import StatisticsMenu from './StatisticsMenu'

describe('StatisticsMenu', () => {
  it('renders correctly with isAuth true', () => {
    const statisticsMenu = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <StatisticsMenu />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(statisticsMenu).toBeTruthy()
  })

  it('renders correctly with isAuth false', () => {
    const statisticsMenu = render(
      <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <StatisticsMenu />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(statisticsMenu).toBeTruthy()
  })
})
