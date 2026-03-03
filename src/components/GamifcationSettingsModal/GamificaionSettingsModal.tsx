import { memo, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Fab, FormControlLabel, Grid, Modal, Radio, RadioGroup, Typography } from '@common/components'
import { Close, Save } from '@common/icons'
import { GamificationSettings } from '@core'
import { useGamificationSettingsModal } from './GamificationSettingsModalHooks'

type GamificationSettingsModalProps = {
  open: boolean
  onClose: () => void
  gamificationSettings: GamificationSettings
  setGamificationSettings: (value: SetStateAction<GamificationSettings>) => void
}

const GamificationSettingsModal = ({
  open,
  onClose,
  gamificationSettings,
  setGamificationSettings
}: GamificationSettingsModalProps) => {
  const { t } = useTranslation()

  const [selectedGamificationSettings, setSelectedGamificationSettings] =
    useState<GamificationSettings>(gamificationSettings)
  const [waitForBackend, setWaitForBackend] = useState(false)

  const { handleSave, handleSelectPresentation, handleSelectSocial, handleSelectInformation } =
    useGamificationSettingsModal({
      selectedGamificationSettings: selectedGamificationSettings as GamificationSettings,
      setWaitForBackend,
      setSelectedGamificationSettings,
      setGamificationSettings,
      onClose
    })

  const PresentationOptions = [
    { value: 'visual', label: t('components.GamificationSettingsModal.visual') },
    { value: 'verbal', label: t('components.GamificationSettingsModal.verbal') }
  ]

  const SocialOptions = [
    { value: 'group', label: t('components.GamificationSettingsModal.group') },
    { value: 'individual', label: t('components.GamificationSettingsModal.individual') }
  ]

  const InformationOptions = [
    { value: 'detailed', label: t('components.GamificationSettingsModal.detailed') },
    { value: 'brief', label: t('components.GamificationSettingsModal.brief') }
  ]

  //TODO: Translations
  return (
    <Modal open={open} onClose={onClose} data-testid="algorithm-settings-modal">
      <Grid
        container
        direction={'column'}
        sx={{
          width: { xl: '50rem', lg: '40rem', md: '40rem', xs: '18rem' },
          height: '30rem',
          right: 50,
          bgcolor: 'background.paper',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '2px solid #D4D4D4',
          borderRadius: 6,
          boxShadow: 24,
          p: 4
        }}>
        <Typography id="gamification-settings-modal-title" variant="h6" component="h6" align="center">
          {t('components.GamificationSettingsModal.title')}
        </Typography>
        <Grid item container direction="row" spacing={2}>
          <Typography variant="body1">{t('components.GamificationSettingsModal.presentation')}</Typography>
          <RadioGroup onChange={handleSelectPresentation} id="gamification-settings-presentation-radio-group">
            {PresentationOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio checked={selectedGamificationSettings?.presentation === option.value} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Typography variant="body1">{t('components.GamificationSettingsModal.social')}</Typography>
          <RadioGroup onChange={handleSelectSocial} id="gamification-settings-social-radio-group">
            {SocialOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio checked={selectedGamificationSettings?.social === option.value} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          <Typography variant="body1">{t('components.GamificationSettingsModal.information')}</Typography>
          <RadioGroup onChange={handleSelectInformation} id="gamification-settings-information-radio-group">
            {InformationOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio checked={selectedGamificationSettings?.information === option.value} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </Grid>
        <Fab
          onClick={handleSave}
          aria-label="save"
          id="gamification-settings-modal-save-button"
          data-testid={'gamification-settings-modal-save-button'}
          sx={{ position: 'absolute', right: '0.5rem', bottom: '0.5rem' }}
          disabled={waitForBackend} // Disable while loading
        >
          {waitForBackend ? <CircularProgress size={24} /> : <Save />}
        </Fab>
        <Fab
          sx={{
            width: { xl: '3.5rem', md: '2rem', sm: '2rem', xs: '2rem' },
            height: { xl: '3.5rem', md: '2rem', xs: '2rem' },
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem'
          }}
          color="primary"
          id="algorithm-settings-modal-close-button"
          onClick={() => {
            onClose()
          }}
          data-testid="algorithm-settings-modal-close-button">
          <Close />
        </Fab>
      </Grid>
    </Modal>
  )
}

export default memo(GamificationSettingsModal)
