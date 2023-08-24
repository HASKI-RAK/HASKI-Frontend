import { QuestionnaireAnswersILS } from './QuestionnaireAnswersILS'
import { useQuestionnaireAnswersILSStore } from './zustand/zustandILS'
import { useQuestionnaireAnswersListKStore } from './zustand/zustandListK'
import { QuestionnaireAnswersListK } from './QuestionnaireAnswersListK'
import { getILS } from "./getILS";
import { getListK } from "./getListK";

export { useQuestionnaireAnswersILSStore, useQuestionnaireAnswersListKStore, getILS, getListK }
export type { QuestionnaireAnswersILS, QuestionnaireAnswersListK }
