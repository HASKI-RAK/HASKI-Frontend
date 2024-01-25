import { AssignmentLate } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { NodeProps } from 'reactflow'
import { memo } from 'react'
import BasicNode from '../BasicNode/BasicNode'

/** // TODO: Update comment
 * ExerciseNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ExerciseNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ExerciseNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ExerciseNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <BasicNode {...data} id="exerciseNode">
      <AssignmentLate sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(ExerciseNode)
