import { useState, useCallback } from 'react';
import { useQuestionnaireAnswersILSStore } from '@services';
import {usePersistedStore} from "@store";
import log from "loglevel";

interface SendHookResult {
    sendAnswers: () => Promise<boolean>
    isSending: boolean
}

const useHandleSend = (): SendHookResult => {
    const { questionnaireAnswers } = useQuestionnaireAnswersILSStore()
    const fetchUser = usePersistedStore((state) => state.fetchUser)
    const [isSending, setIsSending] = useState<boolean>(false)

    const sendAnswers = useCallback(async () => {
        try {
            setIsSending(true)

            const ILSarray = Object.entries(questionnaireAnswers).filter(([key, item]) => key !== '' && item !== '')
            const outputJson = JSON.stringify({
                ils: ILSarray.map((item: [string, any]) => ({
                    question_id: item[0].toLowerCase(),
                    answer: item[1],
                })),
            })

            const user = await fetchUser()
            const studentId = user.id

            const response = await fetch(
                process.env.BACKEND + `/lms/student/${studentId}/questionnaire/ils`,
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
                const data = await response.json()
                //todo: possible to save the response to store?
                console.log(data)
                return true
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            log.error(error)
            return false
        } finally {
            setIsSending(false)
        }
    }, [questionnaireAnswers]);

    return { sendAnswers, isSending };
};

export default useHandleSend;
