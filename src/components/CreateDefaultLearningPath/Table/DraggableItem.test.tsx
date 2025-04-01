import { useDraggable } from '@dnd-kit/core'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import UnassignedItem, { ClassificationItem } from './DraggableItem'

jest.mock('@dnd-kit/core', () => ({
  useDraggable: jest.fn()
}))

describe('UnassignedItem Component', () => {
  const mockSetNodeRef = jest.fn()
  const defaultDraggable = {
    setNodeRef: mockSetNodeRef,
    isDragging: false
  }

  const classificationItem: ClassificationItem = {
    key: 'test-key',
    name: 'Test Name',
    label: 'Test Label',
    icon: <span data-testid="test-icon">Icon</span>
  }

  const handleToggleDisable = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Default: not dragging.
    ;(useDraggable as jest.Mock).mockReturnValue(defaultDraggable)
  })

  it('renders the SourceDraggable with correct label and icon', () => {
    render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('calls handleToggleDisable with item key on IconButton click', () => {
    render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )

    const buttons = screen.getAllByRole('button')
    const toggleButton = buttons[1]
    fireEvent.click(toggleButton)
    expect(handleToggleDisable).toHaveBeenCalledWith('test-key')
  })

  it('renders the Replay icon when isDisabled is true', () => {
    const { container } = render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={true} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )
    const svgElement = container.querySelector('svg')
    expect(svgElement).toBeInTheDocument()
  })

  it('shows the repeat IconButton when classification is blocked', () => {
    // Override useDraggable to simulate dragging.
    ;(useDraggable as jest.Mock).mockReturnValue({
      setNodeRef: mockSetNodeRef,
      isDragging: true
    })
    render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )
    const buttons = screen.getAllByRole('button')
    const toggleButton = buttons[1]
    expect(toggleButton.parentElement).toHaveStyle('display: block')
  })
})
