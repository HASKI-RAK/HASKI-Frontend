import { DndContext, DragEndEvent, UniqueIdentifier, pointerWithin, useDraggable, useDroppable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ReplayIcon from '@mui/icons-material/Replay'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Fab } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ----- Styled Components -----
const DraggableContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 40,
  display: 'flex',
  alignItems: 'center',
  cursor: 'grab',
  border: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white
}))

const DroppableContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isover'
})<{ isover: boolean }>(({ theme, isover }) => ({
  width: '100%',
  minHeight: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px dashed ${theme.palette.divider}`,
  backgroundColor: isover ? theme.palette.action.hover : theme.palette.background.paper
}))

// ----- Draggable Component -----
interface DraggableProps {
  id: UniqueIdentifier
  children: React.ReactNode
  icon?: React.ReactNode
}

export const Draggable: React.FC<DraggableProps> = ({ id, children, icon }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })
  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined
  }

  return (
    <DraggableContainer ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {icon}
      <Typography variant="body1" sx={{ ml: 1 }}>
        {children}
      </Typography>
    </DraggableContainer>
  )
}

// ----- Droppable Component -----
interface DroppableProps {
  id: UniqueIdentifier
  children: React.ReactNode
}

export const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id })
  return (
    <DroppableContainer ref={setNodeRef} isover={isOver}>
      {children}
    </DroppableContainer>
  )
}

// ----- Type for Classification Item -----
interface ClassificationItem {
  key: string
  name: string
  disabled?: boolean
}

// ----- Create Default Learning Path Component -----
const CreateDefaultLearningPath: React.FC = () => {
  const { t } = useTranslation()

  // Get classification items from the translation resource.
  const learningElementClassifications: ClassificationItem[] = useMemo(() => {
    return t('components.CreateLearningElementClassificationTable.classifications', {
      returnObjects: true
    })
  }, [t])

  // Define an icon mapping based on classification key.
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

  // Map the classification items to our internal format.
  const classificationItems = useMemo(() => {
    return learningElementClassifications.map((item) => ({
      key: item.key,
      label: item.name,
      icon: iconMapping[item.key] || <DragIndicatorIcon />
    }))
  }, [learningElementClassifications, iconMapping])

  // Create droppable IDs based on the number of classification items.
  const droppableIds = classificationItems.map((_, index) => `droppable-${index + 1}`)

  // Build initial assignments: droppable id -> assigned draggable key (or null if unassigned).
  const initialAssignments: Record<string, string | null> = {}
  droppableIds.forEach((id) => (initialAssignments[id] = null))
  const [assignments, setAssignments] = useState<Record<string, string | null>>(initialAssignments)

  // Compute unassigned items.
  const assignedKeys = Object.values(assignments).filter((id) => id !== null) as string[]
  const unassignedItems = classificationItems.filter((item) => !assignedKeys.includes(item.key))

  // Drag end handler: if dropped over a valid droppable, update assignment; otherwise, reset.
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setAssignments((prev) => {
      const newAssignments = { ...prev }
      let origin: string | null = null
      // Remove active item from all droppables.
      Object.keys(newAssignments).forEach((dropId) => {
        if (newAssignments[dropId] === active.id) {
          if (!origin) {
            origin = dropId
          }
          newAssignments[dropId] = null
        }
      })
      // If dropped over a valid droppable, assign it.
      const target = over ? (over.id as string) : null
      if (target && droppableIds.includes(target)) {
        const targetItem = newAssignments[target]
        newAssignments[target] = active.id as string
        // If the target already had an item and the active item came from a droppable, swap them.
        if (targetItem && origin && origin !== target) {
          newAssignments[origin] = targetItem
        }
      }
      return newAssignments
    })
  }

  // Remove all: reset assignments to initial state.
  const handleRemoveAll = () => {
    setAssignments({ ...initialAssignments })
  }

  // Submit handler: placeholder for further processing.
  const handleSubmit = () => {
    // Only called if all droppables have a partner.
    console.log('Submitted assignments:', assignments)
  }

  // Determine if submit button should be enabled (all droppables are filled).
  const isSubmitActive = droppableIds.every((dropId) => assignments[dropId] !== null)

  return (
    <DndContext collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <Grid container>
        {/* Left Column: Unassigned Classification Items */}
        <Grid item xs={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Classification Items
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {unassignedItems.map((item) => (
              <Draggable key={item.key} id={item.key} icon={item.icon}>
                {item.label}
              </Draggable>
            ))}
          </Box>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order the Items
          </Typography>
          <Grid container spacing={2} direction="column">
            {droppableIds.map((dropId, index) => {
              const assignedKey = assignments[dropId]
              const assignedItem = classificationItems.find((item) => item.key === assignedKey)
              return (
                <Grid item key={dropId}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ width: 30 }}>
                      {index + 1}.
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Droppable id={dropId}>
                        {assignedItem ? (
                          <Draggable id={assignedItem.key} icon={assignedItem.icon}>
                            {assignedItem.label}
                          </Draggable>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Drop here
                          </Typography>
                        )}
                      </Droppable>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent={'space-between'} sx={{ mt: 1 }}>
          <Fab
            id="reset-order-default-learning-path"
            color="error"
            data-testid={'QuestionnaireQuestionsModal-Close-Button'}
            onClick={handleRemoveAll}>
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

// ----- Modal and Box Wrapper -----
const modalStyle = {
  position: 'absolute',
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
