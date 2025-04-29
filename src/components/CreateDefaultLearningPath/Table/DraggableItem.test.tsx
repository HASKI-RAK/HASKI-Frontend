import { useDraggable } from '@dnd-kit/core'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import UnassignedItem, { ClassificationItem, DragPreview, SourceDraggable } from './DraggableItem'

const originalModule = jest.requireActual('@dnd-kit/core')

describe('UnassignedItem Component', () => {
  const classificationItem: ClassificationItem = {
    key: 'KÜ',
    name: 'KÜ - Overview',
    label: 'Overview',
    icon: <span data-testid="test-icon">Icon</span>
  }

  const handleToggleDisable = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
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

  it('does not change opacity when transform, isDragging and isDisabled is false', () => {
    ;(useDraggable as jest.Mock).mockImplementationOnce(() => ({
      ...originalModule,
      transform: null,
      isDragging: false
    }))

    const { getByText } = render(
      <MemoryRouter>
        <SourceDraggable
          key={classificationItem.key}
          id={classificationItem.key}
          icon={classificationItem.icon}
          label={classificationItem.label}
          disabled={false}
        />
      </MemoryRouter>
    )
    expect(getByText('Overview')).toBeInTheDocument()
  })

  it('does change opacity when transform is given and isDragging is true', () => {
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

  it('does change opacity when transform and isDragging is false and disabled is true', () => {
    ;(useDraggable as jest.Mock).mockImplementationOnce(() => ({
      ...originalModule,
      transform: null,
      isDragging: false
    }))

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

  it('calls handleToggleDisable with item key on IconButton click', () => {
    ;(useDraggable as jest.Mock).mockImplementationOnce(() => ({
      ...originalModule
    }))

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
    ;(useDraggable as jest.Mock).mockImplementationOnce(() => ({
      ...originalModule
    }))

    const { container } = render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={true} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )
    const svgElement = container.querySelector('svg')
    expect(svgElement).toBeInTheDocument()
  })

  it('shows the repeat IconButton when classification is blocked', () => {
    ;(useDraggable as jest.Mock).mockImplementationOnce(() => ({
      ...originalModule
    }))

    const { getAllByRole } = render(
      <MemoryRouter>
        <UnassignedItem item={classificationItem} isDisabled={false} handleToggleDisable={handleToggleDisable} />
      </MemoryRouter>
    )
    const buttons = getAllByRole('button')
    const toggleButton = buttons[1]
    expect(toggleButton.parentElement).toHaveStyle('display: block')
  })
})
