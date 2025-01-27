import { Theme } from '@mui/material/styles'
import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AltTheme, DarkTheme, HaskiTheme } from '@common/utils'
import { SnackbarContext, postUserSettings } from '@services'
import { usePersistedStore } from '@store'

export const useThemeProvider = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const [theme, setTheme] = useState<Theme>(HaskiTheme)
  const getUser = usePersistedStore((state) => state.getUser)
  const updateUser = usePersistedStore((state) => state.updateUser)
  const userCache = usePersistedStore((state) => state._user)

  useEffect(() => {
    getUser()
      .then((user) => {
        if (user.settings.theme) {
          loadTheme(user.settings.theme)
        }
      })
      .catch(() => {
        loadTheme()
      })
  }, [userCache])

  const loadTheme = (themeName?: string) => {
    switch (themeName) {
      case 'AltTheme':
        setTheme(AltTheme)
        break
      case 'DarkTheme':
        setTheme(DarkTheme)
        break
      default:
        setTheme(HaskiTheme)
        break
    }
  }

  const updateTheme = (themeName: string) => {
    loadTheme(themeName)
    getUser()
      .then((user) => {
        postUserSettings(themeName, user.settings.user_id, user.lms_user_id)
        updateUser(user.settings.user_id, user.lms_user_id, themeName)
      })
      .catch((error) => {
        addSnackbar({
          message: t('error.getUser'),
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(t('error.getUser') + ' ' + error)
      })
  }

  return { theme, loadTheme, updateTheme } as const
}
