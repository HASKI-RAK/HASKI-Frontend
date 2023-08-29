import { useState, useCallback } from 'react';
import { useQuestionnaireAnswersListKStore } from '@services';
import { usePersistedStore } from "@store";
import {postListK} from "@services";

interface SendHookResult {
    sendAnswers: () => Promise<boolean>
    isSending: boolean;
}

const useHandleSend = (): SendHookResult => {
    const { questionnaireAnswers } = useQuestionnaireAnswersListKStore();
    const fetchUser = usePersistedStore((state) => state.fetchUser);

    const [isSending, setIsSending] = useState<boolean>(false);

    const sendAnswers = useCallback(async () => {
        try {
            setIsSending(true);

            const listkArray = Object.entries(questionnaireAnswers).filter(([key]) => key !== '')
            const outputJson = JSON.stringify({
                list_k: listkArray.map((item: [string, string]) => ({
                    question_id: item[0].toLowerCase(),
                    answer: parseInt(item[1],10)
                }))
            })

            const user = await fetchUser();
            const studentId = user.id

            const successListK = await postListK({ studentId, outputJson });
            return !!successListK;
        } catch (error) {
            return false
        } finally {
            setIsSending(false)
        }
    }, [questionnaireAnswers])

    return { sendAnswers, isSending }
};

export default useHandleSend;
