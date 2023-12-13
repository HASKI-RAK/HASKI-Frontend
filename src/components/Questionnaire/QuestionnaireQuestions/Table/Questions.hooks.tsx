import { useState, useCallback, useContext } from 'react'
import { postILS, postListK, SnackbarContext, postCalculateLearningPathILS } from '@services'
import { usePersistedStore } from '@store'
import { useTranslation } from 'react-i18next'
import { User } from '@core'
import { SnackbarMessageProps } from '@components'
import log from 'loglevel'
import { getConfig } from '@shared'

type SendHookResult = {
  sendAnswers: () => Promise<boolean>
  isSending: boolean
}

const useHandleSend = (data: { question_id: string; answer: string }[], ils: boolean): SendHookResult => {
  const getUser = usePersistedStore((state) => state.getUser)
  const [isSending, setIsSending] = useState<boolean>(false)
  const { addSnackbar } = useContext(SnackbarContext)
  const { t } = useTranslation()

  const sendAnswers = useCallback(async () => {
    setIsSending(true)

    const filteredData = data.filter((entry) => entry.question_id !== '')

    const reducedData = filteredData
      .filter((current, index, array) => {
        // Returns always the last Item of duplicated question_ids
        return !array.slice(index + 1).some((item) => item.question_id === current.question_id)
      })
      .map((current) => current)

    const key = ils ? 'ils' : 'list_k'
    const outputJson: string = JSON.stringify({
      [key]: reducedData.map((item) => ({
        question_id: item.question_id.toLowerCase(),
        answer: ils ? item.answer : parseInt(item.answer, 10)
      }))
    })

    return getUser().then((user) => {
      const studentId = user.id
      if (ils) {
        return postILS({ studentId, outputJson })
          .then((response) => {
            useCalculateLearningPath(user, addSnackbar, t)
            return !!response
          })
          .catch(() => {
            addSnackbar({
              message: t('error.postILS'),
              severity: 'error'
            })
            return false
          })
          .finally(() => {
            setIsSending(false)
            return false
          })
      } else {
        return postListK({ studentId, outputJson })
          .then((response) => {
            return !!response
          })
          .catch(() => {
            addSnackbar({
              message: t('error.postListK'),
              severity: 'error'
            })
            return false
          })
          .finally(() => {
            setIsSending(false)
            return false
          })
      }
    })
  }, [data])

  return { sendAnswers, isSending }
}

//hardcoded courseId, topicId, algorithm for evaluation
const courseList = getConfig().CALCULATED_COURSES as number[]
const topicList = getConfig().CALCULATED_TOPICS as number[]
const algorithmList = getConfig().CALCULATED_ALGORITHM as string[]

const useCalculateLearningPath = (
  user: User,
  addSnackbar: (newSnackbar: SnackbarMessageProps) => void,
  t: (key: string) => string
) => {
  courseList.map((courseId) => {
    topicList.map((topicId, index) => {
      postCalculateLearningPathILS(
        user.settings.user_id,
        user.lms_user_id,
        user.id,
        courseId,
        topicId,
        algorithmList[index]
      )
        .then((response) => {
          log.info(response)
        })
        .catch(() => {
          addSnackbar({
            message: t('Data.calculated.error'),
            severity: 'success',
            autoHideDuration: 5000
          })
          log.error('Error while calculating learning path in Kempten Course 1')
        })
    })
  })
}

export default useHandleSend
