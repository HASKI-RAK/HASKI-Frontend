import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid, Modal, Paper, Typography } from '@common/components'
import { ExperiencePointsPostResponse } from '@core'

type EarnedXPDisplayProps = {
  experiencePointDetails?: ExperiencePointsPostResponse
}

const EarnedXPDisplay = ({ experiencePointDetails }: EarnedXPDisplayProps) => {
  const { t } = useTranslation()

  return experiencePointDetails ? (
    <Grid sx={{ p: '1rem', mt: '1rem' }}>
      <Typography variant="h6">{`${experiencePointDetails.gained_xp} XP`}</Typography>
    </Grid>
  ) : (
    <></>
  )
}

export default memo(EarnedXPDisplay)
