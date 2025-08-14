import { Dispatch, memo, SetStateAction, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  CreateLearningElementClassificationsStep,
  CreateLearningElementsStep,
  handleError,
  RemoteLearningElementWithClassification
} from '@components'
import { LearningPathElement, LearningPathElementSolution, RemoteLearningElement, RemoteTopics } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import CreateLearningElementSolutionStep from '../CreateTopic/Modal/CreateLearningElementSolutionsStep/CreateLearningElementSolutionStep'
import { RemoteLearningElementWithSolution, Solution } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'
import { useCreateTopicModal } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal.hooks'

export type CreateTopicModalProps = {
  openCreateTopicModal?: boolean
  currentTopicLmsId: number
  handleCloseCreateTopicModal: () => void
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  setSelectedLearningElements: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElement[] }>>
  selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  setSelectedLearningElementsClassification: Dispatch<
    SetStateAction<{ [key: number]: RemoteLearningElementWithClassification[] }>
  >
  setSelectedLearningElementSolution: Dispatch<SetStateAction<{ [key: number]: RemoteLearningElementWithSolution[] }>>
  setSelectedSolutions: Dispatch<SetStateAction<{ [key: number]: Solution[] }>>
  selectedSolutions: { [key: number]: Solution[] }
  selectedLearningElementSolution: { [key: number]: RemoteLearningElementWithSolution[] }
  setActiveStep: Dispatch<SetStateAction<number>>
  activeStep: number
}

const CreateLearningElementModal = ({
  openCreateTopicModal = false,
  currentTopicLmsId,
  handleCloseCreateTopicModal,
  selectedLearningElements,
  setSelectedLearningElements,
  selectedLearningElementsClassification,
  setSelectedLearningElementsClassification,
  setSelectedLearningElementSolution,
  setSelectedSolutions,
  selectedSolutions,
  selectedLearningElementSolution,
  setActiveStep,
  activeStep
}: CreateTopicModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const { courseId } = useParams()
  const { topicId } = useParams()
  const [remoteTopic, setRemoteTopic] = useState<RemoteTopics[]>([])
  const [selectAllLearningElementsChecked, setSelectAllLearningElementsChecked] = useState(false)
  const {
    handleCreateLearningElementsInExistingTopic,
    handleLearningElementChange,
    handleLearningElementClassification
  } = useCreateTopicModal({
    setSelectedLearningElements,
    setSelectedLearningElementsClassification,
    setSelectedLearningElementSolution,
    setSelectedSolutions,
    selectedLearningElementSolution,
    selectedSolutions
  })

  //Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getRemoteTopics = useStore((state) => state.getRemoteTopics)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const getLearningPathElementSolution = useStore((state) => state.getLearningPathElementSolution)

  //Constants
  const createLearningElementModalStepperSteps = [
    t('appGlobal.learningElements'),
    t('appGlobal.classifications'),
    t('appGlobal.solutions')
  ]

  //functions
  // when no solutions are selected just create Learning Element in Classification step
  const handleClassificationNext = () => {
    if (selectedSolutions[currentTopicLmsId].length === 0) {
      handleCreateLearningElementsInExistingTopic(
        currentTopicLmsId,
        selectedLearningElementsClassification,
        topicId,
        courseId
      ).then(() => {
        handleCloseCreateTopicModal()
      })
    } else {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  // get text for classification step next button
  const getNextTextClassification = (): string => {
    if (selectedSolutions[currentTopicLmsId].length > 0) return t('appGlobal.next')
    else return t('components.CreateLearningElementModal.createLearningElements')
  }

  //filter out the learning elements that are already in the learning path
  useEffect(() => {
    if (!courseId || !topicId) return
    getUser()
      .then((user) =>
        getRemoteTopics(courseId)
          .then((topics: RemoteTopics[]) => {
            // Filter remote topics by matching the current topic LMS ID
            const filteredTopics = topics.filter((topic) => topic.topic_lms_id === currentTopicLmsId)
            return { user, filteredTopics }
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchRemoteTopics', error, 3000)
            throw error
          })
      )
      .then(({ user, filteredTopics }) =>
        getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId).then(
          (learningPathElementData: LearningPathElement) => {
            // Extract LMS IDs of learning elements already in the learning path
            const existingLearningElementIds = learningPathElementData.path.map(
              (element) => element.learning_element.lms_id
            )
            // Extract LMS IDs of learning elements that are solutions in the learning path
            getLearningPathElementSolution(topicId)
              .then((learningPathElementSolutionData: LearningPathElementSolution) => {
                // Extract solution LMS IDs
                const solutionLearningElementIds = learningPathElementSolutionData.map(
                  (solution) => solution.solution_lms_id
                )
                // A Set of all IDs to exclude
                const idsToExclude = new Set([...existingLearningElementIds, ...solutionLearningElementIds])
                // Update remote topics by filtering out elements that already exist in the learning path or are solutions
                const updatedTopics = filteredTopics.map((topic) => ({
                  ...topic,
                  lms_learning_elements: topic.lms_learning_elements.filter(
                    (learningElement) => !idsToExclude.has(learningElement.lms_id)
                  )
                }))

                setRemoteTopic(updatedTopics)
              })
              .catch((error) => {
                handleError(t, addSnackbar, 'error.fetchLearningPathElementSolution', error, 3000)
              })
          }
        )
      )
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 3000)
      })
  }, [
    activeStep,
    setActiveStep,
    openCreateTopicModal,
    topicId,
    courseId,
    currentTopicLmsId,
    selectedLearningElements,
    selectedLearningElementsClassification,
    setSelectedLearningElements,
    setSelectedLearningElementsClassification,
    selectedSolutions
  ])

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
            id={'create-learning-elements-modal-close-button'}
            data-testid={'create-learning-elements-modal-close-button'}
            onClick={handleCloseCreateTopicModal}
            sx={{
              position: 'sticky',
              top: '0%',
              left: '95.5%'
            }}>
            <Close />
          </Fab>
          <Stepper activeStep={activeStep} sx={{ pt: '1rem' }}>
            {createLearningElementModalStepperSteps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  color="inherit"
                  id={'create-learning-element-modal-stepper'}
                  data-testid={'create-learning-element-modal-stepper'}
                  onClick={() => {
                    setActiveStep(index)
                  }}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <CreateLearningElementsStep
              selectedTopics={remoteTopic}
              selectedLearningElements={selectedLearningElements}
              handleLearningElementChange={handleLearningElementChange}
              selectAllLearningElementsChecked={selectAllLearningElementsChecked}
              setSelectAllLearningElementsChecked={setSelectAllLearningElementsChecked}
              selectedSolutions={selectedSolutions}
              onSolutionChange={setSelectedSolutions}
              onNext={() => {
                setActiveStep((prevStep) => prevStep + 1)
              }}
            />
          )}
          {activeStep === 1 && (
            <CreateLearningElementClassificationsStep
              selectedTopics={remoteTopic}
              selectedLearningElements={selectedLearningElements}
              selectedLearningElementsClassification={selectedLearningElementsClassification}
              selectedSolutions={selectedSolutions}
              onSolutionChange={setSelectedSolutions}
              onNext={handleClassificationNext}
              handleLearningElementClassification={handleLearningElementClassification}
              onBack={() => {
                setActiveStep((prevStep) => prevStep - 1)
              }}
              nextButtonText={getNextTextClassification()}
            />
          )}
          {activeStep === 2 && (
            <CreateLearningElementSolutionStep
              selectedTopics={remoteTopic}
              LearningElementsClassification={selectedLearningElementsClassification}
              selectedSolutions={selectedSolutions}
              learningElementsWithSolutions={selectedLearningElementSolution}
              onLearningElementSolutionChange={setSelectedLearningElementSolution}
              onBack={() => setActiveStep((prevStep) => prevStep - 1)}
              onNext={() =>
                handleCreateLearningElementsInExistingTopic(
                  currentTopicLmsId,
                  selectedLearningElementsClassification,
                  topicId,
                  courseId
                ).then(() => {
                  handleCloseCreateTopicModal()
                })
              }
              nextButtonText={t('components.CreateLearningElementModal.createLearningElements')}
            />
          )}
        </Box>
      </Grid>
    </Modal>
  )
}
export default memo(CreateLearningElementModal)
