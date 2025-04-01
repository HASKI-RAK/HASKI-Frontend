import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress, Grid, IconButton, ListItemIcon, Tooltip, Typography } from '@common/components'
import { Close, Replay } from '@common/icons'
import { CoverSheet, getNodeIcon } from '@components'
import { useCreateDefaultLearningPathTable } from './CreateDefaultLearningPathTable.hooks'
import UnassignedItem, { ClassificationItem, DragPreview } from './DraggableItem'
import { Droppable } from './DroppableItem'
import { SortableItem } from './SortableItem'

type createDefaultLearningPathTableProps = {
  handleClose?: (event: object, reason: string) => void
  orderedItems: string[]
  disabledItems: string[]
  setOrderedItems: Dispatch<SetStateAction<string[]>>
  setDisabledItems: Dispatch<SetStateAction<string[]>>
}

const CreateDefaultLearningPathTable = ({
  orderedItems,
  disabledItems,
  setOrderedItems,
  setDisabledItems,
  handleClose = () => {
    /*not empty arrow function*/
  }
}: createDefaultLearningPathTableProps) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)
  const [activeId, setActiveId] = useState<null | string>(null)
  const [isSending, setIsSending] = useState(false)

  // Retrieve classification items from translations.
  const learningElementClassifications: ClassificationItem[] = useMemo(() => {
    return t('components.CreateLearningElementClassificationTable.classifications', {
      returnObjects: true
    })
  }, [t])

  const {
    handleSubmit,
    handleDragEnd,
    handleDragOver,
    handleToggleDisable,
    handleResetItem,
    handleDragStart,
    handleRemoveAll
  } = useCreateDefaultLearningPathTable({
    setIsSending,
    orderedItems,
    disabledItems,
    setActiveId,
    setOrderedItems,
    setDisabledItems
  })

  // Add a label and icon to the classifications
  const classificationItems: ClassificationItem[] = useMemo(() => {
    return learningElementClassifications.map((item) => ({
      ...item,
      label: item.name,
      icon: getNodeIcon(item.key, 20)
    }))
  }, [learningElementClassifications])

  // left items that are not assigned to the droppable container.
  const unassignedItems = classificationItems.filter((item) => !orderedItems.includes(item.key))

  //item that is actively dragged
  const activeItem = classificationItems.find((item) => item.key === activeId)

  // The submit button is enabled only when every classification item is either dropped or disabled.
  const isSubmitActive = orderedItems.length + disabledItems.length === classificationItems.length

  if (activeStep === 0) {
    return (
      <Grid container direction="column" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
        <Grid item>
          <CoverSheet
            header={t('components.CreateDefaultLearningPathTable.header')}
            body={t('components.CreateDefaultLearningPathTable.introduction')}
            imagePath="ProjectDescriptionImage04.jpg"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setActiveStep((prev) => prev + 1)}
            sx={{ mb: '2rem', width: '20rem' }}>
            {t('appGlobal.start')}
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <DndContext
      collisionDetection={rectIntersection}
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
            <Grid item xs={4} sx={{ height: '100%' }}>
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
              <Typography textAlign="center">{t('appGlobal.reset')}</Typography>
            </Button>
            <Tooltip
              arrow
              title={
                !isSubmitActive || isSending ? t('components.CreateDefaultLearningPathTable.submitRequirement') : ''
              }>
              <span>
                <Button
                  id="submit-default-learning-path"
                  variant="contained"
                  disabled={!isSubmitActive || isSending}
                  onClick={() => {
                    handleSubmit().then(() => {
                      return handleClose({}, 'closeButtonClick')
                    })
                  }}>
                  {isSending ? <CircularProgress size={24} /> : t('appGlobal.submit')}
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Box>
      </Box>
    </DndContext>
  )
}

export default CreateDefaultLearningPathTable
