import { useState, useEffect, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Paper, Button, Modal, Typography } from '@common/components'

type GameFeedbackBoxProps = {
  open: boolean
  onClose: () => void
}

const GameFeedbackBox = ({ open, onClose }: GameFeedbackBoxProps) => {
  const { t } = useTranslation('game')

  const [mainText, setMainText] = useState('')

  const handleClose = () => onClose()

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid container direction="row" alignItems="center" justifyContent="center">
          <Typography variant="h6">{t('components.gamefeedback.title')}</Typography>
          <Button variant="contained" color="primary" id={'game-feedback-finish-button'}>
            {t('components.gamefeedback.finishButton')}
          </Button>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default memo(GameFeedbackBox)