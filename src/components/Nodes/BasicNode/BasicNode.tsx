import { memo, MouseEvent, ReactElement, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { Box, Checkbox, Collapse, Grid, IconButton, NodeWrapper, Tooltip, Typography } from '@common/components'
import { useTheme } from '@common/hooks'
import { DeleteForever, Task, Warning } from '@common/icons'
import { BorderedPaper, DeleteEntityModal, getNodeIcon, LearningPathLearningElementNode } from '@components'
import { deleteLearningElement, deleteLearningElementSolution, RoleContext, SnackbarContext } from '@services'
import { getConfig } from '@shared'
import { usePersistedStore, useStore } from '@store'

/**
 * Props for the {@link BasicNode} component.
 */
type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  /**
   * The icon of the node.
   */
  icon?: ReactElement
  /**
   * The children of the node.
   */
  children?: ReactNode
}

const BasicNode = ({ id, icon = getNodeIcon('RQ', 50), ...props }: BasicNodeProps) => {
  // Hooks
  const { t } = useTranslation()
  const theme = useTheme()

  // Contexts
  const { addSnackbar } = useContext(SnackbarContext)
  const { isCourseCreatorRole, isStudentRole } = useContext(RoleContext)

  // Store
  const clearLearningPathElement = useStore((state) => state.clearLearningPathElementCache)
  const clearLearningPathElementStatusCache = usePersistedStore((state) => state.clearLearningPathElementStatusCache)
  const getLearningElementSolution = useStore((state) => state.getLearningElementSolution)

  // States
  /**
   * Tracks whether the modal to delete a learning element is open or not.
   */
  const [deleteLearningElementModalOpen, setDeleteLearningElementModalOpen] = useState(false)
  /**
   * Stores the name of the learning element to be deleted.
   */
  const [learningElementName, setLearningElementName] = useState<string>('')
  /**
   * Stores the ID of the learning element to be deleted.
   */
  const [learningElementId, setLearningElementId] = useState<number>(0)
  /**
   * Stores the LMS ID of the learning element to be deleted.
   */
  const [lmsLearningElementId, setLmsLearningElementId] = useState<number>(0)
  /**
   * Tracks whether the node is currently hovered over or not.
   */
  const [isHovered, setIsHovered] = useState(false)
  //const [isFavorite, setIsFavorite] = useState(false) commented out until feature is implemented
  const [solutionLmsId, setSolutionLmsId] = useState<number>(-1)
  const [solutionActivityType, setSolutionActivityType] = useState<string>('resource')

  /**
   * Sets the hover state to true.
   */
  const onMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [setIsHovered])

  /**
   * Sets the hover state to false.
   */
  const onMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [setIsHovered])

  /**
   * Opens the iframe and sets the URL and LMS ID for the learning element.
   *
   * @param event - The mouse event triggered by the click.
   */
  const handleNodeClick = useCallback(
    (event: MouseEvent) => {
      // Skip the iframe action if it came from the delete button.
      if ((event.target as HTMLElement).closest('.learning-element-delete-icon')) return

      props.data.handleOpen()
      props.data.handleSetUrl(getConfig().MOODLE + `/mod/${props.data.activityType}/view.php?id=${props.data.lmsId}`)
      props.data.handleSetLmsId(props.data.lmsId)
    },
    [
      props.data.handleOpen,
      props.data.handleSetUrl,
      props.data.handleSetLmsId,
      props.data.lmsId,
      props.data.activityType
    ]
  )

  /**
   * Opens the modal to delete a learning element and sets the necessary data.
   */
  const handleOpenDeleteLearningElementModal = useCallback(() => {
    setDeleteLearningElementModalOpen(true)
    setLearningElementName(props.data.name)
    setLearningElementId(props.data.learningElementId)
    setLmsLearningElementId(props.data.lmsId)
    setIsHovered(false)
  }, [
    setDeleteLearningElementModalOpen,
    setLearningElementName,
    props.data.name,
    setLearningElementId,
    props.data.learningElementId,
    setLmsLearningElementId,
    props.data.lmsId,
    setIsHovered
  ])

  /**
   * Deletes the learning element, closes the modal, and shows a snackbar notification.
   *
   * @param learningElementId - The ID of the learning element to be deleted.
   * @param lmsLearningElementId - The LMS ID of the learning element to be deleted.
   */
  const handleAcceptDeleteLearningElementModal = useCallback(
    (learningElementId: number, lmsLearningElementId: number) => {
      deleteLearningElementSolution(learningElementId).then(() => {
        deleteLearningElement(learningElementId, lmsLearningElementId).then(() => {
          addSnackbar({
            message: t('components.BasicNode.deleteLearningElementSuccessful'),
            severity: 'success',
            autoHideDuration: 5000
          })
          setDeleteLearningElementModalOpen(false)
        })
      })
      clearLearningPathElement()
      clearLearningPathElementStatusCache()
    },
    [
      deleteLearningElementSolution,
      deleteLearningElement,
      addSnackbar,
      t,
      setDeleteLearningElementModalOpen,
      clearLearningPathElement,
      clearLearningPathElementStatusCache
    ]
  )

  /* placeholder for future favorite feature
  const addToFavorites = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setIsFavorite(!isFavorite)
    event.stopPropagation()
  }
  */

  const handleShowSolution = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    props.data.handleOpen()
    props.data.handleSetUrl(getConfig().MOODLE + `/mod/${solutionActivityType}/view.php?id=${solutionLmsId}`)
    props.data.handleSetLmsId(solutionLmsId)
    event.stopPropagation()
  }

  useEffect(() => {
    getLearningElementSolution(props.data.lmsId).then((solution) => {
      setSolutionLmsId(solution.solution_lms_id)
      setSolutionActivityType(solution.activity_type)
    })
  }, [getLearningElementSolution, setSolutionLmsId, setSolutionActivityType, id, props])

  /**
   * Renders the status icon of the node, depending on whether it is disabled or done.
   */
  const renderNodeStatus = useCallback(() => {
    return props.data.isDisabled ? (
      <Tooltip title={<Typography variant="body2">{t('components.BasicNode.warningTooltip')}</Typography>}>
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 40,
            height: 40
          }}>
          {/* The Typography component is used to "color" the ! inside the Warning Icon White */}
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
              lineHeight: 1
            }}>
            |
          </Typography>
          <Warning
            sx={{
              fontSize: 40,
              color: (theme) => theme.palette.error.main,
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </Box>
      </Tooltip>
    ) : (
      props.data.isDone && (
        <Tooltip title={<Typography variant="body2">{t('tooltip.completed')}</Typography>}>
          <Box
            sx={{
              position: 'absolute',
              top: -14,
              right: -25,
              width: 40,
              height: 40
            }}>
            <Checkbox
              defaultChecked
              disabled
              sx={{
                position: 'absolute',
                backgroundSize: 'cover',
                background: theme.palette.common.white,
                fontsize: 25,
                borderRadius: 10,
                padding: 0,
                pointerEvents: 'none', // Prevent interaction with the checkbox
                '& svg': {
                  scale: '1.4'
                },
                '&.Mui-disabled': {
                  color: theme.palette.success.main // Override default disabled color
                }
              }}
            />
          </Box>
        </Tooltip>
      )
    )
  }, [props.data.isDisabled, props.data.isDone, t, theme])

  if (props.data.isDisabled && isStudentRole) {
    return null
  }

  return (
    <NodeWrapper
      id={`${id}-${props.data.lmsId}`}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={handleNodeClick}
      data-testid="basicNode"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Collapse in={isHovered} style={{ transitionDelay: isHovered ? '100ms' : '200ms' }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ position: 'absolute', top: '-3.25rem', left: '0.2rem' }}>
          {/* commented out until feature is implemented
            <IconButton
            onClick={addToFavorites}
            data-testid={'favoriteButton'}
            sx={{
              marginLeft: '1rem',
              color: theme.palette.secondary.contrastText,
              backgroundColor: theme.palette.primary.main,
              border: '1px solid grey'
            }}>
            {isFavorite ? <FavoriteIcon titleAccess="isFavorite" /> : <FavoriteBorderIcon titleAccess="notFavorite" />}
          </IconButton>
          */}
          {solutionLmsId > 1 && (
            <Tooltip title={<Typography variant="body2">{t('components.BasicNode.solutionTooltip')}</Typography>}>
              <IconButton
                onClick={handleShowSolution}
                data-testid={'showSolutionButton'}
                sx={{
                  backgroundColor: theme.palette.success.main,
                  marginLeft: '0.5rem',
                  color: 'white',
                  border: '1px solid grey',
                  '&:hover': {
                    backgroundColor: theme.palette.success.light
                  },
                  zIndex: 10
                }}>
                <Task />
              </IconButton>
            </Tooltip>
          )}
          {props.children}
          {isCourseCreatorRole && (
            <Tooltip
              arrow
              title={<Typography variant="body2">{t('components.BasicNode.deleteTooltip')}</Typography>}
              placement="top">
              <IconButton
                data-testid={'delete-learning-element-button'}
                onClick={handleOpenDeleteLearningElementModal}
                className="learning-element-delete-icon"
                sx={{
                  marginLeft: '1rem',
                  color: 'white',
                  backgroundColor: theme.palette.error.dark,
                  border: '1px solid grey',
                  zIndex: 10,
                  '&:hover': {
                    backgroundColor: theme.palette.error.light
                  }
                }}>
                <DeleteForever fontSize={'medium'} />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Collapse>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <BorderedPaper
        color={theme.palette.success.main}
        isAnimated={props.data.isRecommended}
        tooltip={t('components.BasicNode.recommendedExercise')}>
        {icon}
      </BorderedPaper>
      <Typography variant="h6" style={{ marginLeft: '8px', color: theme.palette.secondary.contrastText }}>
        {props.data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {renderNodeStatus()}
      <DeleteEntityModal
        openDeleteEntityModal={deleteLearningElementModalOpen}
        setDeleteEntityModalOpen={setDeleteLearningElementModalOpen}
        entityName={learningElementName}
        entityId={learningElementId}
        entityLmsId={lmsLearningElementId}
        onDeleteConfirm={handleAcceptDeleteLearningElementModal}
        entityType={t('appGlobal.learningElement')}
      />
    </NodeWrapper>
  )
}

/**
 * Basic node component for displaying learning elements in a learning path.
 *
 * Renders a node with an icon, name, and status indicators.
 * Includes functionality for opening and deleting learning elements.
 *
 * @param props - See {@link BasicNodeProps}.
 * @returns A basic node representing a learning element.
 *
 * @example
 * ```tsx
 * <BasicNode
 *   id="basic-node"
 *   icon={<Icon />}
 *   data={
 *     learningElementId={1}
 *     lmsId={1}
 *     name="Basic Node"
 *     activityType="quiz"
 *     classification="EK"
 *     handleSetUrl={handleSetUrl}
 *     handleSetTitle={handleSetTitle}
 *     handleSetLmsId={handleSetLmsId}
 *     handleOpen={handleOpen}
 *     handleClose={handleClose}
 *     isDone={false}
 *     isDisabled={false}
 *     isRecommended={true}
 *   }
 * >
 * {children}
 * </BasicNode>
 * ```
 */
export default memo(BasicNode)
