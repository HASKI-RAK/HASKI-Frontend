import { act, renderHook } from '@testing-library/react'
import { useQuestionnaireAnswersListKStore } from '@services'

describe('QuestionnaireAnswersListK', () => {
  test('Inital Answers are empty strings', () => {
    const questionnaireAnswersListKStore = renderHook(() =>
      useQuestionnaireAnswersListKStore((state) => state.questionnaireAnswers)
    )

    expect(questionnaireAnswersListKStore.result.current?.Org1_F1).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Org2_F2).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Org3_F3).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Ela1_F4).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Ela2_F5).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Ela3_F6).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.krP1_F7).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.krP2_F8).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.krP3_F9).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Wie1_F10).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Wie2_F11).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Wie3_F12).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.ZP1_F13).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.ZP2_F14).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.ZP3_F15).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Kon1_F16).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Kon2_F17).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Kon3_F18).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Reg1_F19).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Reg2_F20).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Reg3_F21).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Auf1r_F22).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Auf2r_F23).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Auf3r_F24).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Ans1_F25).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Ans2_F26).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Ans3_F27).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Zei1_F28).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Zei2_F29).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Zei3_F30).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.LmS1_F31).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.LmS2_F32).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.LmS3_F33).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Lit1_F34).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Lit2_F35).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.Lit3_F36).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.LU1_F37).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.LU2_F38).toBe('')
    expect(questionnaireAnswersListKStore.result.current?.LU3_F39).toBe('')
  })

  test('setQuestionnaireAnswersILS', () => {
    const { result } = renderHook(() => useQuestionnaireAnswersListKStore())
    const { setQuestionnaireAnswers } = result.current
    act(() => {
      setQuestionnaireAnswers?.('Org1_F1', '1')
    })
    expect(result.current.setQuestionnaireAnswers).toBe(setQuestionnaireAnswers)
  })
})
