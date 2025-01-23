import { Theme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { AltTheme, DarkTheme, HaskiTheme } from '@common/utils'
import { postUserSettings } from '@services'
import { usePersistedStore } from '@store'

export const useThemeProvider = () => {
  const [theme, setTheme] = useState<Theme>(HaskiTheme)
  const getUser = usePersistedStore((state) => state.getUser)
  const updateUser = usePersistedStore((state) => state.updateUser)
  const userCache = usePersistedStore((state) => state._user)

  useEffect(() => {
    getUser().then((user) => {
      if (user?.settings.theme) {
        loadTheme(user.settings.theme)
      }
    })
  }, [userCache])

  const loadTheme = (themeName: string) => {
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
    getUser().then((user) => {
      if (user) {
        postUserSettings(themeName, user.settings.user_id, user.lms_user_id)
        updateUser(user.settings.user_id, user.lms_user_id, themeName)
      }
    })
  }

  return { theme, loadTheme, updateTheme } as const
}
