import { memo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '@services'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

const StatisticsMenu = () => {
  const { isAuth } = useContext(AuthContext)
  const { t } = useTranslation()
  const statisticsComponents = [
    {
      name: t('pages.ratingdashboard'),
      url: '/ratingdashboard',
      isDisabled: false,
      availableAt: new Date()
    }
  ]

  return (
    <>
      {isAuth && (
        <GlobalNavMenu
          id="statistics"
          title={t('components.StatisticsMenu.title')}
          content={statisticsComponents}
          isLoading={false}
          tooltip={t('tooltip.statisticsMenuSelection')}
        />
      )}
    </>
  )
}

export default memo(StatisticsMenu)
