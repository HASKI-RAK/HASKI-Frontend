import { Modal, Typography, Box, Button, Link, FormGroup, FormControlLabel, Checkbox } from '@common/components'
import { usePrivacyModal as _usePrivacyModal, PrivacyModalHookReturn } from './PrivacyModal.hooks'
import { useTranslation } from 'react-i18next'
import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'

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
 * prop usePrivacyModal - Hook used for the Modal logic upon clicking a button.
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
  const [checked, setCheck] = useState(false)
  const { privacyPolicyCookieSet, onAcceptHandler } = usePrivacyModal()

  //Disable backdropClick so the Modal only closes via the buttons
  const handleClose = (_: React.MouseEvent<HTMLElement>, reason: string) => {
    if (reason && reason == 'backdropClick') return
  }

  //setting the check so the button gets enabled
  const handleChecked = (event: React.MouseEvent<HTMLElement>) => {
    setCheck((event.target as HTMLInputElement).checked)
  }

  //close the modal and set the cookie in the hook
  const handleModal = (cookieAccepted: boolean) => {
    onAcceptHandler(cookieAccepted)
    setOpen(false)
  }

  //load nothing if cookie is set
  //if (document.cookie.includes('privacy_accept_token')) {
  //  return null
  //}
  if (privacyPolicyCookieSet) return null

  //load nothing if current page is privacypolicy
  if (window.location.href.includes('privacypolicy')) {
    return null
  }

  return (
    <Modal
      aria-labelledby="privacy-modal"
      aria-describedby="makes-the-user-accept-the-privacypolicy-or-not"
      open={open}
      onClose={handleClose}
      closeAfterTransition>
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h4" component="h2">
          {t('components.PrivacyModal.termsOfService')}
          <Typography id="modal-text" variant="h6" component="h2">
            {t('components.PrivacyModal.afterReading')}
            <FormGroup>
              <FormControlLabel
                onClick={handleChecked}
                control={<Checkbox />}
                label={
                  <>
                    {t('agree')}&nbsp;
                    <Link
                      marginX="0.2em"
                      component="button"
                      variant="subtitle1"
                      color={'textSecondary'}
                      href={'/privacypolicy'}
                      underline="hover"
                      onClick={() => navigate('/privacypolicy')}>
                      {t('pages.PrivacyPolicy')}
                    </Link>
                  </>
                }
              />
              <FormControlLabel control={<Checkbox />} label="Agree someting else" />
            </FormGroup>
          </Typography>
          <Box
            height={'20%'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
            <Button variant={'contained'} sx={{ alignSelf: 'end' }} onClick={() => handleModal(false)}>
              {t('decline')}
            </Button>
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
export default memo(PrivacyModal)
