export type QuestionnaireAnswersListK = {
  questionnaireAnswers: {
    org1_f1: string
    org2_f2: string
    org3_f3: string
    elab1_f4: string
    elab2_f5: string
    elab3_f6: string
    crit_rev1_f7: string
    crit_rev2_f8: string
    crit_rev3_f9: string
    rep1_f10: string
    rep2_f11: string
    rep3_f12: string
    goal_plan1_f13: string
    goal_plan2_f14: string
    goal_plan3_f15: string
    con1_f16: string
    con2_f17: string
    con3_f18: string
    reg1_f19: string
    reg2_f20: string
    reg3_f21: string
    att1_f22: string
    att2_f23: string
    att3_f24: string
    eff1_f25: string
    eff2_f26: string
    eff3_f27: string
    time1_f28: string
    time2_f29: string
    time3_f30: string
    lrn_w_cls1_f31: string
    lrn_w_cls2_f32: string
    lrn_w_cls3_f33: string
    lit_res1_f34: string
    lit_res2_f35: string
    lit_res3_f36: string
    lrn_env1_f37: string
    lrn_env2_f38: string
    lrn_env3_f39: string
  }
  setQuestionnaireAnswers: (question_id: string, answer: string) => void
}
