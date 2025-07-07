import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RatingInfoDrawerButton from './RatingInfoDrawerButton'

describe('DashboardInfoDrawerButton', () => {
  it('renders RatingInfoDrawerButton with isOpen set to true and triggers setIsOpen when the button is clicked', () => {
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

  it('renders RatingInfoDrawerButton with isOpen set to false and triggers setIsOpen when the button is clicked', () => {
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
