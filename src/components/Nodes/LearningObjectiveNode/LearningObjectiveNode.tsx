import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { LearningPathLearningElementNode, getNodeIcon } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * LearningObjectiveNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * LearningObjectiveNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * LearningObjectiveNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const LearningObjectiveNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="learning-objective-node" icon={getNodeIcon('LZ', 50)} />
}

export default memo(LearningObjectiveNode)
