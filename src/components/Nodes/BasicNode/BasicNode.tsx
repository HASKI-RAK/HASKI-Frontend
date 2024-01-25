import { NodeWrapper, Paper, Typography, Tooltip } from '@common/components'
import { LearningPathLearningElementNode } from '@components'
import { Feedback, CheckBox } from '@common/icons'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'
import { getConfig } from '@shared'
import { useTheme } from '@common/hooks'
import { useTranslation } from 'react-i18next'

// TODO: Add comment
type BasicNodeProps = NodeProps<LearningPathLearningElementNode> & {
  id?: string
  children?: JSX.Element
}

/** // TODO: Update comment
 * BasicNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * BasicNode presents a component that displays a node with a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * BasicNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const BasicNode = ({ id = 'basic-node', children = <Feedback sx={{ fontSize: 50 }} />, data }: BasicNodeProps) => {
  // const theme = useTheme()

  const { t } = useTranslation()
  return (
    <NodeWrapper
      id={id}
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
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
      {data.isDone && (
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
      )}
    </NodeWrapper>
  )
}

export default memo(BasicNode)
