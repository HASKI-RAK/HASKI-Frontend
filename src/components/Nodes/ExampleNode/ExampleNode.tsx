import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { Assignment } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * ExampleNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ExampleNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ExampleNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ExampleNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="example-node" icon={<Assignment sx={{ fontSize: 50 }} />}></BasicNode>
}

export default memo(ExampleNode)
