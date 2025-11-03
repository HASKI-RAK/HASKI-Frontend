import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid, Modal, Paper, Typography } from '@common/components'
import { ExperiencePointsPostResponse } from '@core'

type GameFeedbackModalProps = {
  open: boolean
  onClose: () => void
  experiencePointDetails?: ExperiencePointsPostResponse
  startTime?: number
  endTime?: number
}

const GameFeedbackModal = ({
  open,
  onClose,
  experiencePointDetails,
  startTime,
  endTime
}: GameFeedbackModalProps) => {
  const { t } = useTranslation()
  const [feedbackRank, setFeedbackRank] = useState<number>(0)
  const [attemptDuration, setAttemptDuration] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const feedbackTitleKey = [
    'components.GameFeedbackModal.failureTitle',
    'components.GameFeedbackModal.successTitle',
    'components.GameFeedbackModal.perfectTitle'
  ]

  const feedbackDescriptionKey = [
    'components.GameFeedbackModal.failureDescription',
    'components.GameFeedbackModal.successDescription',
    'components.GameFeedbackModal.perfectDescription'
  ]

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (startTime && endTime) {
      const timeTaken = endTime - startTime
      setAttemptDuration(timeTaken)
    }
  }, [startTime, endTime])

  useEffect(() => {
    // Close modal if no experience point details or classifications are provided when opened
    if (experiencePointDetails) {
      setFeedbackRank(Math.floor(experiencePointDetails.success_modifier + experiencePointDetails.score_modifier))
    }
  }, [experiencePointDetails])

  useEffect(() => {
    setIsVisible(Boolean(experiencePointDetails))
  }, [experiencePointDetails])

  if (!isVisible) return <></>

  return (
    <Modal open={open}>
      <Paper elevation={3} sx={{
            position: 'absolute',
            left: '30%',
            right: '30%',
            top: '10%',
            width: '60rem',
            height: '25rem',
            overflow: 'auto',
            maxHeight: '83%',
            bgcolor: 'background.paper',
            border: (theme) => '2px solid' + theme.palette.primary.main,
            boxShadow: 24,
            p: 1
          }}>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ p: '1rem' }}>
          <Typography variant="h6">{t(feedbackTitleKey[feedbackRank])}</Typography>
          <Typography sx={{ mb: '1rem' }} variant="body1">
            {t(feedbackDescriptionKey[feedbackRank])}
          </Typography>
          <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} sx={{ minHeight: '200px' }}>
            <Grid container direction="column" sx={{ width: 'fit-content' }}>
              {/*<Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ width: '35rem' }}>
                  {t('components.GameFeedbackModal.attemptDuration')}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>{`${attemptDuration}s`}</Typography>
              </Grid>*/}
              <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ width: '35rem' }}>
                  {t('components.GameFeedbackModal.baseXp')}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>{`${experiencePointDetails?.base_xp}`}</Typography>
              </Grid>
              <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ width: '35rem' }}>
                  {t('components.GameFeedbackModal.scoreMultiplier')}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>{'\u00D7' + `${experiencePointDetails?.score_modifier}`}</Typography>
              </Grid>
              <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ width: '35rem' }}>
                  {t('components.GameFeedbackModal.attempts')}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>{`+${Math.round(experiencePointDetails?.attempt_xp || 0)}`}</Typography>
              </Grid>
              <Grid container direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body1" sx={{ width: '35rem' }}>
                  {t('components.GameFeedbackModal.successRepetitionBonus')}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                  {`+${Math.round((experiencePointDetails?.success_modifier ?? 0) * 200 * (experiencePointDetails?.wait_bonus ?? 0))}`}
                </Typography>
              </Grid>
              <Grid container direction="row" justifyContent="space-between" sx={{ mt: '1rem', mb: '2rem' }}>
                <Typography variant="body1" sx={{ width: '35rem', fontWeight: 'bold' }}>
                  {t('components.GameFeedbackModal.totalGainedXp')}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right', fontWeight: 'bold' }}>{`${Math.round(experiencePointDetails?.gained_xp || 0)}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" id={'game-feedback-finish-button'} onClick={handleClose}>
            {t('components.gamefeedback.finishButton')}
          </Button>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default memo(GameFeedbackModal)
