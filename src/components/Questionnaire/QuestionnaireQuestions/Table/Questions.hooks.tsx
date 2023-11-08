import {useState, useCallback, useContext} from 'react'
import {postILS, postListK, SnackbarContext} from '@services'
import {usePersistedStore} from '@store'
import {useTranslation} from 'react-i18next'
import {User} from '@core'
import {postCalculateLearningPathILS} from "../../../../services/LearningPath/postCalculateLearningPathILS";

type SendHookResult = {
    sendAnswers: () => Promise<boolean>
    isSending: boolean
}

const useHandleSend = (data: { question_id: string; answer: string }[], ils: boolean): SendHookResult => {
    const fetchUser = usePersistedStore((state) => state.fetchUser)
    const [isSending, setIsSending] = useState<boolean>(false)
    const {addSnackbar} = useContext(SnackbarContext)
    const {t} = useTranslation()

    const sendAnswers = useCallback(async() => {
        setIsSending(true)

        const filteredData = data.filter((entry) => entry.question_id !== '')

        const reducedData = filteredData.filter((current, index, array) => {
            // Returns always the last Item of duplicated question_ids
            return !array.slice(index + 1).some((item) => item.question_id === current.question_id)
        }).map((current) => current)

        const key = ils ? 'ils' : 'list_k'
        const outputJson: string = JSON.stringify({
            [key]: reducedData.map((item) => ({
                question_id: item.question_id.toLowerCase(),
                answer: ils ? item.answer : parseInt(item.answer, 10)
            }))
        })

        return fetchUser().then((user) => {
            const studentId = user.id
            if(ils) {
                return postILS({studentId, outputJson}).then((response) => {
                    useCalculateLearningPath(user)
                    return !!response
                }).catch(() => {
                    addSnackbar({
                        message: t('ILS.sending.error'),
                        severity: 'error'
                    })
                    return false
                }).finally(() => {
                    setIsSending(false)
                    return false
                })
            }
            else {
                return postListK({studentId, outputJson}).then((response) => {
                    return !!response
                }).catch(() => {
                    addSnackbar({
                        message: t('ListK.sending.error'),
                        severity: 'error'
                    })
                    return false
                }).finally(() => {
                    setIsSending(false)
                    return false
                })
            }
        })
    }, [data])

    return {sendAnswers, isSending}
}

//hardcoded courseId, topicId, algorithm for evaluation
const useCalculateLearningPath = (user: User) => {
    postCalculateLearningPathILS(user.settings.user_id, user.lms_user_id, user.id, 1, 1, "aco").then((response) => {
        console.log(response)
    })
}

export default useHandleSend
