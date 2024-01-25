import { LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'
import { Assignment } from '@common/icons'
import { NodeProps } from 'reactflow'
import { memo } from 'react'

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
  return (
    <BasicNode {...data} id="example-node">
      <Assignment sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(ExampleNode)
