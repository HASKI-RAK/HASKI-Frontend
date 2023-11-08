import { NodeWrapper, Paper, Typography } from '@common/components'
import { LearningPathLearningElementNode } from '@components'
import { Assignment } from '@common/icons'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'

/**
 * ExampleNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the lms.
 * ExampleNode can't be used as a standalone component and must be rendered via ReactFlow.
 * @param props - Props containing the data of the node.
 * @returns {JSX.Element} - The ExampleNode component.
 * @category Components
 */
const ExampleNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <NodeWrapper
      id="example-node"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(process.env.MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
      }}
      data-testid={'exampleNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Assignment sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
    </NodeWrapper>
  )
}

export default memo(ExampleNode)
