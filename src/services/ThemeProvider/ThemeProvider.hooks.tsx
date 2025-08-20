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

const toThemeName = (theme: Theme): Theme['name'] => theme.name
const toTheme = (themeName: Theme['name']): Theme => themeMapping[themeName] || HaskiTheme

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
          const themeName = toThemeName(theme)
          postUserSettings(themeName, user.settings.user_id, user.lms_user_id)
          updateUserTheme(themeName)
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
    [getUser, updateUserTheme, addSnackbar, t]
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
