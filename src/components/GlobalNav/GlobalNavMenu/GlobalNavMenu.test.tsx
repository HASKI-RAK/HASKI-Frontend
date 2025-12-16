import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import * as router from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import GlobalNavMenu from './GlobalNavMenu'

const navigate = jest.fn()

describe('[HASKI-REQ-0089] GlobalNavMenu tests', () => {
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

  it('renders correctly with input, isLoading false', () => {
    const mockProps = {
      id: 'id',
      content: [{ name: 'name', url: 'url', isDisabled: false, availableAt: new Date() }],
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

  it('renders correctly with input, isLoading true', () => {
    const mockProps = {
      id: 'id',
      content: [{ name: 'name', url: 'url', isDisabled: false, availableAt: new Date() }],
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
      content: [
        { name: 'name', url: 'url', isDisabled: false, availableAt: new Date() },
        { name: 'name', url: 'url', isDisabled: true, availableAt: new Date('3025-05-16T10:00:00') }
      ],
      title: 'title',
      isLoading: false,
      tooltip: 'tooltip'
    }

    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <GlobalNavMenu {...mockProps} />
      </MemoryRouter>
    )

    fireEvent.click(getByRole('button'))
    fireEvent.click(getAllByRole('menuitem')[0])

    expect(navigate).toHaveBeenCalledTimes(1)
  })
})
