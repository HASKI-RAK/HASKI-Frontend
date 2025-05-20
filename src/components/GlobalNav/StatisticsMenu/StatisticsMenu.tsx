import { AuthContext } from '@services'
import { memo, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

/**
 * # StatisticsMenu component
 *
 * Displays a menu for global navigation to the statistics pages.
 *
 * @remarks
 * Wraps the GlobalNavMenu component with own properties.
 * Returns empty if the user is not authenticated.
 *
 * @example
 * ```tsx
 * <StatisticsMenu />
 * ```
 */
const StatisticsMenu = () => {
  const { isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const statisticsComponents = [
    {
      name: t('pages.learnercharacteristics'),
      url: '/learnercharacteristics',
      isDisabled: false,
      availableAt: new Date()
    }
  ]

  return isAuth ? (
    <GlobalNavMenu
      id="statistics"
      title={t('components.StatisticsMenu.title')}
      content={statisticsComponents}
      isLoading={false}
      tooltip={t('tooltip.statisticsMenuSelection')}
    />
  ) : null
}

export default memo(StatisticsMenu)
