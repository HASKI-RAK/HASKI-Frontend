import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ReactElement, useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress, Grid, IconButton, ListItemIcon, Typography } from '@common/components'
import {
  Article,
  Assignment,
  AssignmentInd,
  AssignmentLate,
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
import { CoverSheet } from '@components'
import { DefaultLearningPath } from '@core'
import { SnackbarContext, postDefaultLearningPath } from '@services'
import { usePersistedStore, useStore } from '@store'
import UnassignedItem, { ClassificationItem, DragPreview } from './DraggableItem'
import { Droppable } from './DroppableItem'
import { SortableItem } from './SortableItem'

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

type createDefaultLearningPathTableProps = {
  handleClose?: (event: object, reason: string) => void
}

const CreateDefaultLearningPathTable = ({
  handleClose = () => {
    /*not empty arrow function*/
  }
}: createDefaultLearningPathTableProps) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const { addSnackbar } = useContext(SnackbarContext)
  const [orderedItems, setOrderedItems] = useState<string[]>([])
  const [disabledItems, setDisabledItems] = useState<string[]>([])
  const [activeId, setActiveId] = useState<null | string>(null)
  const [isSending, setIsSending] = useState(false)
  const getUser = usePersistedStore((state) => state.getUser)
  const clearDisabledClassificationsCache = usePersistedStore((state) => state.clearDisabledClassificationsCache)
  const clearLearningPathElementCache = useStore((state) => state.clearLearningPathElementCache)

  // Retrieve classification items from translations.
  const learningElementClassifications: ClassificationItem[] = useMemo(() => {
    return t('components.CreateLearningElementClassificationTable.classifications', {
      returnObjects: true
    })
  }, [t])

  const classificationItems = useMemo(() => {
    return learningElementClassifications.map((item) => ({
      ...item,
      label: item.name,
      icon: iconMapping[item.key]
    }))
  }, [learningElementClassifications, iconMapping])

  // left items that are not assigned to the droppable container.
  const unassignedItems = classificationItems.filter((item) => !orderedItems.includes(item.key))

  // Toggle disable state of an item
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const activeIdStr = active.id.toString()
    const overIdStr = over.id.toString()

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

  const handleRemoveAll = () => {
    setOrderedItems([])
    setDisabledItems([])
  }

  // The submit button is enabled only when every classification item is either dropped or disabled.
  const isSubmitActive = orderedItems.length + disabledItems.length === classificationItems.length

  const handleSubmit = () => {
    setIsSending(true)
    const orderedItemsData: DefaultLearningPath[] = orderedItems.map((key, index) => ({
      classification: key,
      position: index + 1,
      disabled: disabledItems.includes(key),
      university: 'HS-KE'
    }))
    disabledItems.map((key, index) =>
      orderedItemsData.push({
        classification: key,
        position: index + 9000,
        disabled: true,
        university: 'HS-KE'
      })
    )
    return getUser().then((user) => {
      return postDefaultLearningPath({
        userId: user.settings.id,
        userLmsId: user.lms_user_id,
        outputJson: JSON.stringify(orderedItemsData)
      })
        .then((defaultLearningPath) => {
          clearDisabledClassificationsCache()
          clearLearningPathElementCache()
          setIsSending(false)
          handleClose({}, 'backdropClick')
        })
        .then(() => {
          addSnackbar({
            message: t('appGlobal.dataSendSuccessful'),
            severity: 'success',
            autoHideDuration: 5000
          })
        })
    })
  }

  const activeItem = classificationItems.find((item) => item.key === activeId)

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={() => setActiveId(null)}>
      {activeStep === 0 ? (
        <Grid container direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
          <Grid item>
            <CoverSheet
              header={'Default Learning Path'}
              body={t('components.CreateDefaultLearningPathTable.introduction')}
              imagePath={'ProjectDescriptionImage04.jpg'}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
              sx={{ mb: '2rem', width: '20rem' }}>
              Start
            </Button>
          </Grid>
        </Grid>
      ) : (
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
                    <UnassignedItem
                      key={item.key}
                      item={item}
                      isDisabled={isDisabled}
                      handleToggleDisable={handleToggleDisable}
                    />
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
                          <SortableItem
                            key={item.key}
                            id={item.key}
                            position={index + 1}
                            icon={item.icon}
                            label={item.label}>
                            <Grid container direction={'row'} justifyContent={'space-around'}>
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
                                <Close
                                  fontSize="small"
                                  sx={{
                                    bgcolor: (theme) => theme.palette.error.main,
                                    borderRadius: 10,
                                    '&:hover': { bgcolor: (theme) => theme.palette.error.light }
                                  }}
                                />
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
                disabled={!isSubmitActive || isSending}
                onClick={handleSubmit}>
                {isSending ? <CircularProgress size={24} /> : t('Submit')}
              </Button>
            </Grid>
          </Box>
        </Box>
      )}
    </DndContext>
  )
}

export default CreateDefaultLearningPathTable
