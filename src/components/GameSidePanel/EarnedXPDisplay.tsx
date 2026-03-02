import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@common/components'
import { ExperiencePointsPostResponse } from '@core'

type EarnedXpDisplayProps = {
  experiencePointDetails?: ExperiencePointsPostResponse
  attemptDuration?: number
}

const EarnedXpDisplay = ({ experiencePointDetails, attemptDuration }: EarnedXpDisplayProps) => {
  const { t } = useTranslation()

  // TODO: Translations

  return experiencePointDetails ? (
    <Grid sx={{ p: '1rem', mt: '1rem' }}>
      <Typography variant="h6">{`${experiencePointDetails.gained_xp} XP`}</Typography>
      {experiencePointDetails.rating_points > 0 && (
        <>
          <Typography variant="body1">
            {`${t('components.EarnedXpDisplay.baseXp')}: ${experiencePointDetails.base_xp}`}
          </Typography>
          <Typography variant="body1">
            {`${t('components.EarnedXpDisplay.scoreModifier')}: ${experiencePointDetails.score_modifier}`}
          </Typography>
          <Typography variant="body1">
            {`${t('components.EarnedXpDisplay.attemptXp')}: ${experiencePointDetails.attempt_xp}`}
          </Typography>
          <Typography variant="body1">
            {`${t('components.EarnedXpDisplay.successModifier')}: ${experiencePointDetails.success_modifier}`}
          </Typography>
          <Typography variant="body1">
            {`${t('components.EarnedXpDisplay.ratingPoints')}: ${experiencePointDetails.rating_points}`}
          </Typography>
          <Typography variant="body1">
            {`${t('components.EarnedXpDisplay.waitBonus')}: ${experiencePointDetails.wait_bonus}`}
          </Typography>
          {attemptDuration !== undefined && (
            <Typography variant="body1">
              {`${t('components.EarnedXpDisplay.attemptDuration')}: ${attemptDuration}s`}
            </Typography>
          )}
        </>
      )}
    </Grid>
  ) : (
    <></>
  )
}

export default memo(EarnedXpDisplay)
