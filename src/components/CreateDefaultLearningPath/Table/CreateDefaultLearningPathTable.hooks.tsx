import { Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateAlgorithmTableNameProps } from '@components'
import { DefaultLearningPath } from '@core'
import { SnackbarContext, postDefaultLearningPath } from '@services'
import { usePersistedStore, useStore } from '@store'

export type useCreateDefaultLearningPathTableProps = {
  setIsSending: Dispatch<SetStateAction<boolean>>
  orderedItems: string[]
  disabledItems: string[]
}

export const useCreateDefaultLearningPathTable = ({
  setIsSending,
  orderedItems,
  disabledItems
}: useCreateDefaultLearningPathTableProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const getUser = usePersistedStore((state) => state.getUser)
  const clearDefaultLearningPathCache = usePersistedStore((state) => state.clearDefaultLearningPathCache)
  const clearLearningPathElementCache = useStore((state) => state.clearLearningPathElementCache)

  const handleSubmit = useCallback(() => {
    setIsSending(true)
    const orderedItemsData: DefaultLearningPath[] = orderedItems.map((key, index) => ({
      classification: key,
      position: index + 1,
      disabled: disabledItems.includes(key),
      university: 'HS-KE'
    }))
    disabledItems.map((key, index) =>
      orderedItemsData.push({
        classification: key,
        position: index + 9000,
        disabled: true,
        university: 'HS-KE'
      })
    )
    return getUser().then((user) => {
      return postDefaultLearningPath({
        userId: user.settings.id,
        userLmsId: user.lms_user_id,
        outputJson: JSON.stringify(orderedItemsData)
      })
        .then((defaultLearningPath) => {
          clearDefaultLearningPathCache()
          clearLearningPathElementCache()
          setIsSending(false)
        })
        .then(() => {
          addSnackbar({
            message: t('appGlobal.dataSendSuccessful'),
            severity: 'success',
            autoHideDuration: 5000
          })
        })
    })
  }, [
    setIsSending,
    disabledItems,
    getUser,
    orderedItems,
    addSnackbar,
    t,
    clearDefaultLearningPathCache,
    clearLearningPathElementCache
  ])
  return useMemo(
    () => ({
      handleSubmit
    }),
    [handleSubmit]
  )
}
