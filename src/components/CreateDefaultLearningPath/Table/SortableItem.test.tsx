import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { SortableItem } from './SortableItem'

const originalModule = jest.requireActual('@dnd-kit/sortable')

describe('SortableItem component', () => {
  it('renders the position badge, label, icon, and children correctly', () => {
    ;(useSortable as jest.Mock).mockImplementationOnce(() => ({
      ...originalModule
    }))

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

  it('renders the component with mock active', () => {
    const id: UniqueIdentifier = 'test-id-2'
    const position = 2
    const label = 'Test Label - 2'
    const icon = <span data-testid="test-icon-2">Icon</span>
    const childText = 'Child Content 2'

    render(
      <SortableItem id={id} position={position} label={label} icon={icon}>
        <span data-testid="child-element">{childText}</span>
      </SortableItem>
    )

    expect(screen.getByText(position.toString())).toBeInTheDocument()

    expect(screen.getByText(label)).toBeInTheDocument()

    expect(screen.getByTestId('test-icon-2')).toBeInTheDocument()

    expect(screen.getByText(childText)).toBeInTheDocument()
  })
})
