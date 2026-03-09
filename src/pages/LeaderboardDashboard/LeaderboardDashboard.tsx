import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@common/components'
import { BadgeLeaderboard, XpLeaderboard } from '@components'
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
    <Grid container spacing={4} alignItems="center" justifyContent="center" direction="column">
      <Grid item>
        <Typography variant="h4" align="center">
          {t('pages.leaderboardDashboard.title')}
        </Typography>
      </Grid>
      <Grid container item spacing={10} justifyContent="center">
        <Grid item>
          <XpLeaderboard showVisually={gamificationSettings.presentation === 'visual' || visualInput} />
        </Grid>
        <Grid item>
          <BadgeLeaderboard showVisually={gamificationSettings.presentation === 'visual' || visualInput} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LeaderboardDashboard
