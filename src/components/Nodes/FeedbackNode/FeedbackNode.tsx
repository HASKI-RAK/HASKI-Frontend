import { memo } from 'react'
import { NodeProps } from 'reactflow'

import { Feedback } from '@common/icons'
import { LearningPathLearningElementNode } from '@components'

import BasicNode from '../BasicNode/BasicNode'


/**
 * FeedbackNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * FeedbackNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * FeedbackNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const FeedbackNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="feedback-node" icon={<Feedback sx={{ fontSize: 50 }} />}></BasicNode>
}

export default memo(FeedbackNode)
