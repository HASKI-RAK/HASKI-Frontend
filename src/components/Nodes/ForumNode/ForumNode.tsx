import { NodeWrapper, Paper, Typography } from '@common/components'
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import { Forum } from '@common/icons'
import { memo } from 'react'
import { getConfig } from '@shared'

/**
 * ForumNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the lms.
 * ForumNode can't be used as a standalone component and must be rendered via ReactFlow.
 * @param props - Props containing the data of the node.
 * @returns {JSX.Element} - The ForumNode component.
 * @category Components
 */
const ForumNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <NodeWrapper
      id="additional-literature-node"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
      }}
      data-testid={'ForumNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Forum sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
    </NodeWrapper>
  )
}

export default memo(ForumNode)
