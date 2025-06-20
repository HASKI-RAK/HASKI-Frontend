import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { getNodeIcon, LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * ExplanationNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ExplanationNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ExplanationNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ExplanationNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="explanation-node" icon={getNodeIcon('EK', 50)} />
}

export default memo(ExplanationNode)
