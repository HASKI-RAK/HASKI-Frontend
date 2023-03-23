import create from "zustand";
import {QuestionnaireAnswersListK} from "@services";

//""=not answered, "a"=answer1, "b"=answer2
const useQuestionnaireAnswersListKStore = create<QuestionnaireAnswersListK>((set) => ({
    questionnaireAnswers: {
        "Org1_F1": "",
        "Org2_F2": "",
        "Org3_F3": "",
        "Ela1_F4": "",
        "Ela2_F5": "",
        "Ela3_F6": "",
        "krP1_F7": "",
        "krP2_F8": "",
        "krP3_F9": "",
        "Wie1_F10": "",
        "Wie2_F11": "",
        "Wie3_F12": "",
        "ZP1_F13": "",
        "ZP2_F14": "",
        "ZP3_F15": "",
        "Kon1_F16": "",
        "Kon2_F17": "",
        "Kon3_F18": "",
        "Reg1_F19": "",
        "Reg2_F20": "",
        "Reg3_F21": "",
        "Auf1r_F22": "",
        "Auf2r_F23": "",
        "Auf3r_F24": "",
        "Ans1_F25": "",
        "Ans2_F26": "",
        "Ans3_F27": "",
        "Zei1_F28": "",
        "Zei2_F29": "",
        "Zei3_F30": "",
        "LmS1_F31": "",
        "LmS2_F32": "",
        "LmS3_F33": "",
        "Lit1_F34": "",
        "Lit2_F35": "",
        "Lit3_F36": "",
        "LU1_F37": "",
        "LU2_F38": "",
        "LU3_F39": "",
    },
    setQuestionnaireAnswers: (question_id: string, newAnswer: string) =>
        set((state) => ({
            questionnaireAnswers: {
                ...state.questionnaireAnswers,
                [question_id]: newAnswer,
            },
        })),
}));

export {useQuestionnaireAnswersListKStore};
