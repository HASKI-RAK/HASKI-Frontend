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
import AcUnitIcon from '@mui/icons-material/AcUnit'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import BlockIcon from '@mui/icons-material/Block'
import CloseIcon from '@mui/icons-material/Close'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ReplayIcon from '@mui/icons-material/Replay'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Box, Button, Fab, Grid, IconButton, Modal, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Close } from '@common/icons'

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
  height: '90%',
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

// ----- Types -----
interface ClassificationItem {
  key: string
  name: string
  disabled?: boolean
  label?: string
  icon?: JSX.Element
}

interface DraggableProps {
  id: UniqueIdentifier
  children: React.ReactNode
  label?: string
  icon?: React.ReactNode
  disabled?: boolean
}

// ----- Source Draggable (Left Column) -----
// Added a "disabled" prop to conditionally apply styling and disable drag events.
export const SourceDraggable: React.FC<DraggableProps> = ({ id, children, label, icon, disabled }) => {
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
export const SortableItem: React.FC<DraggableProps> = ({ id, children, icon }) => {
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
        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid>
    </DraggableContainer>
  )
}

// ----- Droppable Container -----
export const Droppable: React.FC<{ id: UniqueIdentifier; children: React.ReactNode }> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <DroppableContainer ref={setNodeRef} isover={isOver} id={id as string}>
      {children}
    </DroppableContainer>
  )
}

// ----- Drag Preview Component -----
const DragPreview: React.FC<{ item: ClassificationItem }> = ({ item }) => (
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

// ----- Main Component -----
const CreateDefaultLearningPath: React.FC = () => {
  const { t } = useTranslation()

  // Retrieve classification items from translations.
  const learningElementClassifications: ClassificationItem[] = useMemo(() => {
    return t('components.CreateLearningElementClassificationTable.classifications', {
      returnObjects: true
    })
  }, [t])

  // Map icons to classification keys.
  const iconMapping: Record<string, JSX.Element> = {
    LZ: <DragIndicatorIcon />,
    KÜ: <AcUnitIcon />,
    FO: <AccountCircleIcon />,
    EK: <AccessAlarmIcon />,
    AN: <AccessibilityNewIcon />,
    BE: <AddShoppingCartIcon />,
    AB: <AirportShuttleIcon />,
    ÜB: <AllInboxIcon />,
    SE: <EmojiEmotionsIcon />,
    ZL: <FingerprintIcon />,
    ZF: <FitnessCenterIcon />,
    RQ: <WhatshotIcon />
  }

  const classificationItems = useMemo(() => {
    return learningElementClassifications.map((item) => ({
      ...item,
      label: item.name,
      icon: iconMapping[item.key] || <DragIndicatorIcon />
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
      <DragOverlay>{activeId && activeItem ? <DragPreview item={activeItem} /> : null}</DragOverlay>
      <Grid container sx={{ width: '100%', height: '90%' }}>
        {/* Left Column: Unassigned Items with Toggle Disable Button */}
        <Grid item direction={'row'} xs={4} sx={{ height: '100%' }}>
          <Grid item>
            <Typography variant="h6">Classification Items</Typography>
          </Grid>
          <Grid item>
            <Box height={24} />
          </Grid>
          <Grid item>
            {unassignedItems.map((item) => {
              const isDisabled = disabledItems.includes(item.key)
              return (
                <Grid item key={item.key} direction="column" sx={{ mb: 2 }}>
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
                        <ReplayIcon fontSize="medium" sx={{ color: (theme) => theme.palette.primary.main }} />
                      ) : (
                        <BlockIcon fontSize="medium" />
                      )}
                    </IconButton>
                  </SourceDraggable>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={1} />
        {/* Right Column: Droppable Container */}
        <Grid item xs={7} sx={{ width: '100%' }}>
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
                    <SortableItem key={item.key} id={item.key} icon={item.icon}>
                      <Grid container alignItems="center" justifyContent="space-between" style={{ width: '100%' }}>
                        <Grid item>
                          <Typography variant="body1">{item.label}</Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                              <PositionBadge>{index + 1}</PositionBadge>
                            </Grid>
                            <Grid item>
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
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </SortableItem>
                  ) : null
                })}
              </SortableContext>
            </Droppable>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ mt: 2, width: '100%' }}>
          <Fab id="reset-order-default-learning-path" color="error" onClick={handleRemoveAll}>
            <ReplayIcon />
          </Fab>
          <Button variant="contained" disabled={!isSubmitActive} onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
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
          left: '12%',
          right: '12%',
          top: '10%',
          overflow: 'auto',
          height: '70%',
          width: '80%',
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
