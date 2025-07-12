import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RatingDashboardDrawerButton from './RatingDashboardDrawerButton'

describe('RatingDashboardDrawerButton', () => {
  it('renders RatingDashboardDrawerButton with isOpen set to true and triggers setIsOpen when the button is clicked', () => {
    jest.useFakeTimers()
    const mockSetIsOpen = jest.fn()
    const { getByRole } = render(
      <MemoryRouter>
        <RatingDashboardDrawerButton isOpen={true} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    )

    const button = getByRole('button')
    fireEvent.click(button)
    jest.advanceTimersByTime(50)
    expect(mockSetIsOpen).toHaveBeenCalled()
  })

  it('renders RatingDashboardDrawerButton with isOpen set to false and triggers setIsOpen when the button is clicked', () => {
    jest.useFakeTimers()
    const mockSetIsOpen = jest.fn()
    const { getByRole } = render(
      <MemoryRouter>
        <RatingDashboardDrawerButton isOpen={false} setIsOpen={mockSetIsOpen} />
      </MemoryRouter>
    )

    const button = getByRole('button')
    fireEvent.click(button)
    jest.advanceTimersByTime(50)
    expect(mockSetIsOpen).toHaveBeenCalled()
  })
})
