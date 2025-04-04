import { UniqueIdentifier } from '@dnd-kit/core'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SortableItem } from './SortableItem'

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: jest.fn(() => ({
    attributes: { 'data-testid': 'sortable-attributes' },
    listeners: { onClick: jest.fn() },
    setNodeRef: jest.fn(),
    transform: { x: 0, y: 0, scaleX: 1, scaleY: 1 },
    transition: 'transform 200ms ease',
    isDragging: false
  }))
}))

describe('SortableItem component', () => {
  it('renders the position badge, label, icon, and children correctly', () => {
    const id: UniqueIdentifier = 'test-id'
    const position = 1
    const label = 'Test Label'
    const icon = <span data-testid="test-icon">Icon</span>
    const childText = 'Child Content'

    render(
      <SortableItem id={id} position={position} label={label} icon={icon}>
        <span data-testid="child-element">{childText}</span>
      </SortableItem>
    )

    expect(screen.getByText(position.toString())).toBeInTheDocument()

    expect(screen.getByText(label)).toBeInTheDocument()

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
