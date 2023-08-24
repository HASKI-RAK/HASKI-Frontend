import { act, renderHook } from '@testing-library/react'
import { useQuestionnaireAnswersListKStore } from '@services'

describe('QuestionnaireAnswersListK', () => {
  test('Inital Answers are empty strings', () => {
    const questionnaireAnswersListKStore = renderHook(() =>
      useQuestionnaireAnswersListKStore((state) => state.questionnaireAnswers)
    )

    expect(questionnaireAnswersListKStore.result.current?.org1_f1).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.org2_f2).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.org3_f3).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.elab1_f4).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.elab2_f5).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.elab3_f6).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.crit_rev1_f7).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.crit_rev2_f8).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.crit_rev3_f9).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.rep1_f10).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.rep2_f11).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.rep3_f12).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.goal_plan1_f13).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.goal_plan2_f14).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.goal_plan3_f15).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.con1_f16).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.con2_f17).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.con3_f18).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.reg1_f19).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.reg2_f20).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.reg3_f21).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.att1_f22).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.att2_f23).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.att3_f24).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.eff1_f25).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.eff2_f26).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.eff3_f27).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.time1_f28).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.time2_f29).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.time3_f30).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lrn_w_cls1_f31).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lrn_w_cls2_f32).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lrn_w_cls3_f33).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lit_res1_f34).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lit_res2_f35).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lit_res3_f36).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lrn_env1_f37).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lrn_env2_f38).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.lrn_env3_f39).toBe('')
  })

  test('setQuestionnaireAnswersILS', () => {
    const { result } = renderHook(() => useQuestionnaireAnswersListKStore())
    const { setQuestionnaireAnswers } = result.current
    act(() => {
      setQuestionnaireAnswers?.('org1_f1', '1')
    })
    expect(result.current.setQuestionnaireAnswers).toBe(setQuestionnaireAnswers)
  })
})
