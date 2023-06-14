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
import { NodeTypes } from 'reactflow'

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
  GROUP: DefaultGroup
}
