import { LearningPathLearningElementNode } from '@components'
import BasicNode from '../BasicNode/BasicNode'
import { ShortText } from '@common/icons'
import { NodeProps } from 'reactflow'
import { memo } from 'react'

/** // TODO: Update comment
 * ShortTextualIntroductionNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ShortTextualIntroductionNode presents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ShortTextualIntroductionNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ShortTextualIntroductionNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <BasicNode {...data} id="shortTextualIntroductionNode">
      <ShortText sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(ShortTextualIntroductionNode)
