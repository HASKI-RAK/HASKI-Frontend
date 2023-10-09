import { useState, useCallback, useContext } from 'react'
import { postILS, postListK, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { useTranslation } from 'react-i18next'

type SendHookResult = {
  sendAnswers: () => Promise<boolean>
  isSending: boolean
}

type Answer = {
  question_id: string
  answer: string
}

const useHandleSend = (data: { question_id: string; answer: string }[], ils: boolean): SendHookResult => {
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const [isSending, setIsSending] = useState<boolean>(false)
  const { addSnackbar } = useContext(SnackbarContext)
  const { t } = useTranslation()

  const sendAnswers = useCallback(async () => {
    setIsSending(true)

    const filteredData = data.filter((entry) => entry.question_id !== '')

    const reducedData = filteredData.reduce((accumulator: Answer[], current: Answer) => {
      const index = accumulator.findIndex((item) => item.question_id === current.question_id)
      if (index !== -1) {
        // If the question_id exists, replace it with the current item
        accumulator[index] = current
      } else {
        // Otherwise, add it to the accumulator
        accumulator.push(current)
      }
      return accumulator
    }, [])

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
            return !!response
          })
          .catch(() => {
            addSnackbar({
              message: t('ILS sending error'),
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
              message: t('ListK sending error'),
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

export default useHandleSend
