import { SnackbarMessageProps } from '@components'
import { User } from '@core'
import { postCalculateLearningPathILS,postILS,postListK,SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import log from 'loglevel'
import { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
            calculateLearningPath(user, addSnackbar, t)
            return !!response
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.postILS'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.postILS') + ' ' + error)
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
          .catch((error) => {
            addSnackbar({
              message: t('error.postListK'),
              severity: 'error',
              autoHideDuration: 3000
            })
            log.error(t('error.postListK') + ' ' + error)
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

const calculateLearningPath = (
  user: User,
  addSnackbar: (newSnackbar: SnackbarMessageProps) => void,
  t: (key: string) => string
) => {
  postCalculateLearningPathILS(user.settings.user_id, user.lms_user_id)
    .then((response) => {
      log.info(t('info.postCalculateLearningPathILS') + '' + response)
    })
    .catch((error) => {
      addSnackbar({
        message: t('error.postCalculateLearningPathILS'),
        severity: 'error',
        autoHideDuration: 5000
      })
      log.error(t('error.postCalculateLearningPathILS') + '' + error)
    })
}

export default useHandleSend
