import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { getNodeIcon, LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * AdditionalLiteratureNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * AdditionalLiteratureNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * AdditionalLiteratureNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const AdditionalLiteratureNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="additional-literature-node" icon={getNodeIcon('ZL', 50)}></BasicNode>
}

export default memo(AdditionalLiteratureNode)
