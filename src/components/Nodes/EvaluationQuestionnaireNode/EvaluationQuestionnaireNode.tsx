import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { getNodeIcon, LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * EvaluationQuestionnaireNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * EvaluationQuestionnaireNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * EvaluationQuestionnaireNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const EvaluationQuestionnaireNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="evaluation-questionnaire-node" icon={getNodeIcon('EF', 50)} />
}

export default memo(EvaluationQuestionnaireNode)
