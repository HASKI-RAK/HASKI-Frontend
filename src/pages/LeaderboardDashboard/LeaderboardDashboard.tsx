import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@common/components'
import { BadgeBarChart, BadgeLeaderboard, XpBarChart, XpLeaderboard } from '@components'
import { GamificationSettings } from '@core'
import { ILSContext } from '@services'
import { usePersistedStore } from '@store'

const LeaderboardDashboard = () => {
  const { t } = useTranslation()

  const { visualInput } = useContext(ILSContext)

  const [gamificationSettings, setGamificationSettings] = useState<GamificationSettings>({} as GamificationSettings)

  const getUser = usePersistedStore((state) => state.getUser)
  const getGamificationSettings = usePersistedStore((state) => state.getGamificationSettings)

  useEffect(() => {
    getUser().then((user) => {
      getGamificationSettings(user.id).then((settings) => {
        setGamificationSettings(settings)
      })
    })
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          {t('pages.leaderboardDashboard.title')}
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        {gamificationSettings.presentation === 'visual' || visualInput ? (
          <Grid container item xs={12} spacing={4}>
            <XpBarChart />
            <BadgeBarChart />
          </Grid>
        ) : (
          <Grid container item xs={12} spacing={4}>
            <XpLeaderboard />
            <BadgeLeaderboard />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default LeaderboardDashboard
