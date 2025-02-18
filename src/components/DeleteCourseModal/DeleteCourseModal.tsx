import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import { Button, Checkbox, Grid, Modal, Typography } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import { Divider, FormControlLabel, Link } from '@common/components'

type DeleteCourseModalProps = {
  open: boolean
  courseName: string
  onClose: () => void
  onConfirm: () => void
}

const DeleteCourseModal = ({ open, courseName, onClose, onConfirm }: DeleteCourseModalProps) => {
  const [checked, setChecked] = useState(false)

  const handleChecked = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setChecked((event.target as HTMLInputElement).checked)
  }, [])

  return (
    <Modal open={open} onClose={onClose}>
      <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Grid
          item
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            width: {
              xs: '20rem',
              sm: '20rem',
              md: '20rem',
              lg: '30rem',
              xl: '40rem',
              xxl: '45rem',
              xxxl: '50rem'
            }
          }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <WarningIcon color="error" sx={{ fontSize: '2rem' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="error">
                Kurs endgültig löschen
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Sie sind dabei, den Kurs{' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              {courseName}
            </Typography>{' '}
            zu löschen.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
            Mit dieser Aktion werden alle zugehörigen Themenbereiche und deren enthaltene Lernelemente aus dem HASKI
            System unwiderruflich entfernt. Diese Aktion kann{' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              nicht
            </Typography>{' '}
            rückgängig gemacht werden.
          </Typography>
          <Grid item xs={12}>
            <FormControlLabel
              onClick={handleChecked}
              control={<Checkbox />}
              label={
                <Typography variant="body2">
                  Den Kurs samt aller Inhalte aus dem HASKI-System unwiderruflich löschen
                </Typography>
              }
              sx={{
                width: '100%',
                backgroundColor: 'action.hover', // subtle highlight
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
                mt: 2
              }}
            />
          </Grid>
          <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Button onClick={onClose} variant="outlined">
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onConfirm} variant="contained" color="error" disabled={!checked}>
                Löschen
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default memo(DeleteCourseModal)
