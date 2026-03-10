import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { LocalNavBarHookReturn } from '../LocalNavBar/LocalNavBar.hooks'
import { LocalNavItemProps } from '../LocalNavItem/LocalNavItem'

export const useDashboardNavBar = (): LocalNavBarHookReturn => {
  // Hooks
  const { pathname } = useLocation()
  const { t } = useTranslation()

  // Constants
  const dashboards: string[] = ['learnercharacteristics', 'rating']
  const localNavItemProps: LocalNavItemProps[] = dashboards.map((dashboard) => ({
    key: dashboard,
    isLoading: false,
    isSelected: pathname === `/${dashboard}`,
    name: t(`pages.${dashboard}`),
    url: `/${dashboard}`
  }))

  return {
    isLoading: false,
    localNavItemProps
  }
}
