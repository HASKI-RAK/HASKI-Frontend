import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@common/components'
import { usePersistedStore } from '@store'
import { GamificationSettings } from '@core'
import { ILSContext } from '@services'

type LeaderboardProps = {
  maxRanks?: number
}

const Leaderboard = ({ maxRanks }: LeaderboardProps) => {
  const { t } = useTranslation()
  const getUser = usePersistedStore((state) => state.getUser)
  const getGamificationSettings = usePersistedStore((state) => state.getGamificationSettings)

  const [ gamificationSettings, setGamificationSettings ] = useState<GamificationSettings>({} as GamificationSettings)

  const { visualInput } = useContext(ILSContext)

  useEffect(() => {
    getUser()
      .then((user) => {
        getGamificationSettings(user.id)
          .then((gamificationSettings) => {
            setGamificationSettings(gamificationSettings)
          })
          .catch((error) => {
            // Handle error fetching gamification settings
          })
      })
      .catch((error) => {
        // Handle error fetching user
      })
  }, [])

  return (
    <Grid>
      
    </Grid>
  )
}

export default memo(Leaderboard)
