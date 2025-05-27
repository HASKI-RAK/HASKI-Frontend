import { ReactNode } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grid, Paper, Typography } from '@common/components'
import { styled } from '@common/theme'
import { DraggableContainer } from './DraggableItem'

type SortableItemProps = {
  id: UniqueIdentifier
  children: ReactNode
  position: number
  label?: string
  icon?: ReactNode
  disabled?: boolean
}

const PositionBadge = styled(Paper)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold'
}))

// ----- Sortable Item (Inside Droppable) -----
export const SortableItem = ({ id, children, position, icon, label }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition ?? undefined,
    opacity: isDragging ? 0 : 1
  }
  return (
    <DraggableContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Grid container alignItems="center" spacing={0}>
        <Grid item xs={0.5} />
        <Grid item xs={1}>
          <PositionBadge>{position}</PositionBadge>
        </Grid>
        <Grid item xs={0.5}>
          {icon}
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1">{label}</Typography>
        </Grid>
        <Grid item xs={0.5}>
          {children}
        </Grid>
      </Grid>
    </DraggableContainer>
  )
}
