import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  useDraggable,
  useDroppable
} from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ListItemIcon } from '@mui/material'
import { ReactNode } from 'react'
import React, { ReactElement, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Fab, Grid, IconButton, Modal, Paper, Typography } from '@common/components'
import {
  Article,
  Assignment,
  AssignmentInd,
  AssignmentLate,
  Block,
  Close,
  Description,
  Feedback,
  Flag,
  Forum,
  Replay,
  SettingsApplications,
  ShortText,
  TipsAndUpdates,
  Videocam
} from '@common/icons'
import { styled } from '@common/theme'

// ----- Styled Components -----
const DraggableContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 40,
  display: 'flex',
  alignItems: 'center',
  cursor: 'grab',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}))

const DroppableContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isover'
})<{ isover: boolean }>(({ theme, isover }) => ({
  width: '100%',
  height: '100%',
  minHeight: 450,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: isover ? theme.palette.action.hover : theme.palette.background.paper,
  gap: 0, //theme.spacing(2),
  borderRadius: theme.shape.borderRadius
}))

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

type ClassificationItem = {
  key: string
  name: string
  disabled?: boolean
  label?: string
  icon?: ReactElement
}

type DraggableProps = {
  id: UniqueIdentifier
  children: ReactNode
  label?: string
  icon?: ReactNode
  disabled?: boolean
}

// ----- Source Draggable (Left Column) -----
export const SourceDraggable = ({ id, children, label, icon, disabled }: DraggableProps) => {
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
        <Grid item xs={1}>
          {icon}
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {label}
          </Typography>
        </Grid>
        <Grid item xs={0.5}>
          {children}
        </Grid>
      </Grid>
    </DraggableContainer>
  )
}

// ----- Sortable Item (Inside Droppable) -----
export const SortableItem = ({ id, children, icon, label }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition || undefined,
    opacity: isDragging ? 0 : 1
  }
  return (
    <DraggableContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Grid container alignItems="center" spacing={0}>
        <Grid item xs={0.5} />
        <Grid item xs={1}>
          {icon}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">{label}</Typography>
        </Grid>
        <Grid item xs={2}>
          {children}
        </Grid>
      </Grid>
    </DraggableContainer>
  )
}

// ----- Droppable Container (Right Column) -----
export const Droppable = ({ id, children }: { id: UniqueIdentifier; children: ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <DroppableContainer ref={setNodeRef} isover={isOver} id={id as string}>
      {children}
    </DroppableContainer>
  )
}

type DragPreviewProps = {
  item: ClassificationItem
}

// ----- Drag Preview Component -----
const DragPreview = ({ item }: DragPreviewProps) => (
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

const CreateDefaultLearningPath = () => {
  const { t } = useTranslation()

  // Retrieve classification items from translations.
  const learningElementClassifications: ClassificationItem[] = useMemo(() => {
    return t('components.CreateLearningElementClassificationTable.classifications', {
      returnObjects: true
    })
  }, [t])

  // Map icons to classification keys.
  const iconMapping: Record<string, ReactElement> = {
    LZ: <Flag />,
    KÜ: <ShortText />,
    FO: <Forum />,
    EK: <TipsAndUpdates />,
    AN: <Videocam />,
    BE: <Assignment />,
    AB: <SettingsApplications />,
    ÜB: <AssignmentLate />,
    SE: <AssignmentInd />,
    ZL: <Article />,
    ZF: <Description />,
    RQ: <Feedback />
  }

  const classificationItems = useMemo(() => {
    return learningElementClassifications.map((item) => ({
      ...item,
      label: item.name,
      icon: iconMapping[item.key]
    }))
  }, [learningElementClassifications, iconMapping])

  // State arrays for items in the droppable container and disabled items.
  const [orderedItems, setOrderedItems] = useState<string[]>([])
  const [disabledItems, setDisabledItems] = useState<string[]>([])
  const [activeId, setActiveId] = useState<null | string>(null)

  // Show left items that are not in droppable container.
  const unassignedItems = classificationItems.filter((item) => !orderedItems.includes(item.key))

  // Toggle disable state of an item.
  const handleToggleDisable = (itemKey: string) => {
    if (disabledItems.includes(itemKey)) {
      setDisabledItems((prev) => prev.filter((key) => key !== itemKey))
    } else {
      setDisabledItems((prev) => [...prev, itemKey])
    }
  }

  // Reset an item from the droppable container back to the left.
  const handleResetItem = (itemKey: string) => {
    setOrderedItems((prev) => prev.filter((key) => key !== itemKey))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const activeIdStr = active.id as string
    const overIdStr = over.id as string

    if (orderedItems.includes(activeIdStr)) {
      if (overIdStr === 'droppable-container') {
        const oldIndex = orderedItems.indexOf(activeIdStr)
        const newIndex = orderedItems.length - 1
        if (oldIndex !== newIndex) {
          setOrderedItems(arrayMove(orderedItems, oldIndex, newIndex))
        }
      } else if (activeIdStr !== overIdStr && orderedItems.includes(overIdStr)) {
        const oldIndex = orderedItems.indexOf(activeIdStr)
        const newIndex = orderedItems.indexOf(overIdStr)
        setOrderedItems(arrayMove(orderedItems, oldIndex, newIndex))
      }
      return
    }

    if (orderedItems.includes(overIdStr)) {
      const newIndex = orderedItems.indexOf(overIdStr)
      const newOrderedItems = [...orderedItems]
      newOrderedItems.splice(newIndex, 0, activeIdStr)
      setOrderedItems(newOrderedItems)
    } else {
      setOrderedItems([...orderedItems, activeIdStr])
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!active || !over) return
    const activeIdStr = active.id as string
    if (orderedItems.includes(activeIdStr) && over.id === 'droppable-container') {
      const currentIndex = orderedItems.indexOf(activeIdStr)
      const lastIndex = orderedItems.length - 1
      if (currentIndex !== lastIndex) {
        setOrderedItems(arrayMove(orderedItems, currentIndex, lastIndex))
      }
    }
  }

  const handleRemoveAll = () => {
    setOrderedItems([])
    setDisabledItems([])
  }

  // The submit button is enabled only when every classification item is either dropped or disabled.
  const isSubmitActive = orderedItems.length + disabledItems.length === classificationItems.length

  const handleSubmit = () => {
    console.log('Submitted order:', orderedItems)
    console.log('Disabled items:', disabledItems)
  }

  const activeItem = classificationItems.find((item) => item.key === activeId)

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={() => setActiveId(null)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <DragOverlay>{activeId && activeItem ? <DragPreview item={activeItem} /> : null}</DragOverlay>
        <Box
          sx={{
            flex: 1,
            paddingBottom: (theme) => theme.spacing(10),
            width: '100%',
            overflowY: 'auto'
          }}>
          <Grid container item sx={{ width: '100%', height: '100%' }}>
            {/* Left Column: Unassigned Items with Toggle Disable Button */}
            <Grid item direction={'row'} xs={4} sx={{ height: '100%' }}>
              <Typography variant="h6">Classification Items</Typography>
              <Box height={24} />
              {unassignedItems.map((item) => {
                const isDisabled = disabledItems.includes(item.key)
                return (
                  <Grid item key={item.key} direction="column">
                    <Grid item>
                      <SourceDraggable
                        key={item.key}
                        id={item.key}
                        icon={item.icon}
                        label={item.label}
                        disabled={isDisabled}>
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
                          sx={{ color: 'text.secondary' }}>
                          {isDisabled ? (
                            <Replay fontSize="medium" sx={{ color: (theme) => theme.palette.primary.main }} />
                          ) : (
                            <Block fontSize="medium" />
                          )}
                        </IconButton>
                      </SourceDraggable>
                    </Grid>
                    <Grid item>
                      <Box height={12} />
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>
            {/* Spacing between the Columns*/}
            <Grid item xs={1} />
            {/* Right Column: Droppable Container */}
            <Grid item xs={6.5} sx={{ width: '100%' }}>
              <Grid item>
                <Typography variant="h6">Order the Items</Typography>
              </Grid>
              <Grid item>
                <Box height={24} />
              </Grid>
              <Grid item sx={{ height: '100%' }}>
                <Droppable id="droppable-container">
                  <SortableContext items={orderedItems} strategy={verticalListSortingStrategy}>
                    {orderedItems.map((key, index) => {
                      const item = classificationItems.find((ci) => ci.key === key)
                      return item ? (
                        <SortableItem key={item.key} id={item.key} icon={item.icon} label={item.label}>
                          <Grid container direction={'row'} justifyContent={'space-around'}>
                            <PositionBadge>{index + 1}</PositionBadge>
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
                                handleResetItem(item.key)
                              }}
                              size="small"
                              sx={{ color: 'text.secondary' }}>
                              <Close fontSize="small" />
                            </IconButton>
                          </Grid>
                        </SortableItem>
                      ) : null
                    })}
                  </SortableContext>
                </Droppable>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Box height={16} />
        </Grid>
        <Box
          sx={{
            padding: (theme) => theme.spacing(1, 0),
            backgroundColor: (theme) => theme.palette.background.paper,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            zIndex: 10
          }}>
          <Grid container justifyContent="space-between" alignItems="flex-end">
            <Button
              id="reset-order-default-learning-path"
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.error.main,
                '&:hover': { bgcolor: (theme) => theme.palette.error.light }
              }}
              onClick={handleRemoveAll}>
              <ListItemIcon>
                <Replay fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">{t('Reset')}</Typography>
            </Button>
            <Button
              id="submit-default-learning-path"
              variant="contained"
              disabled={!isSubmitActive}
              onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </DndContext>
  )
}

type DefaultLearningPathModalProps = {
  open?: boolean
  handleClose: (event: object, reason: string) => void
}

const DefaultLearningPathModal = ({ open = false, handleClose }: DefaultLearningPathModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          left: '9%',
          right: '9%',
          top: '10%',
          height: '70%',
          width: '80%',
          overflow: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2
        }}>
        <Fab
          id="close-default-learning-path-modal-button"
          color="primary"
          onClick={() => handleClose({} as object, 'backdropClick')}
          style={{
            position: 'absolute',
            top: '1%',
            left: '94.5%'
          }}>
          <Close />
        </Fab>
        <CreateDefaultLearningPath />
      </Box>
    </Modal>
  )
}

export default DefaultLearningPathModal
