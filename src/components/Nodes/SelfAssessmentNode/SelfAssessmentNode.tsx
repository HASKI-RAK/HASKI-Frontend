import { Box, Paper, Typography } from '@common/components'
import { AssignmentIndIcon } from '@common/icons' // TODO: DI
import { LearningPathLearningElementNode } from '@components'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'

/**
 * SelfAssessmentNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the lms.
 * SelfAssessmentNode can't be used as a standalone component and must be rendered via ReactFlow.
 * @param props - Props containing the data of the node.
 * @returns {JSX.Element} - The SelfAssessmentNode component.
 * @category Components
 */
const SelfAssessmentNode = ({ data }: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onClick={() => {
        data.handleOpen()
        data.handleSetUrl(process.env.MOODLE + `/mod/${data.activityType}/view.php?id=${data.lmsId}`)
      }}
      data-testid={'selfAssessmentNode'}>
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Paper
        sx={{
          width: '65px',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <AssignmentIndIcon sx={{ fontSize: 50 }} />
      </Paper>
      <Typography variant="h6" style={{ marginLeft: '8px' }}>
        {data.name}
      </Typography>
      <Handle type="source" position={Position.Bottom} id="a" style={{ visibility: 'hidden' }} />
    </Box>
  )
}

export default memo(SelfAssessmentNode)
