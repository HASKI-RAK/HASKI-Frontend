import { memo, useEffect, useState } from 'react'
import { Grid, Typography } from '@common/components'

const Leaderboard = () => {
  return (
    <Grid container direction={'column'}>
      <Typography variant="h6">Leaderboard</Typography>
    </Grid>
  )
}

export default memo(Leaderboard)
