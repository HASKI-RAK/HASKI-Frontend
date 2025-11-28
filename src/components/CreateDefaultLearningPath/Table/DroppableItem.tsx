import { ReactNode } from 'react'
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { Paper } from '@common/components'
import { styled } from '@common/theme'

const DroppableContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isover'
})<{ isover: boolean }>(({ theme, isover }) => ({
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: isover ? theme.palette.action.hover : theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius
}))

// Right Column Droppable Container
export const Droppable = ({ id, children }: { id: UniqueIdentifier; children: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <DroppableContainer ref={setNodeRef} isover={isOver} id={id as string}>
      {children}
    </DroppableContainer>
  )
}
