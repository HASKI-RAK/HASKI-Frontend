import { Dispatch, memo, SetStateAction, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Fab, Grid, Modal, Paper, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import { handleError, RemoteLearningElementWithClassification } from '@components'
import { Topic } from '@core'
import { SnackbarContext } from '@services'
import { postLearningElementSolution } from '@services'
import { useStore } from '@store'
import CreateLearningElementSolutionStep from '../CreateTopic/Modal/CreateLearningElementSolutionsStep/CreateLearningElementSolutionStep'
import { RemoteLearningElementWithSolution, Solution } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'
import SelectLearningElementStep from './SelectLearningElementStep/SelectLearningElementStep'

type AddSolutionModalProps = {
  open: boolean
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  currentTopic?: Topic
  selectedLearningElements: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>>
  setLearningElementsWithSolutions: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithSolution[] }>>
  handleCloseAddSolutionModal: () => void
}

const AddSolutionModal = ({
  open,
  activeStep,
  setActiveStep,
  currentTopic,
  selectedLearningElements,
  selectedSolutions,
  learningElementsWithSolutions,
  setSelectedLearningElements,
  setLearningElementsWithSolutions,
  handleCloseAddSolutionModal
}: AddSolutionModalProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const setLearningElementSolution = useStore((state) => state.setLearningElementSolution)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const AddSolutionModalSteps = [
    t('components.CreateLearningElementTable.selectLearningElements'),
    t('components.AddSolutionModal.selectSolutions')
  ]

  const handleSend = useCallback(() => {
    if (!currentTopic) {
      addSnackbar({ message: t('components.AddSolutionModal.noTopic'), severity: 'error' })
      return
    }
    setIsLoading(true)
    learningElementsWithSolutions[currentTopic.lms_id]?.forEach((solution) => {
      if (!solution.solutionLmsId || !solution.learningElementLmsId || !solution.solutionLmsType) {
        handleError(t, addSnackbar, 'components.AddSolutionModal.missingSolutionData', { solution }, 5000)
        setIsLoading(false)
        return
      }

      const outputJson = JSON.stringify({
        solution_lms_id: solution.solutionLmsId,
        activity_type: solution.solutionLmsType
      })

      postLearningElementSolution({ learningElementLmsId: solution.learningElementLmsId, outputJson })
        .then(() => {
          addSnackbar({ message: t('appGlobal.solutionAdded'), severity: 'success', autoHideDuration: 3000 })
          setLearningElementSolution(solution.learningElementLmsId, solution.solutionLmsId, solution.solutionLmsType)
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.addSolution', error, 5000)
        })
        .finally(() => {
          setIsLoading(false)
          handleCloseAddSolutionModal()
        })
    })
  }, [setIsLoading, currentTopic, learningElementsWithSolutions, addSnackbar, t])

  // Disable the send/ next button when not all selected learning elements have a solution
  const disableSend = useCallback(() => {
    if (!currentTopic) return true
    return !selectedLearningElements[currentTopic.lms_id]?.every((element) =>
      learningElementsWithSolutions[currentTopic.lms_id]?.some(
        (solution) => solution.learningElementLmsId === element.lms_id && solution.solutionLmsType
      )
    )
  }, [currentTopic, selectedLearningElements, learningElementsWithSolutions])

  return (
    <Modal open={open} onClose={handleCloseAddSolutionModal}>
      <Box sx={{ padding: '2rem', width: '80%', margin: 'auto', marginTop: '5rem' }}>
        <Paper elevation={3} sx={{ padding: '2rem', position: 'relative' }}>
          <Fab
            id="add-solution-modal-close-button"
            data-testid="add-solution-modal-close-button"
            color="primary"
            size="small"
            onClick={handleCloseAddSolutionModal}
            sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <Close />
          </Fab>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Stepper activeStep={activeStep} alternativeLabel>
                {AddSolutionModalSteps.map((label) => (
                  <Step key={label}>
                    <StepButton onClick={() => setActiveStep(activeStep)}>{label}</StepButton>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            {activeStep === 0 && (
              <SelectLearningElementStep
                selectedTopics={currentTopic}
                selectedLearningElements={selectedLearningElements}
                setSelectedLearningElements={setSelectedLearningElements}
                onNext={() => setActiveStep(1)}
              />
            )}
            {activeStep === 1 && (
              <CreateLearningElementSolutionStep
                selectedTopics={
                  currentTopic
                    ? [
                        {
                          topic_lms_id: currentTopic.lms_id,
                          topic_lms_name: currentTopic.name,
                          lms_learning_elements: []
                        }
                      ]
                    : []
                }
                selectedSolutions={selectedSolutions}
                LearningElementsClassification={selectedLearningElements}
                learningElementsWithSolutions={learningElementsWithSolutions}
                onLearningElementSolutionChange={setLearningElementsWithSolutions}
                onNext={handleSend}
                onBack={() => setActiveStep(0)}
                disableNext={disableSend}
                nextButtonText={t('appGlobal.next')}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </Paper>
      </Box>
    </Modal>
  )
}

export default memo(AddSolutionModal)
