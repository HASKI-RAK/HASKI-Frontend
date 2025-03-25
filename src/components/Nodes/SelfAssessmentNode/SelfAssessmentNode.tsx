import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { LearningPathLearningElementNode, getNodeIcon } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * SelfAssessmentNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * SelfAssessmentNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * SelfAssessmentNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const SelfAssessmentNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="self-assessment-node" icon={getNodeIcon('SE', 50)} />
}

export default memo(SelfAssessmentNode)
