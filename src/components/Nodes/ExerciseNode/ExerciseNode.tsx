import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { LearningPathLearningElementNode, getNodeIcon } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * ExerciseNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ExerciseNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ExerciseNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ExerciseNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="exercise-node" icon={getNodeIcon('ÜB', 50)} />
}

export default memo(ExerciseNode)
