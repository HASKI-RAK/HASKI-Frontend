import { NodeTypes } from 'reactflow'
import { BasicNode } from '../BasicNode/BasicNode'
import { FeedbackNode } from '../FeedbackNode/FeedbackNode'
import { ExplanationNode } from '../ExplanationNode/ExplanationNode'

export const nodeTypes: NodeTypes = {
  RQ: FeedbackNode,
  KÜ: BasicNode,
  EK: ExplanationNode,
  AN: BasicNode,
  BE: BasicNode,
  ÜB: BasicNode,
  ZF: BasicNode,
  ZL: BasicNode,
  SE: BasicNode
}
