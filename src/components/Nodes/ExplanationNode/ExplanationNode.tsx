import { LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'
import { TipsAndUpdates } from '@common/icons'
import { NodeProps } from 'reactflow'
import { memo } from 'react'

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
  return (
    <BasicNode {...data} id="explanation-node">
      <TipsAndUpdates sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(ExplanationNode)
