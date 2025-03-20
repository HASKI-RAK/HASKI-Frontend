import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode } from 'react'
import React, { ReactElement } from 'react'
import { Box, Grid, IconButton, Paper, Typography } from '@common/components'
import { Block, Replay } from '@common/icons'
import { styled } from '@common/theme'

export const DraggableContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 40,
  display: 'flex',
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'grab',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}))

export type ClassificationItem = {
  key: string
  name: string
  disabled?: boolean
  label?: string
  icon?: ReactElement
}

type SourceDraggableProps = {
  id: UniqueIdentifier
  label?: string
  icon?: ReactNode
  disabled?: boolean
}

type DragPreviewProps = {
  item: ClassificationItem
}

type UnassignedItemProps = {
  item: ClassificationItem
  isDisabled: boolean
  handleToggleDisable: (key: string) => void
}

// Left Column Draggable Item
export const SourceDraggable = ({ id, label, icon, disabled }: SourceDraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'grab'
  }
  return (
    <DraggableContainer
      ref={setNodeRef}
      style={style}
      // Disable drag listeners if the item is disabled.
      {...(disabled ? {} : listeners)}
      {...attributes}>
      <Grid container alignItems="center" spacing={0}>
        <Grid item xs={0.5} />
        <Grid item xs={0.5}>
          {icon}
        </Grid>
        <Grid item xs={11}>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </DraggableContainer>
  )
}

// Draggable Item while Dragging
export const DragPreview = ({ item }: DragPreviewProps) => (
  <DraggableContainer>
    <Grid container alignItems="center" spacing={0}>
      <Grid item xs={0.5} />
      <Grid item xs={1}>
        {item.icon}
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1" sx={{ ml: 2 }}>
          {item.label}
        </Typography>
      </Grid>
    </Grid>
  </DraggableContainer>
)

const UnassignedItem = ({ item, isDisabled, handleToggleDisable }: UnassignedItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: item.key })

  return (
    <Grid item key={item.key} direction="column">
      <Grid item direction="column" sx={{ position: 'relative' }} ref={setNodeRef} {...attributes} {...listeners}>
        <Grid item>
          <SourceDraggable key={item.key} id={item.key} icon={item.icon} label={item.label} disabled={isDisabled} />
          <Box
            sx={{
              position: 'absolute',
              top: 5,
              right: 30,
              zIndex: 1,
              display: isDragging ? 'none' : 'block'
            }}>
            <IconButton
              draggable={false}
              onPointerDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                handleToggleDisable(item.key)
              }}
              size="small"
              sx={{ color: (theme) => theme.palette.primary.main }}>
              {isDisabled ? (
                <Replay fontSize="medium" sx={{ color: (theme) => theme.palette.primary.main }} />
              ) : (
                <Block fontSize="medium" sx={{ color: (theme) => theme.palette.text.primary }} />
              )}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid item>
        <Box height={12} />
      </Grid>
    </Grid>
  )
}

export default UnassignedItem
