import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { LearningPathLearningElementNode, getNodeIcon } from '@components'
import BasicNode from '../BasicNode/BasicNode'

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
  return <BasicNode {...data} id="summary-node" icon={getNodeIcon('ZF', 50)} />
}

export default memo(SummaryNode)
