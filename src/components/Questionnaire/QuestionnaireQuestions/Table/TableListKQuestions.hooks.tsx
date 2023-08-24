import { useState, useCallback } from 'react';
import { useQuestionnaireAnswersListKStore } from '@services';
import { usePersistedStore } from "@store";
import log from "loglevel";

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
                list_k: listkArray.map((item: any) => ({
                    question_id: item[0].toLowerCase(),
                    answer: parseInt(item[1],10)
                }))
            })

            const user = await fetchUser();
            const studentId = user.id;

            const response = await fetch(
                process.env.BACKEND + `/lms/student/${studentId}/questionnaire/listk`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: outputJson,
                }
            );

            if (response.ok) {
                const data = await response.json();
                //todo: handle response and set ListK answers to store
                console.log(data);
                return true
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            log.error(error);
            return false
        } finally {
            setIsSending(false);
        }
    }, [questionnaireAnswers]);

    return { sendAnswers, isSending };
};

export default useHandleSend;
