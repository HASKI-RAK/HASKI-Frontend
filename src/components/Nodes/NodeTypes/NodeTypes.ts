import { TFunction } from 'i18next'
import { NodeTypes } from 'reactflow'
import AdditionalLiteratureNode from '../AdditionalLiteratureNode/AdditionalLiteratureNode'
import ApplicationExampleNode from '../ApplicationExampleNode/ApplicationExampleNode'
import BasicNode from '../BasicNode/BasicNode'
import DefaultGroup from '../DefaultGroup/DefaultGroup'
import ExampleNode from '../ExampleNode/ExampleNode'
import ExerciseNode from '../ExerciseNode/ExerciseNode'
import ExplanationNode from '../ExplanationNode/ExplanationNode'
import FeedbackNode from '../FeedbackNode/FeedbackNode'
import ForumNode from '../ForumNode/ForumNode'
import LearningObjectiveNode from '../LearningObjectiveNode/LearningObjectiveNode'
import SelfAssessmentNode from '../SelfAssessmentNode/SelfAssessmentNode'
import ShortTextualIntroductionNode from '../ShortTextualIntroductionNode/ShortTextualIntroductionNode'
import SummaryNode from '../SummaryNode/SummaryNode'
import VideoNode from '../VideoNode/VideoNode'

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

// TODO: Add comments
export const getGroupLabels = (t: TFunction): Record<string, string> => {
  return {
    AB: t('components.NodeTypes.ab'),
    AN: t('components.NodeTypes.an'),
    BE: t('components.NodeTypes.be'),
    DEFAULT: 'Default',
    EK: t('components.NodeTypes.ek'),
    FO: t('components.NodeTypes.fo'),
    LZ: t('components.NodeTypes.lz'),
    KÜ: t('components.NodeTypes.kü'),
    RQ: t('components.NodeTypes.rq'),
    SE: t('components.NodeTypes.se'),
    ÜB: t('components.NodeTypes.üb'),
    ZF: t('components.NodeTypes.zf'),
    ZL: t('components.NodeTypes.zl')
  }
}
