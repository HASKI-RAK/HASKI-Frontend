import React from 'react'
import { Grid, Typography } from '@mui/material'

interface ChallengeTrackerProps {
  objective: string
}

const ChallengeTracker: React.FC<ChallengeTrackerProps> = ({ objective }) => (
  <Grid sx={{ position: 'relative' }}>
    <Typography sx={{ marginBottom: '0rem', marginTop: '0.5rem' }} variant="h6">
      Challenge
    </Typography>
    <Typography variant="body1">{objective}</Typography>
  </Grid>
)

export default ChallengeTracker
