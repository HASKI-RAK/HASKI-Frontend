import { Dispatch, memo, SetStateAction, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Fab, Grid, Modal, Paper, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  CreateLearningElementSolutionsStep,
  handleError,
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  SelectLearningElementStep,
  Solution
} from '@components'
import { Topic } from '@core'
import { postLearningElementSolution, SnackbarContext } from '@services'
import { useStore } from '@store'

type CreateLearningElementSolutionModalProps = {
  open: boolean
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  currentTopic?: Topic
  selectedLearningElements: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedSolutions: { [key: number]: Solution[] }
  learningElementsWithSolutions: { [key: number]: RemoteLearningElementWithSolution[] }
  setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>>
  setLearningElementsWithSolutions: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithSolution[] }>>
  handleCloseCreateLearningElementSolutionModal: () => void
}

const CreateLearningElementSolutionModal = ({
  open,
  activeStep,
  setActiveStep,
  currentTopic,
  selectedLearningElements,
  selectedSolutions,
  learningElementsWithSolutions,
  setSelectedLearningElements,
  setLearningElementsWithSolutions,
  handleCloseCreateLearningElementSolutionModal
}: CreateLearningElementSolutionModalProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const setLearningElementSolution = useStore((state) => state.setLearningElementSolution)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const AddSolutionModalSteps = [
    t('components.CreateLearningElementTable.selectLearningElements'),
    t('components.CreateLearningElementSolutionModal.selectSolutions')
  ]

  const handleSend = useCallback(() => {
    setIsLoading(true)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore currentTopic can not be undefined here because the next button is disabled in that case
    const solutions = learningElementsWithSolutions[currentTopic.lms_id]

    if (!solutions) return

    for (const solution of solutions) {
      const outputJson = JSON.stringify({
        solution_lms_id: solution.solutionLmsId,
        activity_type: solution.solutionLmsType
      })

      postLearningElementSolution({
        learningElementLmsId: solution.learningElementLmsId,
        outputJson
      })
        .then(() => {
          addSnackbar({
            message: t('components.CreateLearningElementSolutionModal.solutionAdded'),
            severity: 'success',
            autoHideDuration: 3000
          })
          setLearningElementSolution(solution.learningElementLmsId, solution.solutionLmsId, solution.solutionLmsType)
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.postLearningElementSolution', error, 5000)
        })
        .finally(() => {
          setIsLoading(false)
          handleCloseCreateLearningElementSolutionModal()
        })
    }
  }, [
    setIsLoading,
    currentTopic,
    learningElementsWithSolutions,
    addSnackbar,
    t,
    handleCloseCreateLearningElementSolutionModal,
    setLearningElementSolution
  ])

  // Disable the send/next button when not all selected learning elements have a solution
  const disableSend = useCallback(() => {
    if (!currentTopic) return true
    return !selectedLearningElements[currentTopic.lms_id]?.every((element) =>
      learningElementsWithSolutions[currentTopic.lms_id]?.some(
        (solution) => solution.learningElementLmsId === element.lms_id && solution.solutionLmsType
      )
    )
  }, [currentTopic, selectedLearningElements, learningElementsWithSolutions])

  return (
    <Modal open={open} onClose={handleCloseCreateLearningElementSolutionModal}>
      <Box sx={{ padding: '2rem', width: '80%', margin: 'auto', marginTop: '5rem' }}>
        <Paper elevation={3} sx={{ padding: '2rem', position: 'relative' }}>
          <Fab
            id="add-solution-modal-close-button"
            data-testid="add-solution-modal-close-button"
            color="primary"
            size="small"
            onClick={handleCloseCreateLearningElementSolutionModal}
            sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <Close />
          </Fab>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Stepper activeStep={activeStep} alternativeLabel data-testid={'add-solution-modal-stepper'}>
                {AddSolutionModalSteps.map((label, index) => (
                  <Step key={label}>
                    <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
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
              <CreateLearningElementSolutionsStep
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

export default memo(CreateLearningElementSolutionModal)
