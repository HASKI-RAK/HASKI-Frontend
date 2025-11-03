import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Grid, Modal, Paper, Typography } from '@common/components'

type SimpleFeedbackModalProps = {
  open: boolean
  onClose: () => void
  experiencePoints: number
}

const SimpleFeedbackModal = ({ open, onClose, experiencePoints }: SimpleFeedbackModalProps) => {
  const { t } = useTranslation()

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal open={open || true}>
      <Paper elevation={3} sx={{ width: '5rem', height: '5rem', left: '48%', top: '30%', position: 'absolute', padding: '2rem' }}>
        <Typography variant="h6">{`${experiencePoints} XP`}</Typography>
        <Button variant="contained" color="primary" id={'simple-feedback-finish-button'} onClick={handleClose}>
          {t('components.SimpleFeedbackModal.button')}
        </Button>
      </Paper>
    </Modal>
  )
}

export default memo(SimpleFeedbackModal)
