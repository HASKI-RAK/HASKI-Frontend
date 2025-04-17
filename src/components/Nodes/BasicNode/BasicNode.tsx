import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { CheckBox, Feedback } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { getConfig } from '@shared'
import { usePersistedStore, useStore } from '@store'

type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  icon?: ReactElement
  children?: ReactNode
}

const BasicNode = ({ id, icon = <Feedback sx={{ fontSize: 50 }} />, ...props }: BasicNodeProps) => {
  const { t } = useTranslation()
  return (
    <NodeWrapper
      id={`${id}-${props.data.lmsId}`}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={handleNodeClick}
      data-testid="basicNode"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <Collapse in={isHovered} style={{ transitionDelay: isHovered ? '100ms' : '200ms' }}>
        {isCourseCreatorRole && (
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ position: 'absolute', top: '-3.25rem', left: '0.2rem' }}>
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
            {props.children}
          </Grid>
        )}
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
