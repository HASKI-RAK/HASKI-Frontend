import { useState, useCallback, useContext } from 'react'
import { postILS, postListK } from '@services'
import { usePersistedStore } from '@store'
import { SnackbarContext } from '@services'
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

    const outputJson: string = (() => {
      switch (ils) {
        case true:
          return JSON.stringify({
            ils: filteredData.map((item) => ({
              question_id: item.question_id.toLowerCase(),
              answer: item.answer
            }))
          })
        default:
          return JSON.stringify({
            list_k: filteredData.map((item) => ({
              question_id: item.question_id.toLowerCase(),
              answer: parseInt(item.answer, 10)
            }))
          })
      }
    })()

    return fetchUser().then((user) => {
      const studentId = user.id
      if (ils) {
        console.log(outputJson)
        return postILS({ studentId, outputJson })
          .then((response) => {
            return !!response
          })
          .catch((error) => {
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
        console.log(outputJson)
        return postListK({ studentId, outputJson })
          .then((response) => {
            return !!response
          })
          .catch((error) => {
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
