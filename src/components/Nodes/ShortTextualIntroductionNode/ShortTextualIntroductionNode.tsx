import { memo } from 'react'
import { NodeProps } from 'reactflow'
import { LearningPathLearningElementNode, getNodeIcon } from '@components'
import BasicNode from '../BasicNode/BasicNode'

/**
 * ShortTextualIntroductionNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ShortTextualIntroductionNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ShortTextualIntroductionNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ShortTextualIntroductionNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return <BasicNode {...data} id="short-textual-introduction-node" icon={getNodeIcon('KÜ', 50)} />
}

export default memo(ShortTextualIntroductionNode)
