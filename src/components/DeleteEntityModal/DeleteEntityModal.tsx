import WarningIcon from '@mui/icons-material/Warning'
import { Box, Button, Checkbox, Grid, Modal, Typography } from '@mui/material'
import { SetStateAction, memo, useCallback, useState } from 'react'
import { Divider, FormControlLabel } from '@common/components'

type DeleteEntityModalProps = {
  open: boolean
  entityName: string
  entityType: string // e.g. "Kurs" or "Thema"
  entityId: number
  extraId: number // optional extra id, if needed (e.g. lmsCourseId)
  setDeleteEntityModalOpen: (value: SetStateAction<boolean>) => void
  onConfirm: (entityId: number, extraId: number) => void
  description?: string // optional custom description text
  confirmLabel?: string // optional custom label for the checkbox
}

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
}

const DeleteEntityModal = ({
  open,
  entityName,
  entityType,
  entityId,
  extraId,
  setDeleteEntityModalOpen,
  onConfirm,
  description,
  confirmLabel
}: DeleteEntityModalProps) => {
  const [checked, setChecked] = useState(false)

  const handleChecked = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setChecked((event.target as HTMLInputElement).checked)
  }, [])

  const defaultDescription = `Mit dieser Aktion werden alle zugehörigen Inhalte aus dem HASKI-System unwiderruflich entfernt. Diese Aktion kann nicht rückgängig gemacht werden.`
  const defaultConfirmLabel = `Den ${entityType} samt aller Inhalte aus dem HASKI-System unwiderruflich löschen`

  return (
    <Modal open={open} onClose={() => setDeleteEntityModalOpen(false)} className="learning-element-delete-icon">
      <Box sx={styleBox}>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <WarningIcon color="error" sx={{ fontSize: '2rem' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="error">
                {entityType} endgültig löschen
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Sie sind dabei, den {entityType}{' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              {entityName}
            </Typography>{' '}
            zu löschen.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
            {description || defaultDescription}
          </Typography>
          <Grid item xs={12}>
            <FormControlLabel
              onClick={handleChecked}
              className="learning-element-delete-icon"
              control={<Checkbox />}
              label={<Typography variant="body2">{confirmLabel || defaultConfirmLabel}</Typography>}
              sx={{
                width: '100%',
                backgroundColor: 'action.hover',
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
              <Button
                onClick={() => setDeleteEntityModalOpen(false)}
                variant="outlined"
                className="learning-element-delete-icon">
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => onConfirm(entityId, extraId)}
                className="learning-element-delete-icon"
                variant="contained"
                color="error"
                disabled={!checked}>
                Löschen
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default memo(DeleteEntityModal)
