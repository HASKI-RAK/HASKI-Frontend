import { useState, useCallback, useContext } from 'react'
import { postILS, postListK, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { useTranslation } from 'react-i18next'
import { User } from '@core'
import { postCalculateLearningPathILS } from '@services'
import { SnackbarMessageProps } from '@components'
import log from 'loglevel'

type SendHookResult = {
  sendAnswers: () => Promise<boolean>
  isSending: boolean
}

const useHandleSend = (data: { question_id: string; answer: string }[], ils: boolean): SendHookResult => {
  const fetchUser = usePersistedStore((state) => state.fetchUser)
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

    return fetchUser().then((user) => {
      const studentId = user.id
      if (ils) {
        return postILS({ studentId, outputJson })
          .then((response) => {
            useCalculateLearningPath(user, addSnackbar, t)
            return !!response
          })
          .catch(() => {
            addSnackbar({
              message: t('ILS.sending.error'),
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
              message: t('ListK.sending.error'),
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
const course1TopicListKempten = [2, 6, 10, 12]
const course2TopicListKempten = [16, 22]
const algorithmListKempten1 = ['aco', 'graf', 'graf', 'aco']
const algorithmListKempten2 = ['aco', 'graf']
const exceptedUserIdKempten = [3, 4, 5, 6]

const topicListAschaffenburg = [3, 5, 9]
const algorithmListAschaffenburg = ['graf', 'aco', 'aco']

const useCalculateLearningPath = (
  user: User,
  addSnackbar: (newSnackbar: SnackbarMessageProps) => void,
  t: (key: string) => string
) => {
  if (user.university == 'HS-KE') {
    if (exceptedUserIdKempten.includes(user.id)) {
      console.log('excepted user')
      return
    }
    course1TopicListKempten.map((topicId, index) => {
      postCalculateLearningPathILS(
        user.settings.user_id,
        user.lms_user_id,
        user.id,
        1,
        topicId,
        algorithmListKempten1[index]
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
    course2TopicListKempten.map((topicId, index) => {
      postCalculateLearningPathILS(
        user.settings.user_id,
        user.lms_user_id,
        user.id,
        2,
        topicId,
        algorithmListKempten2[index]
      )
        .then((response) => {
          log.info(response)
        })
        .catch(() => {
          addSnackbar({
            message: t('Data.calculated.error'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error('Error while calculating learning path in Kempten Course 2')
        })
    })
  } else if (user.university == 'TH-AB') {
    topicListAschaffenburg.map((topicId, index) => {
      postCalculateLearningPathILS(
        user.settings.user_id,
        user.lms_user_id,
        user.id,
        1,
        topicId,
        algorithmListAschaffenburg[index]
      )
        .then((response) => {
          log.info(response)
        })
        .catch(() => {
          addSnackbar({
            message: t('Data.calculated.error'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error('Error while calculating learning path in Aschaffenburg')
        })
    })
  } else {
    addSnackbar({
      message: t('Data.calculated.error'),
      severity: 'error',
      autoHideDuration: 5000
    })
    log.error(user.university)
  }
}

export default useHandleSend
