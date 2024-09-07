import { memo, useContext } from 'react'
import { AuthContext } from '@services'
import GlobalNavMenu from '../GlobalNavMenu/GlobalNavMenu'

const StatisticsMenu = () => {
  const { isAuth } = useContext(AuthContext)
  //const { t } = useTranslation()
  const statisticsComponents = [
    {
      name: 'Rating dashboard', // TODO: translation
      url: '/ratingdashboard',
      isDisabled: false,
      availableAt: new Date()
    }
  ].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      {isAuth && (
        <GlobalNavMenu
          id="statistics"
          title={'Statistics'} // TODO translation
          content={statisticsComponents}
          isLoading={false}
          tooltip={'Select statistics'} // TODO translation
        />
      )}
    </>
  )
}

export default memo(StatisticsMenu)
