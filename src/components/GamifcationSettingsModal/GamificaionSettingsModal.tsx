import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Fab, FormControlLabel, Grid, Modal, Radio, RadioGroup, Typography } from '@common/components'
import { Close, Save } from '@common/icons'
import { handleError } from '@components'
import { GamificationSettings } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import { useGamificationSettingsModal } from './GamificationSettingsModalHooks'

type GamificationSettingsModalProps = {
  open: boolean
  onClose: () => void
}

const GamificationSettingsModal = ({ open, onClose }: GamificationSettingsModalProps) => {
  const { t } = useTranslation()

  const { isAuth } = useContext(AuthContext)
  const getGamificationSettings = usePersistedStore((state) => state.getGamificationSettings)
  const getUser = usePersistedStore((state) => state.getUser)
  const { addSnackbar } = useContext(SnackbarContext)

  const [selectedGamificationSettings, setSelectedGamificationSettings] = useState<GamificationSettings>(
    {} as GamificationSettings
  )
  const [waitForBackend, setWaitForBackend] = useState(false)

  const { handleSave, handleSelectPresentation, handleSelectSocial, handleSelectInformation } =
    useGamificationSettingsModal({
      selectedGamificationSettings: selectedGamificationSettings,
      setWaitForBackend,
      setSelectedGamificationSettings,
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

  useEffect(() => {
    if (isAuth) {
      getUser()
        .then((user) => {
          getGamificationSettings(user.id)
            .then((settings) => {
              setSelectedGamificationSettings(settings)
            })
            .catch((error) => {
              handleError(t, addSnackbar, 'error.fetchGamificationSettings', error, 3000)
            })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.fetchUser', error, 3000)
        })
    }
  }, [])

  //TODO: Translations
  return (
    <Modal open={open} onClose={onClose} data-testid="algorithm-settings-modal">
      <Grid
        container
        direction={'column'}
        spacing={'1.5rem'}
        sx={{
          width: { xl: '30rem', lg: '30rem', md: '30rem', xs: '18rem' },
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
        <Grid item spacing={2}>
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
        <Grid item spacing={2}>
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
        <Grid item spacing={2}>
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
