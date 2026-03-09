import { ChangeEvent, Dispatch, SetStateAction, useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { handleError } from '@components'
import { GamificationSettings } from '@core'
import { postGamificationSettings } from '@services'
import { SnackbarContext } from '@services'
import { usePersistedStore } from '@store'

type UseGamificationSettingsModalHookParams = {
  selectedGamificationSettings: GamificationSettings
  setWaitForBackend: Dispatch<SetStateAction<boolean>>
  setSelectedGamificationSettings: Dispatch<SetStateAction<GamificationSettings>>
  onClose: () => void
}

type UseGamificationSettingsModalHookReturn = {
  handleSave: () => void
  handleSelectPresentation: (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectSocial: (event: ChangeEvent<HTMLInputElement>) => void
  handleSelectInformation: (event: ChangeEvent<HTMLInputElement>) => void
}

export const useGamificationSettingsModal = ({
  onClose,
  selectedGamificationSettings,
  setSelectedGamificationSettings,
  setWaitForBackend
}: UseGamificationSettingsModalHookParams): UseGamificationSettingsModalHookReturn => {
  const { t } = useTranslation()
  const getUser = usePersistedStore((state) => state.getUser)
  const setStoreGamificationSettings = usePersistedStore((state) => state.setGamificationSettings)
  const { addSnackbar } = useContext(SnackbarContext)

  const handleSave = useCallback(() => {
    setWaitForBackend(true)
    getUser().then((user) => {
      postGamificationSettings(user.id, selectedGamificationSettings)
        .then((response) => {
          setStoreGamificationSettings(user.id, response)
          addSnackbar({ message: t('components.GamificationSettingsModal.saveSuccess') })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postGamificationSettings', error, 3000)
        })
        .finally(() => {
          setWaitForBackend(false)
        })
    })
    onClose()
  }, [
    selectedGamificationSettings,
    getUser,
    postGamificationSettings,
    setStoreGamificationSettings,
    addSnackbar,
    t,
    onClose
  ])

  const handleSelectPresentation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedGamificationSettings((prev) => ({ ...prev, presentation: event.target.value }))
    },
    [selectedGamificationSettings, setSelectedGamificationSettings]
  )

  const handleSelectSocial = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedGamificationSettings((prev) => ({ ...prev, social: event.target.value }))
    },
    [selectedGamificationSettings, setSelectedGamificationSettings]
  )

  const handleSelectInformation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedGamificationSettings((prev) => ({ ...prev, information: event.target.value }))
    },
    [selectedGamificationSettings, setSelectedGamificationSettings]
  )

  return useMemo(
    () => ({
      handleSave,
      handleSelectPresentation,
      handleSelectSocial,
      handleSelectInformation
    }),
    [handleSave, handleSelectPresentation, handleSelectSocial, handleSelectInformation]
  )
}
