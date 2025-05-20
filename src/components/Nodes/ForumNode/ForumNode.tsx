import { Forum } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'
import { memo } from 'react'
import { NodeProps } from 'reactflow'

import BasicNode from '../BasicNode/BasicNode'

/**
 * ForumNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ForumNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ForumNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ForumNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="forum-node" icon={<Forum sx={{ fontSize: 50 }} />}></BasicNode>
}

export default memo(ForumNode)
