import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, Fab, FormControlLabel, Grid, Modal, Radio, RadioGroup, Tooltip, Typography } from '@common/components'
import { Close, Save, School } from '@common/icons'
import useAlgorithmSettingsModal from './AlgorithmSettingsModal.hooks'

/**
 * @prop isOpen - Boolean value to determine if the modal is open.
 * @prop handleClose - function executed when closing the modal.
 * @prop getIDs - Object containing the courseID and topicID.
 * @prop options - Array of objects containing the name, description,
 *  and key of the algorithms. Used in Tests instead of the translation output.
 * @interface
 */
type AlgorithmSettingsModalProps = {
  isOpen: boolean
  handleClose: () => void
  getIDs: { courseID: number | null; topicID: number | null }
  options?: { name: string; description: string; key: string }[] //for testing
}

type optionsType = {
  name: string
  description: string
  key: string
  disabled: true
}[]
/**
 *
 * @param props allowing opening an closing of Modal and to give the ids of courses and topics
 *
 * @remarks
 * This component consists of a modal, that allows the user to set an algorithm for a topic or entire course depending
 * on the props. All available algorithms are displayed as radio buttons. A short description of the selected algorithm is displayed
 *
 *
 * @category components
 */
const AlgorithmSettingsModal = (props: AlgorithmSettingsModalProps): JSX.Element => {
  const [selected, setSelected] = useState(0)
  //change hardcoded teacher selection to fetched teacher selection
  const [teacherSelection, setTeacherSelection] = useState(0)
  const { t } = useTranslation()
  const options =
    props.options ??
    [...(t('components.AlgorithmSettingsModal.algorithms', { returnObjects: true }) as optionsType)].slice(1)
  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(parseInt(event.target.value))
    },
    [setSelected]
  )
  const { handleSave } = useAlgorithmSettingsModal({
    handleClose: props.handleClose,
    options,
    selected,
    getIDs: props.getIDs
  })
  //useImperativeHandle(props.ref, () => ({handleSave}), [handleSave])

  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-testid="algorithm-modal">
      <Grid
        container
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
        <Grid item container direction="row" spacing={2}>
          <Grid item container direction="column" spacing={1} xs={5}>
            <Typography id="modal-title" variant="h6" component="h6" align="center">
              {t('components.AlgorithmSettingsModal.headerLeft')}
            </Typography>
            <RadioGroup onChange={handleSelect}>
              {options.map((option, index) => (
                <Grid item container direction="row" key={option.key}>
                  <FormControlLabel
                    sx={{ width: { xl: '16rem' } }}
                    value={index}
                    control={<Radio role="radio-button" checked={index === selected} />}
                    label={option.name}
                  />
                  {teacherSelection === index && (
                    <Tooltip
                      arrow
                      title={t('components.AlgorithmSettingsModal.teacherIconTip')}
                      data-testid="teacher-icon">
                      <School />
                    </Tooltip>
                  )}
                </Grid>
              ))}
            </RadioGroup>
          </Grid>
          <Fab
            sx={{
              width: { xl: '3.5rem', md: '2rem', sm: '2rem', xs: '2rem' },
              height: { xl: '3.5rem', md: '2rem', xs: '2rem' },
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem'
            }}
            color="primary"
            onClick={props.handleClose}
            data-testid="algorithm-modal-close-button">
            <Close />
          </Fab>
          <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'flex' } }} />
          <Grid item container direction="column" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }} xs={6.5}>
            <Typography id="modal-description-header" variant="h6" component="h6" align="center">
              {t('components.AlgorithmSettingsModal.headerRight')}
            </Typography>
            <Typography id="modal-description" variant="body1" component="p" align="center">
              {options[selected].description}
            </Typography>
          </Grid>
        </Grid>
        <Fab
          onClick={handleSave}
          aria-label="save"
          data-testid={'algorithm-save-button'}
          sx={{ position: 'absolute', right: '0.5rem', bottom: '0.5rem' }}>
          <Save />
        </Fab>
      </Grid>
    </Modal>
  )
}
export default memo(AlgorithmSettingsModal)
