import { Modal, Typography, Box, Button, Link } from '@common/components'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import {
  usePrivacyModal as _usePrivacyModal,
  PrivacyModalHookProps,
  PrivacyModalHookReturn
} from './PrivacyModal.hooks'
import { useTranslation } from 'react-i18next'
import React from 'react'
//Privacy policy modal
//gibt die privacy policy an, die akzeptiert werden muss
//cookie abfrage schon gesehen? nein->anzeigen
//wenn accept und gelesen->schließen und daten sammeln
//wenn cancel->schließen und keine daten sammeln
//zukünftig in die einstellung eine möglichkeit zum cookie declinen einbauen
//fehlende translation
//snackbar einfügen
//submit handler für cookie setzten
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
  usePrivacyModal?: (props: PrivacyModalHookProps) => PrivacyModalHookReturn
}
const PrivacyModal = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(true)
  const [checked, setCheck] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { onAcceptHandler } = usePrivacyModal({ setIsLoading })

  //Lässt sich nicht einfach wegklicken
  const handleClose = (reason: string) => {
    if (reason && reason == 'backdropClick') return
    setOpen(false)
  }
  //Accept lässt sich klicken sobald die checkbox geklickt ist
  const handleChecked = (event: React.MouseEvent<HTMLElement>) => {
    setCheck((event.target as HTMLInputElement).checked)
  }
  const handleAccept = () => {
    onAcceptHandler(true)
    setOpen(false)
  }
  const handleDecline = () => {
    onAcceptHandler(false)
    setOpen(false)
  }
  //nichts laden wenn auf privacypolicy oder wenn cookie gesetzt
  if (document.cookie.includes('privacy_accept_token')) {
    return <div></div>
  }
  if (window.location.href.includes('privacypolicy')) {
    return <div></div>
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
          <Button variant={'contained'} sx={{ alignSelf: 'start' }} onClick={handleDecline}>
            {t('decline')}
          </Button>
          <Button variant={'contained'} sx={{ alignSelf: 'end' }} disabled={!checked} onClick={handleAccept}>
            {t('accept')}
          </Button>
        </Typography>
      </Box>
    </Modal>
  )
}
export default PrivacyModal
