import { useState, useCallback, useContext } from 'react'
import { postILS, postListK, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { useTranslation } from 'react-i18next'

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

    const reducedData = filteredData.filter((current, index, array) => {
      // Filter out items that have a duplicate question_id later in the array
      return !array.slice(index + 1).some((item) => item.question_id === current.question_id)
    }).map((current) => current);

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
