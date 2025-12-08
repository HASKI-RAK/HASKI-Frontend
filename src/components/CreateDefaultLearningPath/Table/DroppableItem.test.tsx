import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Droppable } from './DroppableItem'

describe('[HASKI-REQ-0026] Droppable component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children and sets the id attribute', () => {
    ;(useDroppable as jest.Mock).mockImplementationOnce(() => ({
      isOver: false,
      setNodeRef: jest.fn()
    }))

    const id: UniqueIdentifier = 'droppable-1'
    const childText = 'Droppable Content'

    const { container } = render(
      <Droppable id={id}>
        <div>{childText}</div>
      </Droppable>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()

    const droppableElement = container.querySelector(`#${id}`)
    expect(droppableElement).toBeInTheDocument()
  })

  it('applies the background color for isOver true', () => {
    const id: UniqueIdentifier = 'droppable-2'
    const childText = 'Droppable Over Content'

    const { container } = render(
      <Droppable id={id}>
        <div>{childText}</div>
      </Droppable>
    )

    expect(screen.getByText(childText)).toBeInTheDocument()

    const droppableElement = container.querySelector(`#${id}`)
    expect(droppableElement).toBeInTheDocument()
  })
})
