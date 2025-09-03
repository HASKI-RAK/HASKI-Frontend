import { memo, MouseEvent, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { Box, Collapse, Grid, IconButton, NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { useTheme } from '@common/hooks'
import { CheckBox, DeleteForever, Task, Warning } from '@common/icons'
import { DeleteEntityModal, getNodeIcon, LearningPathLearningElementNode } from '@components'
import { deleteLearningElement, RoleContext, SnackbarContext, deleteLearningElementSolution, postFavorite } from '@services'
import { getConfig } from '@shared'
import { usePersistedStore, useStore } from '@store'
import { FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon } from '@mui/icons-material'

/**
 * @prop children - The icon of the node.
 * @prop {@link NodeProps} - The props of the node.
 * @interface
 */
type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  icon?: ReactElement
  children?: ReactNode
}

const BasicNode = ({ id, icon = getNodeIcon('RQ', 50), ...props }: BasicNodeProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const { isCourseCreatorRole, isStudentRole } = useContext(RoleContext)

  const [deleteLearningElementModalOpen, setdeleteLearningElementModalOpen] = useState(false)
  const [learningElementName, setLearningElementName] = useState<string>('')
  const [learningElementId, setLearningElementId] = useState<number>(0)
  const [lmsLearningElementId, setLmsLearningElementId] = useState<number>(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false) //commented out until feature is implemented
  const [solutionLmsId, setSolutionLmsId] = useState<number>(-1)
  const [solutionActivityType, setSolutionActivityType] = useState<string>('resource')

  const clearLearningPathElement = useStore((state) => state.clearLearningPathElementCache)
  const clearLearningPathElementStatusCache = usePersistedStore((state) => state.clearLearningPathElementStatusCache)
  const getLearningElementSolution = useStore((state) => state.getLearningElementSolution)
  const getFavoriteElement = usePersistedStore((state) => state.getFavoriteElement)
  const setFavoriteElement = usePersistedStore((state) => state.setFavoriteElement) //commented out until feature is implemented

  // Fetch favorite status - commented out until feature is implemented
  useEffect(() => {
    getUser()
      .then((user) => {
        getFavoriteElement(user.id).then((favorite) => {
          if (favorite.learning_element_id.length > 0) {
            setIsFavorite(true)
          } else {
            setIsFavorite(false)
          }
        })
      })
      .catch(() => {
        addSnackbar({
          message: t('components.BasicNode.favoriteError'),
          severity: 'error',
          autoHideDuration: 3000
        })
      })
  }, [getUser, getFavoriteElement, props.data.learningElementId, addSnackbar, t])

  // Handlers for hovering the node

  const onMouseEnter = () => {
    setIsHovered(true)
  }
  const onMouseLeave = () => {
    setIsHovered(false)
  }

  // Handle node click but ignore clicks that originated from the delete icon.
  const handleNodeClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('.learning-element-delete-icon')) {
      return // Skip the iframe action if it came from the delete button.
    }
    props.data.handleOpen()
    props.data.handleSetUrl(getConfig().MOODLE + `/mod/${props.data.activityType}/view.php?id=${props.data.lmsId}`)
    props.data.handleSetLmsId(props.data.lmsId)
  }

  const handleOpenDeleteLearningElementModal = () => {
    setdeleteLearningElementModalOpen(true)
    setLearningElementName(props.data.name)
    setLearningElementId(props.data.learningElementId)
    setLmsLearningElementId(props.data.lmsId)
    setIsHovered(false)
  }

  const handleAcceptDeleteLearningElementModal = (learningElementId: number, lmsLearningElementId: number) => {
    deleteLearningElementSolution(learningElementId).then(() => {
      deleteLearningElement(learningElementId, lmsLearningElementId).then(() => {
        addSnackbar({
          message: t('components.BasicNode.deleteLearningElementSuccessful'),
          severity: 'success',
          autoHideDuration: 5000
        })
        setdeleteLearningElementModalOpen(false)
      })
    })
    clearLearningPathElement()
    clearLearningPathElementStatusCache()
  }

  // placeholder for future favorite feature
  const addToFavorites = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    getUser()
      .then((user) => {
        postFavorite(!isFavorite, user.id, props.data.learningElementId)
        setFavoriteElement(user.id, props.data.learningElementId)
      })
      .catch(() => {
        addSnackbar({
          message: t('components.BasicNode.favoriteError'),
          severity: 'error',
          autoHideDuration: 3000
        })
      })
    setIsFavorite(!isFavorite)
    event.stopPropagation()
  }

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

  const renderNodeStatus = () => {
    return props.data.isDisabled ? (
      <Tooltip title={t('components.BasicNode.warningTooltip')}>
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
        <Tooltip title={t('tooltip.completed')}>
          <CheckBox
            viewBox={'3 -3 24 24'}
            sx={{
              fontSize: 29,
              position: 'absolute',
              top: -13,
              right: -13,
              color: (theme) => theme.palette.success.main,
              background: (theme) => theme.palette.common.white,
              borderRadius: '10%'
            }}
          />
        </Tooltip>
      )
    )
  }

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
          {// commented out until feature is implemented
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
          }
          {solutionLmsId > 1 && (
            <Tooltip title={t('components.BasicNode.solutionTooltip')}>
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
            <Tooltip arrow title={t('components.BasicNode.deleteTooltip')} placement="top">
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
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {icon}
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {props.data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {renderNodeStatus()}
      <DeleteEntityModal
        openDeleteEntityModal={deleteLearningElementModalOpen}
        setDeleteEntityModalOpen={setdeleteLearningElementModalOpen}
        entityName={learningElementName}
        entityId={learningElementId}
        entityLmsId={lmsLearningElementId}
        onDeleteConfirm={handleAcceptDeleteLearningElementModal}
        entityType={t('appGlobal.learningElement')}
      />
    </NodeWrapper>
  )
}

export default memo(BasicNode)
