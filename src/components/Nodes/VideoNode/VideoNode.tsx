import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { LearningPathLearningElementNode, getNodeIcon } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * VideoNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * VideoNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * VideoNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const VideoNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="video-node" icon={getNodeIcon('AN', 50)} />
}

export default memo(VideoNode)
