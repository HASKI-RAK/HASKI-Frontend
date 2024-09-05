import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

const StatisticsMenu = () => {
  //const { t } = useTranslation()
  const statisticsComponents = [
    {
      name: 'Rating dashboard',
      url: '/ratingdashboard',
      isDisabled: false,
      availableAt: new Date()
    }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <GlobalNavMenu
      id="statistics"
      title={'Statistics'}
      content={statisticsComponents}
      isLoading={false}
      tooltip={'Select statistics'}
    />
  )
}

export default memo(StatisticsMenu)
