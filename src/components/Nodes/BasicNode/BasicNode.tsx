import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { memo, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { Collapse, Grid, IconButton, NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { useTheme } from '@common/hooks'
import { CheckBox, Feedback } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { SnackbarContext, deleteLearningElement } from '@services'
import { getConfig } from '@shared'
import DeleteEntityModal from '../../DeleteEntityModal/DeleteEntityModal'

type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  icon?: JSX.Element
  children?: React.ReactNode
}

const BasicNode = ({ id, icon = <Feedback sx={{ fontSize: 50 }} />, ...props }: BasicNodeProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { addSnackbar } = useContext(SnackbarContext)

  const [isDeleteLearningElementModalOpen, setDeleteLearningElementModalOpen] = useState(false)
  const [learningElementName, setLearningElementName] = useState<string>('')
  const [learningElementId, setLearningElementId] = useState<number>(0)
  const [lmsLearningElementId, setLmsLearningElementId] = useState<number>(0)
  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = () => {
    setIsHovered(true)
  }
  const onMouseLeave = () => {
    setIsHovered(false)
  }

  // Handle node click but ignore clicks that originated from the delete icon.
  const handleNodeClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.delete-icon')) {
      return // Skip the click action if it came from the delete button.
    }
    props.data.handleOpen()
    props.data.handleSetUrl(getConfig().MOODLE + `/mod/${props.data.activityType}/view.php?id=${props.data.lmsId}`)
    props.data.handleSetLmsId(props.data.lmsId)
  }

  const handleOpenDeleteLearningElementModal = () => {
    setDeleteLearningElementModalOpen(true)
    setLearningElementName(props.data.name)
    setLearningElementId(props.data.learningElementId)
    setLmsLearningElementId(props.data.lmsId)
    setIsHovered(false)
  }

  const handleCloseDeleteLearningElementModal = () => {
    setDeleteLearningElementModalOpen(false)
  }

  const handleAcceptDeleteLearningElementModal = (learningElementId: number, lmsLearningElementId: number) => {
    deleteLearningElement(learningElementId, lmsLearningElementId).then(() => {
      addSnackbar({
        message: t('success.deleteLearningElement'),
        severity: 'success',
        autoHideDuration: 5000
      })
      setDeleteLearningElementModalOpen(false)
    })
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
          <IconButton
            onClick={handleOpenDeleteLearningElementModal}
            className="delete-icon"
            sx={{
              marginLeft: '1rem',
              color: theme.palette.secondary.contrastText,
              backgroundColor: theme.palette.primary.main,
              border: '1px solid grey',
              zIndex: 10
            }}>
            <DeleteForeverIcon />
          </IconButton>
          {props.children}
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
      {props.data.isDone && (
        <Tooltip title={t('tooltip.completed')}>
          <CheckBox
            viewBox="3 -3 24 24"
            sx={{
              fontSize: 29,
              position: 'absolute',
              top: -13,
              right: -13,
              color: theme.palette.success.main,
              background: theme.palette.common.white,
              borderRadius: '10%'
            }}
          />
        </Tooltip>
      )}
      <DeleteEntityModal
        open={isDeleteLearningElementModalOpen}
        onClose={handleCloseDeleteLearningElementModal}
        entityName={learningElementName}
        entityId={learningElementId}
        extraId={lmsLearningElementId}
        onConfirm={handleAcceptDeleteLearningElementModal}
        entityType="Learning Element"
      />
    </NodeWrapper>
  )
}

export default memo(BasicNode)
