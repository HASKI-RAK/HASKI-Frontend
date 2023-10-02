import { Modal, Typography, Box, Button, Link } from '@common/components'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { usePrivacyModal as _usePrivacyModal, PrivacyModalHookReturn } from './PrivacyModal.hooks'
import { useTranslation } from 'react-i18next'
import React from 'react'
//Privacy policy modal
//gibt die privacy policy an, die akzeptiert werden muss
//cookie abfrage schon gesehen? nein->anzeigen
//wenn accept und gelesen->schließen und daten sammeln
//wenn cancel->schließen und keine daten sammeln
//zukünftig in die einstellung eine möglichkeit zum cookie declinen einbauen
//was passiert wenn accept geklickt wird?
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
export type PrivacyModalProps = {
  usePrivacyModal?: () => PrivacyModalHookReturn
}
const PrivacyModal = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(true)
  const [checked, setCheck] = React.useState(false)
  const { onAcceptHandler } = usePrivacyModal()

  //Lässt sich nicht einfach wegklicken
  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: string) => {
    if (reason && reason == 'backdropClick') return
  }
  //Accept lässt sich klicken sobald die checkbox geklickt ist
  const handleChecked = (event: React.MouseEvent<HTMLElement>) => {
    setCheck((event.target as HTMLInputElement).checked)
  }
  //weiß nicht wie sich das in eine function bringen lässt
  const handleModal = (lol: boolean) => {
    onAcceptHandler(lol)
    setOpen(false)
  }
  //nichts laden wenn auf privacypolicy oder wenn cookie gesetzt
  if (document.cookie.includes('privacy_accept_token')) {
    return null
  }
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
          {t('components.PrivacyModal.TermsofService')}
          <Typography id="modal-text" variant="h6" component="h2">
            {t('components.PrivacyModal.afterReading')}
            <FormGroup>
              <FormControlLabel
                onClick={handleChecked}
                control={<Checkbox />}
                label={
                  <div>
                    {t('agree')}&nbsp;
                    <Link href="privacypolicy" underline="none">
                      Privacy Policy
                    </Link>
                  </div>
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
export default PrivacyModal
