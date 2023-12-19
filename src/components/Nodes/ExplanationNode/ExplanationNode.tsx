import { NodeWrapper, Paper, Typography } from '@common/components'
import { TipsAndUpdates } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'
import { getConfig } from '@shared'

/**
 * ExplanationNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ExplanationNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ExplanationNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ExplanationNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <NodeWrapper
      id="explanation-node"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(getConfig().MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
      }}
      data-testid={'explanationNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TipsAndUpdates sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
    </NodeWrapper>
  )
}

export default memo(ExplanationNode)
