import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RatingInfoDrawerButton from './RatingInfoDrawerButton'

describe('DashboardInfoDrawerButton tests', () => {
  it('renders open and can be closed', () => {
    jest.useFakeTimers()
    const mockSetIsOpen = jest.fn()
    const { getByRole } = render(
      <MemoryRouter>
        <RatingInfoDrawerButton isOpen={true} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    )

    const button = getByRole('button')
    fireEvent.click(button)
    jest.advanceTimersByTime(50)
    expect(mockSetIsOpen).toHaveBeenCalled()
  })

  it('renders closed and can be opened', () => {
    jest.useFakeTimers()
    const mockSetIsOpen = jest.fn()
    const { getByRole } = render(
      <MemoryRouter>
        <RatingInfoDrawerButton isOpen={false} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    )

    const button = getByRole('button')
    fireEvent.click(button)
    jest.advanceTimersByTime(50)
    expect(mockSetIsOpen).toHaveBeenCalled()
  })
})
