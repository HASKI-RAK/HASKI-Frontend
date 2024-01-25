import { LearningPathLearningElementNode } from '@components'
import { SettingsApplications } from '@common/icons'
import BasicNode from '../BasicNode/BasicNode'
import { NodeProps } from 'reactflow'
import { memo } from 'react'

/**
 * ApplicationExampleNode component.
 *
 * @param props - Props containing the data of the node.
 *
 * @remarks
 * ApplicationExampleNode represents a component that displays a node with an icon and a name.
 * It can be clicked to open a corresponding activity of the LMS.
 * ApplicationExampleNode can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const ApplicationExampleNode = (data: NodeProps<LearningPathLearningElementNode>) => {
  return (
    <BasicNode {...data} id="application-example-node">
      <SettingsApplications sx={{ fontSize: 50 }} />
    </BasicNode>
  )
}

export default memo(ApplicationExampleNode)
