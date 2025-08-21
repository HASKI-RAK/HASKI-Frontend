import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Theme } from '@common/theme'
import log from 'loglevel'
import { AltTheme, DarkTheme, HaskiTheme } from '@common/utils'
import { postUserSettings, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'

export const themeMapping: Record<Theme['name'], Theme> = {
  HaskiTheme,
  DarkTheme,
  AltTheme
}

// Utility functions to convert between Theme and Theme name
const toTheme = (themeName: Theme['name']): Theme => themeMapping[themeName] || HaskiTheme

/**
 * useThemeProvider is a custom hook that provides the current theme and a function to update it.
 * It fetches the user settings to determine the initial theme and updates the user's theme preference.
 *
 * @returns An object containing the current theme and a function to update the theme.
 */
export const useThemeProvider = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const [theme, setTheme] = useState<Theme>(HaskiTheme)
  const getUser = usePersistedStore((state) => state.getUser)
  const updateUserTheme = usePersistedStore((state) => state.updateUserTheme)
  const userCache = usePersistedStore((state) => state._user)

  const updateTheme = useCallback(
    async (theme: Theme) => {
      setTheme(theme.name in themeMapping ? theme : HaskiTheme)
      getUser()
        .then((user) => {
          postUserSettings(theme.name, user.settings.user_id, user.lms_user_id)
          updateUserTheme(theme.name)
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.getUser') + ' ' + error)
        })
    },
    [setTheme, getUser, updateUserTheme, addSnackbar, t]
  )

  useEffect(() => {
    getUser()
      .then((user) => {
        if (user.settings.theme) {
          setTheme(toTheme(user.settings.theme))
        }
      })
      .catch(() => {
        setTheme(HaskiTheme)
      })
  }, [userCache])

  return useMemo(() => ({ theme, updateTheme }), [theme, updateTheme])
}
