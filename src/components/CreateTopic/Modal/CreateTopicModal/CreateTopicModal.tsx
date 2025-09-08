import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  CreateAlgorithmsStep,
  CreateAlgorithmTableNameProps,
  CreateLearningElementClassificationsStep,
  CreateLearningElementSolutionsStep,
  CreateLearningElementsStep,
  CreateRemoteTopicsStep,
  handleError,
  useCreateTopicModal
} from '@components'
import { LearningPathTopic, RemoteLearningElement, RemoteTopics } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

export type CreateTopicModalProps = {
  openCreateTopicModal?: boolean
  handleCloseCreateTopicModal: () => void
}

export type RemoteLearningElementWithClassification = RemoteLearningElement & {
  classification: string
  disabled?: boolean
}

export type RemoteLearningElementWithSolution = {
  learningElementLmsId: number
  learningElementName: string
  solutionLmsId: number
  solutionLmsType?: string
}

export type Solution = {
  solutionLmsId: number
  solutionLmsName: string
  solutionLmsType?: string
}

const CreateTopicModal = ({ openCreateTopicModal = false, handleCloseCreateTopicModal }: CreateTopicModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const { courseId } = useParams<{ courseId: string }>()
  const { addSnackbar } = useContext(SnackbarContext)
  const [remoteTopics, setRemoteTopics] = useState<RemoteTopics[]>()
  const [createTopicIsSending, setCreateTopicIsSending] = useState<boolean>(false)
  const [successfullyCreatedTopicsCount, setSuccessfullyCreatedTopicsCount] = useState<number>(0)
  const [alreadyCreatedTopics, setAlreadyCreatedTopics] = useState<LearningPathTopic>()
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopics[]>([])
  const [selectedLearningElements, setSelectedLearningElements] = useState<{
    [key: number]: RemoteLearningElement[]
  }>({})
  const [selectedSolutions, setSelectedSolutions] = useState<{ [key: number]: Solution[] }>({})
  const [selectedLearningElementSolution, setSelectedLearningElementSolution] = useState<{
    [topicId: number]: RemoteLearningElementWithSolution[]
  }>({})
  const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
    [key: number]: RemoteLearningElementWithClassification[]
  }>({})
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<{ [key: number]: CreateAlgorithmTableNameProps }>({})
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectAllLearningElementsChecked, setSelectAllLearningElementsChecked] = useState(false)
  const {
    handleCreate,
    handleTopicChange,
    handleLearningElementChange,
    handleLearningElementSolutionChange,
    handleLearningElementClassification,
    handleSolutionsChange,
    handleAlgorithmChange
  } = useCreateTopicModal({
    setCreateTopicIsSending,
    setSelectedTopics,
    setSelectedLearningElements,
    selectedLearningElementSolution,
    setSelectedLearningElementSolution,
    selectedSolutions,
    setSelectedSolutions,
    setSelectedLearningElementsClassification,
    setSelectedAlgorithms,
    setSuccessfullyCreatedTopicsCount
  })

  //Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getTopics = useStore((state) => state.getLearningPathTopic)
  const getRemoteTopics = useStore((state) => state.getRemoteTopics)

  //Constants
  const createTopicModalStepperSteps = [
    t('appGlobal.topics'),
    t('appGlobal.learningElements'),
    t('appGlobal.classifications'),
    t('appGlobal.solutions'),
    t('appGlobal.algorithms')
  ]

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

  const handleNextWithSkip = () =>
    setActiveStep((prevStep) => {
      const isEmpty = Object.values(selectedSolutions).every((solutions) => solutions.length === 0)
      if (isEmpty) {
        return prevStep + 2
      } else {
        return prevStep + 1
      }
    })

  const handleBackWithSkip = () =>
    setActiveStep((prevStep) => {
      const isEmpty = Object.values(selectedSolutions).every((solutions) => solutions.length === 0)
      if (isEmpty) {
        return prevStep - 2
      } else {
        return prevStep - 1
      }
    })

  const handleSubmit = async () => {
    setCreateTopicIsSending(true)
    for (const key in selectedAlgorithms) {
      const { topicName, algorithmShortName } = selectedAlgorithms[key]
      await handleCreate(topicName, parseInt(key), selectedLearningElementsClassification, algorithmShortName, courseId)
    }
    setCreateTopicIsSending(false)
    handleCloseCreateTopicModal()
  }

  useEffect(() => {
    getUser()
      .then((user) => {
        getTopics(user.settings.user_id, user.lms_user_id, user.id, courseId)
          .then((topics) => {
            setAlreadyCreatedTopics(topics)
            getRemoteTopics(courseId)
              .then((response) => {
                return setRemoteTopics(
                  response.filter((topic) => !topics.topics.some((t) => t.lms_id === topic.topic_lms_id))
                )
              })
              .catch((error) => {
                handleError(t, addSnackbar, 'error.getRemoteTopics', error, 5000)
                setRemoteTopics([])
                setAlreadyCreatedTopics({ topics: [] })
              })
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.getTopics', error, 5000)
            setRemoteTopics([])
            setAlreadyCreatedTopics({ topics: [] })
          })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.getUser', error, 5000)
        setRemoteTopics([])
        setAlreadyCreatedTopics({ topics: [] })
      })
  }, [activeStep])

  return (
    <Modal open={openCreateTopicModal} onClose={handleCloseCreateTopicModal}>
      <Grid container justifyContent="center" alignItems="center">
        <Box
          sx={{
            position: 'absolute',
            left: '20%',
            right: '20%',
            top: '10%',
            overflow: 'auto',
            maxHeight: '83%',
            bgcolor: 'background.paper',
            border: (theme) => '2px solid' + theme.palette.secondary.dark,
            boxShadow: 24,
            p: 1
          }}>
          <Fab
            color="primary"
            id={'create-topic-modal-close-button'}
            data-testid={'create-topic-modal-close-button'}
            onClick={handleCloseCreateTopicModal}
            sx={{
              position: 'sticky',
              top: '0%',
              left: '95.5%'
            }}>
            <Close />
          </Fab>
          <Stepper activeStep={activeStep} sx={{ pt: '1rem' }}>
            {createTopicModalStepperSteps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  color="inherit"
                  id={'create-topic-modal-stepper'}
                  data-testid={'create-topic-modal-stepper'}
                  onClick={() => {
                    setActiveStep(index)
                  }}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <CreateRemoteTopicsStep
              remoteTopics={remoteTopics}
              selectedTopics={selectedTopics}
              alreadyCreatedTopics={alreadyCreatedTopics}
              handleTopicChange={handleTopicChange}
              onNext={handleNext}
            />
          )}
          {activeStep === 1 && (
            <CreateLearningElementsStep
              selectedTopics={selectedTopics}
              selectedLearningElements={selectedLearningElements}
              selectedSolutions={selectedSolutions}
              onSolutionChange={handleSolutionsChange}
              handleLearningElementChange={handleLearningElementChange}
              selectAllLearningElementsChecked={selectAllLearningElementsChecked}
              setSelectAllLearningElementsChecked={setSelectAllLearningElementsChecked}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 2 && (
            <CreateLearningElementClassificationsStep
              selectedTopics={selectedTopics}
              selectedLearningElements={selectedLearningElements}
              selectedLearningElementsClassification={selectedLearningElementsClassification}
              handleLearningElementClassification={handleLearningElementClassification}
              selectedSolutions={selectedSolutions}
              onSolutionChange={handleSolutionsChange}
              onNext={handleNextWithSkip}
              onBack={handleBack}
              nextButtonText={t('appGlobal.next')}
            />
          )}
          {activeStep === 3 && (
            <CreateLearningElementSolutionsStep
              selectedTopics={selectedTopics}
              LearningElementsClassification={selectedLearningElementsClassification}
              selectedSolutions={selectedSolutions}
              learningElementsWithSolutions={selectedLearningElementSolution}
              onLearningElementSolutionChange={handleLearningElementSolutionChange}
              onNext={handleNext}
              onBack={handleBack}
              nextButtonText={t('appGlobal.next')}
            />
          )}
          {activeStep === 4 && (
            <CreateAlgorithmsStep
              selectedTopics={selectedTopics}
              selectedAlgorithms={selectedAlgorithms}
              handleAlgorithmChange={handleAlgorithmChange}
              createTopicIsSending={createTopicIsSending}
              onBack={handleBackWithSkip}
              onSubmit={handleSubmit}
              successfullyCreatedTopicsCount={successfullyCreatedTopicsCount}
            />
          )}
        </Box>
      </Grid>
    </Modal>
  )
}
export default memo(CreateTopicModal)
