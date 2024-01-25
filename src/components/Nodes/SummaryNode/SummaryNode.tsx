import { LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'
import { Description } from '@common/icons'
import { NodeProps } from 'reactflow'
import { memo } from 'react'

/**
 * SummaryNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * SummaryNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * SummaryNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const SummaryNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <BasicNode {...data} id="summary-node">
      <Description sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(SummaryNode)
