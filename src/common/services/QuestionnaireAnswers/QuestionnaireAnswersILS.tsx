export type QuestionnaireAnswersILS = {
    questionnaireAnswers: { AR_1_F1: string, SI_1_F2: string, VV_1_F3: string, SG_1_F4: string, AR_2_F5: string, SI_2_F6: string,
                            VV_2_F7: string, SG_2_F8: string, AR_3_F9: string, SI_3_F10: string, VV_3_F11: string, SG_3_F12: string, AR_4_F13: string,
                            SI_4_F14: string, VV_4_F15: string, SG_4_F16: string, AR_5_F17: string, SI_5_F18: string, VV_5_F19: string,
                            SG_5_F20: string, AR_6_F21: string, SI_6_F22: string, VV_6_F23: string, SG_6_F24: string, AR_7_F25: string,
                            SI_7_F26: string, VV_7_F27: string, SG_7_F28: string, AR_8_F29: string, SI_8_F30: string, VV_8_F31: string,
                            SG_8_F32: string, AR_9_F33: string, SI_9_F34: string, VV_9_F35: string, SG_9_F36: string, AR_10_F37: string,
                            SI_10_F38: string, VV_10_F39: string, SG_10_F40: string, AR_11_F41: string, SI_11_F42: string, VV_11_F43: string,
                            SG_11_F44: string};
    setQuestionnaireAnswers: (question_id: string, answer: string) => void;
};