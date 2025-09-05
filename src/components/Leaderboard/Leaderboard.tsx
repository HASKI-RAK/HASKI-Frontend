import { useEffect, memo, useState } from 'react'
import { Grid, Typography } from '@common/components'
import { use } from 'i18next'

const Leaderboard = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Leaderboard</Typography>
      </Grid>
    </Grid>
  )
}

export default memo(Leaderboard)