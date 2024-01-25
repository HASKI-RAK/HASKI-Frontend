import { LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'
import { NodeProps } from 'reactflow'
import { Flag } from '@common/icons'
import { memo } from 'react'

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
  return (
    <BasicNode {...data} id="learning-objective-node">
      <Flag sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(LearningObjectiveNode)
