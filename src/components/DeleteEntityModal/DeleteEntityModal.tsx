import { memo, MouseEvent, SetStateAction, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, Modal, Typography } from '@common/components'
import { Warning } from '@common/icons'

/**
 * Props for the DeleteEntityModal component.
 */
type DeleteEntityModalProps = {
  /**
   * Controls the visibility of the delete modal.
   */
  openDeleteEntityModal: boolean

  // Display name of the entity to be deleted (e.g., "Math 101").
  entityName: string

  /**
   * The type of entity being deleted (e.g., "Course", "Topic").
   */
  entityType: string

  /**
   * Unique internal ID of the entity.
   */
  entityId: number

  /**
   * External LMS-specific ID of the entity.
   */
  entityLmsId: number

  /**
   * Callback to set the modal's open state.
   *
   * @param value The new open state.
   */
  setDeleteEntityModalOpen: (value: SetStateAction<boolean>) => void

  /**
   * Callback fired when the user confirms deletion.
   *
   * @param entityId Internal ID.
   * @param extraId External LMS ID.
   */
  onDeleteConfirm: (entityId: number, extraId: number) => void
}

/**
 * Styles for the modal's main Box container.
 */
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

  /**
   * Local state to track whether the confirmation checkbox is checked.
   */
  const [checked, setChecked] = useState(false)

  /**
   * Handles checkbox toggle to allow deletion.
   *
   * @param event Mouse event triggered by clicking the checkbox.
   */
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

/**
 * Modal dialog component for confirming the deletion of an entity.
 *
 * Displays warnings, entity info, and requires user confirmation via checkbox before enabling deletion.
 *
 * @param props See {@link DeleteEntityModalProps}
 * @returns A modal component with a confirmation UI.
 *
 * @example
 * <DeleteEntityModal
 *   openDeleteEntityModal={true}
 *   entityName="Math 101"
 *   entityType="Course"
 *   entityId={1}
 *   entityLmsId={123}
 *   setDeleteEntityModalOpen={setOpen}
 *   onDeleteConfirm={handleConfirm}
 * />
 */
export default memo(DeleteEntityModal)
