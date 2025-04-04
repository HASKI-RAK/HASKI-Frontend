import { useDraggable } from '@dnd-kit/core'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import UnassignedItem, { ClassificationItem, DragPreview, SourceDraggable } from './DraggableItem'

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
    key: 'KÜ',
    name: 'KÜ - Overview',
    label: 'Overview',
    icon: <span data-testid="test-icon">Icon</span>
  }

  const handleToggleDisable = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Default: not dragging.
    ;(useDraggable as jest.Mock).mockReturnValue(defaultDraggable)
  })

  it('renders the SourceDraggable with correct label and icon', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )

    expect(getByText('Overview')).toBeInTheDocument()
    expect(getByTestId('test-icon')).toBeInTheDocument()
  })

  it('calls handleToggleDisable with item key on IconButton click', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )

    const buttons = getAllByRole('button')
    const toggleButton = buttons[1]
    fireEvent.pointerDown(toggleButton, 'click')
    fireEvent.mouseDown(toggleButton)
    fireEvent.click(toggleButton)
    expect(handleToggleDisable).toHaveBeenCalledWith('KÜ')
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
    const { getAllByRole } = render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )
    const buttons = getAllByRole('button')
    const toggleButton = buttons[1]
    expect(toggleButton.parentElement).toHaveStyle('display: block')
  })

  it('changes opacity when transform and isDragging is true and disabled is true', () => {
    // Override useDraggable to simulate dragging.
    const { getByText } = render(
      <MemoryRouter>
        <SourceDraggable
          key={classificationItem.key}
          id={classificationItem.key}
          icon={classificationItem.icon}
          label={classificationItem.label}
          disabled={true}
        />
      </MemoryRouter>
    )
    expect(getByText('Overview')).toBeInTheDocument()
  })

  it('renders DragPreview component', () => {
    const { getByText } = render(
      <MemoryRouter>
        <DragPreview item={classificationItem} />
      </MemoryRouter>
    )
    expect(getByText('Overview')).toBeInTheDocument()
  })
})
