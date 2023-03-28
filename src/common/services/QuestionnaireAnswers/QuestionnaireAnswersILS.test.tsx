import {act, renderHook} from "@testing-library/react";
import {useQuestionnaireAnswersILSStore} from "@services";


describe("QuestionnaireAnswersILS", () => {

    test("Inital Answers are empty strings", () => {
        const questionnaireAnswersILSStore = renderHook(() => useQuestionnaireAnswersILSStore((state) => state.questionnaireAnswers));

        expect(questionnaireAnswersILSStore.result.current?.AR_1_F1).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_2_F5).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_3_F9).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_4_F13).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_5_F17).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_6_F21).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_7_F25).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_8_F29).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_9_F33).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_10_F37).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.AR_11_F41).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_1_F2).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_2_F6).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_3_F10).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_4_F14).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_5_F18).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_6_F22).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_7_F26).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_8_F30).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_9_F34).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_10_F38).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SI_11_F42).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_1_F3).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_2_F7).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_3_F11).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_4_F15).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_5_F19).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_6_F23).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_7_F27).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_8_F31).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_9_F35).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_10_F39).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.VV_11_F43).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_1_F4).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_2_F8).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_3_F12).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_4_F16).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_5_F20).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_6_F24).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_7_F28).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_8_F32).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_9_F36).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_10_F40).toBe("");
        expect(questionnaireAnswersILSStore.result.current?.SG_11_F44).toBe("");
    });

    test("setQuestionnaireAnswersILS", () => {

        const {result} = renderHook(() => useQuestionnaireAnswersILSStore());
        const {setQuestionnaireAnswers} = result.current;
        act(() => {
            setQuestionnaireAnswers?.("AR_1_F1","a");
        });
        expect(result.current.setQuestionnaireAnswers).toBe(setQuestionnaireAnswers);
    });


});
