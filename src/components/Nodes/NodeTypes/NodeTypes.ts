import { NodeTypes } from 'reactflow'
import { BasicNode } from '../BasicNode/BasicNode'

export const nodeTypes: NodeTypes = {
  basic: BasicNode,
  assign: BasicNode,
  quiz: BasicNode,
  feedback: BasicNode
}
