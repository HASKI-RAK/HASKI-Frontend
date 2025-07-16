import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CircularProgress,
  Divider,
  Fab,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Tooltip,
  Typography
} from '@common/components'
import { Close, Save, School } from '@common/icons'
import useAlgorithmSettingsModal from './AlgorithmSettingsModal.hooks'

/**
 * Props for the {@link AlgorithmSettingsModal} component.
 */
type AlgorithmSettingsModalProps = {
  /**
   * Boolean indicating if the modal is open.
   */
  isOpen: boolean
  /**
   * Callback triggered when the modal is closed.
   */
  handleClose: () => void
  /**
   * Optional callback executed when the selected algorithm changes.
   */
  changeObserver?: () => void
  /**
   * Optional topic ID for which to set the algorithm.
   */
  topicId?: number
}

/**
 * Type representing the available algorithm options.
 * Each option contains a name, description, and unique key.
 */
export type OptionsType = {
  name: string
  description: string
  key: string
}[]

const AlgorithmSettingsModal = (props: AlgorithmSettingsModalProps): JSX.Element => {
  // Translation hook for i18n text
  const { t } = useTranslation()

  /**
   * Algorithm options loaded from translations.
   * Contains the name, description, and key for each algorithm.
   */
  const options: OptionsType = t('components.AlgorithmSettingsModal.algorithms', { returnObjects: true })

  /**
   * Custom hook for managing selection state, save logic, and backend loading state.
   */
  const { handleSave, handleSelect, waitForBackend, selected, teacherAlgorithm } = useAlgorithmSettingsModal({
    handleClose: props.handleClose,
    changeObserver: props.changeObserver,
    options,
    topicId: props.topicId
  })

  return (
    <Modal open={props.isOpen} onClose={props.handleClose} data-testid="algorithm-settings-modal">
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
        {/* Modal content layout */}
        <Grid item container direction="row" spacing={2}>
          {/* Algorithm selection (radio group) */}
          <Grid item container direction="column" spacing={1} xs={5}>
            <Typography id="modal-title" variant="h6" component="h6" align="center">
              {t('pages.topic.menuItemAlgorithms')}
            </Typography>
            <RadioGroup onChange={handleSelect} id="learning-path-algorithm-radio-group">
              {options.map((option, index) => (
                <Grid item container direction="row" key={option.key}>
                  <FormControlLabel
                    sx={{ width: { xl: '16rem' } }}
                    value={index}
                    control={
                      <Radio
                        id={option.key + '-algorithm-settings-modal-radio-button'}
                        role="radio-button"
                        checked={index === selected}
                      />
                    }
                    label={option.name}
                  />
                  {/* Teacher recommendation icon */}
                  {teacherAlgorithm === option.key && (
                    <Tooltip
                      arrow
                      title={t('components.AlgorithmSettingsModal.teacherIconTip')}
                      data-testid="algorithm-settings-modal-teacher-recommendation-icon">
                      <Grid>
                        <School />
                      </Grid>
                    </Tooltip>
                  )}
                </Grid>
              ))}
            </RadioGroup>
          </Grid>
          {/* Close button (top-right corner) */}
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
            onClick={props.handleClose}
            data-testid="algorithm-settings-modal-close-button">
            <Close />
          </Fab>
          {/* Divider between selection and description (hidden on xs screens) */}
          <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'flex' } }} />
          {/* Selected algorithm description (hidden on xs screens) */}
          <Grid item container direction="column" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }} xs={6.5}>
            <Typography variant="h6" component="h6" align="center">
              {t('components.AlgorithmSettingsModal.headerRight')}
            </Typography>
            <Typography variant="body1" component="p" align="center">
              {options[selected]?.description}
            </Typography>
          </Grid>
        </Grid>
        {/* Save button (bottom-right corner) */}
        <Fab
          onClick={handleSave}
          aria-label="save"
          id="algorithm-settings-modal-save-button"
          data-testid={'algorithm-settings-modal-save-button'}
          sx={{ position: 'absolute', right: '0.5rem', bottom: '0.5rem' }}
          disabled={waitForBackend} // Disable while loading
        >
          {waitForBackend ? <CircularProgress size={24} /> : <Save />}
        </Fab>
      </Grid>
    </Modal>
  )
}

/**
 * Renders a modal dialog for selecting an algorithm for a given topic or course.
 *
 * Displays available algorithms as a list of radio buttons, with the option to view
 * a short description of the currently selected algorithm. Shows a teacher recommendation
 * icon if the option matches the recommended algorithm.
 *
 * The modal can be opened or closed via props, and communicates user actions via callbacks.
 *
 * Uses {@link useAlgorithmSettingsModal} to manage selection logic and save actions.
 *
 * @param props - See {@link AlgorithmSettingsModalProps}
 * @returns A React component for algorithm selection in a modal dialog.
 *
 * @example
 * <AlgorithmSettingsModal
 *   isOpen={open}
 *   handleClose={handleClose}
 *   changeObserver={handleAlgorithmChange}
 *   topicId={currentTopicId}
 * />
 *
 * @see {@link useAlgorithmSettingsModal}
 */
export default memo(AlgorithmSettingsModal)
