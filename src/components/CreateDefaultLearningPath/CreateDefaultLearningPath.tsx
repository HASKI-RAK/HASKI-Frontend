import { DndContext, DragEndEvent, UniqueIdentifier, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React, { useState } from 'react'

// ----- Draggable Component -----
type DragAndDropProps = {
  id: UniqueIdentifier
  children: React.ReactNode
}

export const Draggable = ({ id, children }: DragAndDropProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    width: 140,
    height: 140,
    borderRadius: 30,
    border: 'darkgrey',
    transform: transform ? CSS.Translate.toString(transform) : undefined
  }

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  )
}

export const Droppable = ({ id, children }: DragAndDropProps) => {
  const { isOver, setNodeRef } = useDroppable({ id })
  const style = {
    opacity: isOver ? 1 : 0.5,
    border: '2px dashed #ccc',
    padding: '1rem',
    textAlign: 'center' as const
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}

// ----- Create Default Learning Path Component -----
const CreateDefaultLearningPath: React.FC = () => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null)
  const draggableElement = <Draggable id="draggable">Go ahead, drag me.</Draggable>

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event
    setParent(over ? over.id : null)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggableElement : null}
      <Droppable id="droppable">{parent === 'droppable' ? draggableElement : 'Drop here'}</Droppable>
      <Droppable id="droppable-2">{parent === 'droppable-2' ? draggableElement : 'Drop here -2'}</Droppable>
    </DndContext>
  )
}

// ----- Modal and Box Wrapper -----
const styleBox = {
  position: 'absolute',
  left: '12%',
  right: '12%',
  top: '10%',
  overflow: 'auto',
  height: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1
}

const DefaultLearningPathModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={styleBox}>
        <CreateDefaultLearningPath />
      </Box>
    </Modal>
  )
}

export default DefaultLearningPathModal
