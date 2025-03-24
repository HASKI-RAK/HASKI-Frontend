import { MouseEvent, SetStateAction, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Modal, Typography } from '@common/components'
import { Warning } from '@common/icons'

type DeleteEntityModalProps = {
  openDeleteEntityModal: boolean
  entityName: string
  entityType: string // e.g. "Course", "Topic", "Learning Element"
  entityId: number
  entityLmsId: number
  setDeleteEntityModalOpen: (value: SetStateAction<boolean>) => void
  onDeleteConfirm: (entityId: number, extraId: number) => void
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
    xs: '25rem',
    sm: '25rem',
    md: '25rem',
    lg: '35rem',
    xl: '45rem',
    xxl: '50rem',
    xxxl: '55rem'
  }
}

const DeleteEntityModal = ({
  openDeleteEntityModal,
  entityName,
  entityType,
  entityId,
  entityLmsId,
  setDeleteEntityModalOpen,
  onDeleteConfirm
}: DeleteEntityModalProps) => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)

  const handleChecked = useCallback((event: MouseEvent<HTMLElement>) => {
    setChecked((event.target as HTMLInputElement).checked)
  }, [])

  return (
    <Modal
      open={openDeleteEntityModal}
      onClose={() => setDeleteEntityModalOpen(false)}
      className="learning-element-delete-icon"
      data-testid={'delete-entity-modal'}>
      <Box sx={styleBox}>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Warning color="error" sx={{ fontSize: '2rem' }} />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="error">
                {entityType + ' ' + t('components.DeleteEntityModal.header')}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('components.DeleteEntityModal.title-1') + ' ' + entityType + ' '}
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              {entityName}
            </Typography>
            {t('components.DeleteEntityModal.title-2')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
            {t('components.DeleteEntityModal.description')}
          </Typography>
          <Grid item xs={12}>
            <FormControlLabel
              onClick={handleChecked}
              id={`delete-entity-modal-${entityType}-accept-label`}
              data-testid={'delete-entity-modal-accept-label'}
              className="learning-element-delete-icon"
              control={<Checkbox />}
              label={
                <Typography variant="body2">
                  {entityType + ' ' + t('components.DeleteEntityModal.confirmLabel')}
                </Typography>
              }
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
                id={`delete-entity-modal-${entityType}-cancel-button`}
                onClick={() => setDeleteEntityModalOpen(false)}
                variant="outlined"
                className="learning-element-delete-icon">
                {t('appGlobal.cancel')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                id={`delete-entity-modal-${entityType}-delete-button`}
                onClick={() => onDeleteConfirm(entityId, entityLmsId)}
                className="learning-element-delete-icon"
                variant="contained"
                color="error"
                disabled={!checked}>
                {t('appGlobal.delete')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default memo(DeleteEntityModal)
