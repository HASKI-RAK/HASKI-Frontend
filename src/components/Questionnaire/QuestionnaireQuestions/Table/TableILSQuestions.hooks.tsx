import { useState, useCallback } from 'react';
import { useQuestionnaireAnswersILSStore } from '@services';
import {usePersistedStore} from "@store";
import {postILS} from "@services";

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
                ils: ILSarray.map((item: [string, string]) => ({
                    question_id: item[0].toLowerCase(),
                    answer: item[1],
                })),
            })

            const user = await fetchUser()
            const studentId = user.id

            const successILS = await postILS({ studentId, outputJson })
            return !!successILS

        } catch (error) {
            return false
        } finally {
            setIsSending(false)
        }
    }, [questionnaireAnswers]);

    return { sendAnswers, isSending };
};

export default useHandleSend;
