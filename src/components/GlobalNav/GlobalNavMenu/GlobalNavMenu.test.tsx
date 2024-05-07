import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import GlobalNavMenu from './GlobalNavMenu'

const navigate = jest.fn()

describe('FurtherInfoMenu tests', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it('renders correctly with no input', () => {
    const globalNavMenu = render(
      <MemoryRouter>
        <GlobalNavMenu />
      </MemoryRouter>
    )

    expect(globalNavMenu).toBeTruthy()
  })

  it('renders correctly with input and isLoading false', () => {
    const mockProps = {
      id: 'id',
      content: [{ name: 'name', url: 'url' }],
      title: 'title',
      isLoading: false,
      tooltip: 'tooltip'
    }

    const globalNavMenu = render(
      <MemoryRouter>
        <GlobalNavMenu {...mockProps} />
      </MemoryRouter>
    )

    expect(globalNavMenu).toBeTruthy()
  })

  it('renders correctly with input and isLoading true', () => {
    const mockProps = {
      id: 'id',
      content: [{ name: 'name', url: 'url' }],
      title: 'title',
      isLoading: true,
      tooltip: 'tooltip'
    }

    const globalNavMenu = render(
      <MemoryRouter>
        <GlobalNavMenu {...mockProps} />
      </MemoryRouter>
    )

    expect(globalNavMenu).toBeTruthy()
  })

  test('opens and closes menu', async () => {
    const mockProps = {
      id: 'id',
      content: [{ name: 'name', url: 'url' }],
      title: 'title',
      isLoading: false,
      tooltip: 'tooltip'
    }

    const { getByRole } = render(
      <MemoryRouter>
        <GlobalNavMenu {...mockProps} />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))
    fireEvent.click(getByRole('menuitem'))

    expect(navigate).toHaveBeenCalledTimes(1)
  })
})
