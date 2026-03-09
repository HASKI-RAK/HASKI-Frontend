import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { LocalNavBarHookReturn } from '@components'

const dashboards = ['learnercharacteristics', 'rating', 'scoreboard'] as const

export const useDashboardNavBar = (): LocalNavBarHookReturn => {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()

  return useMemo(
    () => ({
      localNavItems: [...dashboards]
        .map((dashboard) => ({
          key: dashboard,
          isLoading: false,
          isSelected: pathname === `/${dashboard}`,
          name: t(`pages.${dashboard}`),
          url: `/${dashboard}`
        }))
        .sort((a, b) => a.name.localeCompare(b.name, i18n.language)),
      isLoading: false
    }),
    [pathname, t, i18n.language]
  )
}
