import ShortTextualIntroductionNode from '../ShortTextualIntroductionNode/ShortTextualIntroductionNode'
import AdditionalLiteratureNode from '../AdditionalLiteratureNode/AdditionalLiteratureNode'
import SelfAssessmentNode from '../SelfAssessmentNode/SelfAssessmentNode'
import ExplanationNode from '../ExplanationNode/ExplanationNode'
import FeedbackNode from '../FeedbackNode/FeedbackNode'
import ExerciseNode from '../ExerciseNode/ExerciseNode'
import DefaultGroup from '../DefaultGroup/DefaultGroup'
import ExampleNode from '../ExampleNode/ExampleNode'
import SummaryNode from '../SummaryNode/SummaryNode'
import VideoNode from '../VideoNode/VideoNode'
import BasicNode from '../BasicNode/BasicNode'
import { NodeTypes } from 'reactflow'

/**
 * nodeTypes presents a object containing all node types.
 * @returns {NodeTypes} - Returns a list of all node types.
 */
export const nodeTypes: NodeTypes = {
  RQ: FeedbackNode,
  KÜ: ShortTextualIntroductionNode,
  EK: ExplanationNode,
  AN: VideoNode,
  BE: ExampleNode,
  ÜB: ExerciseNode,
  ZF: SummaryNode,
  ZL: AdditionalLiteratureNode,
  SE: SelfAssessmentNode,
  GROUP: DefaultGroup,
  DEFAULT: BasicNode
}
