import create from 'zustand'
import { QuestionnaireAnswersListK } from '@services'

//""=not answered, "a"=answer1, "b"=answer2
const useQuestionnaireAnswersListKStore = create<QuestionnaireAnswersListK>((set) => ({
  questionnaireAnswers: {
    org1_f1: '',
    org2_f2: '',
    org3_f3: '',
    elab1_f4: '',
    elab2_f5: '',
    elab3_f6: '',
    crit_rev1_f7: '',
    crit_rev2_f8: '',
    crit_rev3_f9: '',
    rep1_f10: '',
    rep2_f11: '',
    rep3_f12: '',
    goal_plan1_f13: '',
    goal_plan2_f14: '',
    goal_plan3_f15: '',
    con1_f16: '',
    con2_f17: '',
    con3_f18: '',
    reg1_f19: '',
    reg2_f20: '',
    reg3_f21: '',
    att1_f22: '',
    att2_f23: '',
    att3_f24: '',
    eff1_f25: '',
    eff2_f26: '',
    eff3_f27: '',
    time1_f28: '',
    time2_f29: '',
    time3_f30: '',
    lrn_w_cls1_f31: '',
    lrn_w_cls2_f32: '',
    lrn_w_cls3_f33: '',
    lit_res1_f34: '',
    lit_res2_f35: '',
    lit_res3_f36: '',
    lrn_env1_f37: '',
    lrn_env2_f38: '',
    lrn_env3_f39: ''
  },
  setQuestionnaireAnswers: (question_id: string, newAnswer: string) =>
    set((state) => ({
      questionnaireAnswers: {
        ...state.questionnaireAnswers,
        [question_id]: newAnswer
      }
    }))
}))

export { useQuestionnaireAnswersListKStore }
