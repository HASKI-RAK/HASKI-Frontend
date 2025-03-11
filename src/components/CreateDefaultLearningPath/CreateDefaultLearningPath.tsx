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

// ----- Styled Components -----
// These containers now have a bit more padding and rounded corners.
const DraggableContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 50,
  display: 'flex',
  alignItems: 'center',
  cursor: 'grab',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}))

const DroppableContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isover'
})<{ isover: boolean }>(({ theme, isover }) => ({
  width: '100%',
  height: 600,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: isover ? theme.palette.action.hover : theme.palette.background.paper,
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius
}))

const PositionBadge = styled(Box)(({ theme }) => ({
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
  icon?: React.ReactNode
}

// ----- Source Draggable (Left Column) -----
// Uses useDraggable for independent drag preview.
export const SourceDraggable: React.FC<DraggableProps> = ({ id, children, icon }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1
  }
  return (
    <DraggableContainer ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {icon}
      <Typography variant="body1" sx={{ ml: 2 }}>
        {children}
      </Typography>
    </DraggableContainer>
  )
}

// ----- Sortable Item (Inside Droppable) -----
// Hides original element (opacity 0) when dragging.
export const SortableItem: React.FC<DraggableProps> = ({ id, children, icon }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition || undefined,
    opacity: isDragging ? 0 : 1
  }
  return (
    <DraggableContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {icon}
      {children}
    </DraggableContainer>
  )
}

// ----- Droppable Container -----
// We assign an id to detect drops on empty space.
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
    {item.icon}
    <Typography variant="body1" sx={{ ml: 2 }}>
      {item.label}
    </Typography>
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

  // Only show left items that are not in droppable AND not disabled.
  const unassignedItems = classificationItems.filter(
    (item) => !orderedItems.includes(item.key) && !disabledItems.includes(item.key)
  )

  // When disabling an item, add it to disabledItems.
  const handleDisable = (itemKey: string) => {
    setDisabledItems((prev) => [...prev, itemKey])
  }

  // Reset an item from the droppable container back to the left (removes from orderedItems).
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
      <Grid container spacing={2}>
        {/* Left Column: Unassigned Items with Disable Button */}
        <Grid item xs={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Classification Items
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {unassignedItems.map((item) => (
              <Box key={item.key} display="flex" alignItems="center" gap={1}>
                <SourceDraggable id={item.key} icon={item.icon}>
                  {item.label}
                </SourceDraggable>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDisable(item.key)
                  }}
                  size="small"
                  sx={{ color: 'text.secondary' }}>
                  <BlockIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={1} />
        {/* Right Column: Droppable Container */}
        <Grid item xs={7}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order the Items
          </Typography>
          <Droppable id="droppable-container">
            <SortableContext items={orderedItems} strategy={verticalListSortingStrategy}>
              {orderedItems.map((key, index) => {
                const item = classificationItems.find((ci) => ci.key === key)
                return item ? (
                  <SortableItem key={item.key} id={item.key} icon={item.icon}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                      <Typography variant="body1">{item.label}</Typography>
                      <Box display="flex" alignItems="center" gap={1}>
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
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </SortableItem>
                ) : null
              })}
            </SortableContext>
          </Droppable>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
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

const modalStyle = {
  position: 'absolute' as const,
  left: '12%',
  right: '12%',
  top: '10%',
  overflow: 'auto',
  height: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2
}

const DefaultLearningPathModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <CreateDefaultLearningPath />
      </Box>
    </Modal>
  )
}

export default DefaultLearningPathModal
