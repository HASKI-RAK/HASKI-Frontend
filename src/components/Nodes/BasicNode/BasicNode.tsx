import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Handle, NodeProps, Position } from 'reactflow'
import { Checkbox, NodeWrapper, Paper, Tooltip, Typography } from '@common/components'
import { Feedback } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { getConfig } from '@shared'

/**
 * @prop children - The icon of the node.
 * @prop {@link NodeProps} - The props of the node.
 * @interface
 */
type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  children?: JSX.Element
}

/**
 * BasicNode component.
 *
 * @param props - Props containing the id, children and data of the node.
 *
 * @remarks
 * BasicNode represents a component that displays a node with a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * BasicNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const BasicNode = ({ id, children = <Feedback sx={{ fontSize: 50 }} />, data }: BasicNodeProps) => {
  const { t } = useTranslation()
  return (
    <NodeWrapper
      id={id + '-' + data.lmsId}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
        data.handleSetLmsId(data.lmsId)
      }}
      data-testid={'basicNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {children}
      </Paper>
      <Typography variant="h5" sx={{ marginLeft: '8px', color: (theme) => theme.palette.secondary.contrastText }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {data.isDone && (
        <Tooltip title={t('tooltip.completed')}>
          <Checkbox
            defaultChecked
            disabled
            sx={{
              position: 'absolute',
              top: -10,
              right: -9,
              backgroundSize: 'cover',
              background: (theme) => theme.palette.common.white,
              fontsize: 25,
              borderRadius: 10,
              padding: 0,
              pointerEvents: 'none', // Prevent interaction with the checkbox
              '& svg': {
                scale: '1.4'
              },
              '&.Mui-disabled': {
                color: (theme) => theme.palette.success.main // Override default disabled color
              }
            }}
          />
        </Tooltip>
      )}
    </NodeWrapper>
  )
}

export default memo(BasicNode)
