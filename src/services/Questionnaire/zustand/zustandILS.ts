import create from 'zustand'
import { QuestionnaireAnswersILS } from '@services'

//""=not answered, "a"=answer1, "b"=answer2
const useQuestionnaireAnswersILSStore = create<QuestionnaireAnswersILS>((set) => ({
  questionnaireAnswers: {
    AR_1_F1: '',
    SI_1_F2: '',
    VV_1_F3: '',
    SG_1_F4: '',
    AR_2_F5: '',
    SI_2_F6: '',
    VV_2_F7: '',
    SG_2_F8: '',
    AR_3_F9: '',
    SI_3_F10: '',
    VV_3_F11: '',
    SG_3_F12: '',
    AR_4_F13: '',
    SI_4_F14: '',
    VV_4_F15: '',
    SG_4_F16: '',
    AR_5_F17: '',
    SI_5_F18: '',
    VV_5_F19: '',
    SG_5_F20: '',
    AR_6_F21: '',
    SI_6_F22: '',
    VV_6_F23: '',
    SG_6_F24: '',
    AR_7_F25: '',
    SI_7_F26: '',
    VV_7_F27: '',
    SG_7_F28: '',
    AR_8_F29: '',
    SI_8_F30: '',
    VV_8_F31: '',
    SG_8_F32: '',
    AR_9_F33: '',
    SI_9_F34: '',
    VV_9_F35: '',
    SG_9_F36: '',
    AR_10_F37: '',
    SI_10_F38: '',
    VV_10_F39: '',
    SG_10_F40: '',
    AR_11_F41: '',
    SI_11_F42: '',
    VV_11_F43: '',
    SG_11_F44: ''
  },
  setQuestionnaireAnswers: (question_id: string, newAnswer: string) =>
    set((state) => ({
      questionnaireAnswers: {
        ...state.questionnaireAnswers,
        [question_id]: newAnswer
      }
    }))
}))

export { useQuestionnaireAnswersILSStore }
