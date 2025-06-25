import { ReactElement } from 'react'
import { NodeTypes } from 'reactflow'
import { TFunction } from 'i18next'
import {
  Article,
  Assignment,
  AssignmentInd,
  AssignmentLate,
  Description,
  Feedback,
  Flag,
  Forum,
  QuestionMark,
  SettingsApplications,
  ShortText,
  TipsAndUpdates,
  Videocam
} from '@common/icons'
import AdditionalLiteratureNode from '../AdditionalLiteratureNode/AdditionalLiteratureNode'
import ApplicationExampleNode from '../ApplicationExampleNode/ApplicationExampleNode'
import BasicNode from '../BasicNode/BasicNode'
import DefaultGroup from '../DefaultGroup/DefaultGroup'
import EvaluationQuestionnaireNode from '../EvaluationQuestionnaireNode/EvaluationQuestionnaireNode'
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
  AB: ApplicationExampleNode,
  AN: VideoNode,
  BE: ExampleNode,
  EK: ExplanationNode,
  EF: EvaluationQuestionnaireNode,
  FO: ForumNode,
  KÜ: ShortTextualIntroductionNode,
  LZ: LearningObjectiveNode,
  RQ: FeedbackNode,
  SE: SelfAssessmentNode,
  ÜB: ExerciseNode,
  ZF: SummaryNode,
  ZL: AdditionalLiteratureNode,
  GROUP: DefaultGroup,
  DEFAULT: BasicNode
}

export const getNodeIcon = (key: string, fontSize: number): ReactElement => {
  const mapping: Record<string, ReactElement> = {
    AB: <SettingsApplications sx={{ fontSize }} />,
    AN: <Videocam sx={{ fontSize }} />,
    BE: <Assignment sx={{ fontSize }} />,
    EK: <TipsAndUpdates sx={{ fontSize }} />,
    EF: <QuestionMark sx={{ fontSize }} />,
    FO: <Forum sx={{ fontSize }} />,
    KÜ: <ShortText sx={{ fontSize }} />,
    LZ: <Flag sx={{ fontSize }} />,
    RQ: <Feedback sx={{ fontSize }} />,
    SE: <AssignmentInd sx={{ fontSize }} />,
    ÜB: <AssignmentLate sx={{ fontSize }} />,
    ZF: <Description sx={{ fontSize }} />,
    ZL: <Article sx={{ fontSize }} />
  }
  return mapping[key] || <QuestionMark sx={{ fontSize }} />
}

/**
 * getGroupLabels function.
 *
 * @param t - The translation function from i18next.
 *
 * @remarks
 * getGroupLabels represents a function that can be used to get the label of a group via key.
 *
 * @returns - Record containing all group labels.
 *
 * @category Components
 */
export const getGroupLabels = (t: TFunction): Record<string, string> => {
  return {
    AB: t('components.NodeTypes.ab'),
    AN: t('components.NodeTypes.an'),
    BE: t('components.NodeTypes.be'),
    DEFAULT: 'Default',
    EF: t('components.NodeTypes.ef'),
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
