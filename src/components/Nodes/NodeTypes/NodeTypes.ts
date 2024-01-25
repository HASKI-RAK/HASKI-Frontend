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
import type { LearningPathLearningElementNode } from '../LearningPathLearningElementNode/LearningPathLearningElementNode'
import ApplicationExampleNode from '../ApplicationExampleNode/ApplicationExampleNode'
import ForumNode from '../ForumNode/ForumNode'
import LearningObjectiveNode from '../LearningObjectiveNode/LearningObjectiveNode'

/**
 * nodeTypes object.
 *
 * @remarks
 * nodeTypes presents a object containing all node types.
 *
 * @category Components
 */
export const nodeTypes: NodeTypes = {
  RQ: FeedbackNode,
  KÜ: ShortTextualIntroductionNode,
  AB: ApplicationExampleNode,
  EK: ExplanationNode,
  AN: VideoNode,
  BE: ExampleNode,
  FO: ForumNode,
  ÜB: ExerciseNode,
  ZF: SummaryNode,
  LZ: LearningObjectiveNode,
  ZL: AdditionalLiteratureNode,
  SE: SelfAssessmentNode,
  GROUP: DefaultGroup,
  DEFAULT: BasicNode
}
