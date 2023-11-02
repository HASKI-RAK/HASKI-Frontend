import {
  Modal,
  Typography,
  Box,
  Button,
  Link,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip
} from '@common/components'
import { usePrivacyModal as _usePrivacyModal, PrivacyModalHookReturn } from './PrivacyModal.hooks'
import { useTranslation } from 'react-i18next'
import { useState, memo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex'
}

/**
 * @prop usePrivacyModal - Hook used for the Modal logic upon clicking a button.
 * @interface
 */

export type PrivacyModalProps = {
  usePrivacyModal?: () => PrivacyModalHookReturn
}

/**
 * PrivacyModal component.
 *
 * @param props - Props containing the logic to accept and decline the privacy policy cookie.
 *
 * @remarks
 * PrivacyModal shows a Modal for the user to read and accept the PrivacyPolicy and other.
 * The PrivacyModal gets shown upon entering HASKI.
 * Gets rendered in App.
 *
 * @category Components
 */

const PrivacyModal = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [checked, setChecked] = useState(false)
  const { privacyPolicyCookie, handleAccept } = usePrivacyModal()
  const currentLocation = useLocation()

  //Disable backdropClick so the Modal only closes via the buttons
  const handleClose = useCallback((_: React.MouseEvent<HTMLElement>, reason: string) => {
    if (reason && reason == 'backdropClick') return
  }, [])

  //Sets checkbox to enable button
  const handleChecked = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setChecked((event.target as HTMLInputElement).checked)
    },
    [setChecked]
  )

  //close the modal and set the cookie in the hook
  const handleModal = useCallback(
    (cookieAccepted: boolean) => {
      handleAccept(cookieAccepted)
      setOpen(false)
    },
    [handleAccept, setOpen]
  )

  return (
    <>
      {
        // Don't load anything, if the current page is privacy policy page or the privacy policy cookie is set.
        !(currentLocation.pathname.includes('privacypolicy') || privacyPolicyCookie) && (
          <Modal
            aria-labelledby="privacy-modal"
            aria-describedby="makes-the-user-accept-the-privacypolicy-or-not"
            open={open}
            onClose={handleClose}
            closeAfterTransition>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h4" component="h2">
                {t('components.PrivacyModal.termsOfService')}
                <Typography id="modal-text" variant="subtitle1" component="h2">
                  {t('components.PrivacyModal.afterReading')}
                  <FormGroup>
                    <FormControlLabel
                      onClick={handleChecked}
                      control={<Checkbox />}
                      label={
                        <>
                          {t('components.PrivacyModal.readPrivacypolicy')}
                          <Link
                            marginX="0.2em"
                            component="button"
                            variant="subtitle1"
                            color={'textSecondary'}
                            href={'/privacypolicy'}
                            underline="hover"
                            onClick={() => navigate('/privacypolicy')}>
                            {t('pages.privacypolicy')}
                          </Link>
                          {t('components.PrivacyModal.readPrivacypolicy2')}
                        </>
                      }
                    />
                  </FormGroup>
                </Typography>
                <Box
                  height={'20%'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                  <Tooltip title={t('components.PrivacyModal.returnToMoodle')}>
                    <Button
                      variant={'contained'}
                      sx={{ alignSelf: 'end' }}
                      aria-multiline={'true'}
                      onClick={() => {
                        handleModal(false)
                        window.location.assign('https://moodle.hs-kempten.de/enrol/index.php?id=357')
                      }}>
                      {t('decline')}
                    </Button>
                  </Tooltip>
                  <Button
                    variant={'contained'}
                    sx={{ alignSelf: 'end' }}
                    disabled={!checked}
                    onClick={() => handleModal(true)}>
                    {t('accept')}
                  </Button>
                </Box>
              </Typography>
            </Box>
          </Modal>
        )
      }
    </>
  )
}
export default memo(PrivacyModal)
