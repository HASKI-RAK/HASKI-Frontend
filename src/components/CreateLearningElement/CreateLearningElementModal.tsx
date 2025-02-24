import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import { LearningPathElement, RemoteLearningElement, RemoteTopics } from '@core'
import { usePersistedStore, useStore } from '@store'
import CreateLearningElementClassificationsStep from '../CreateTopic/Modal/CreateLearningElementClassificationsStep'
import CreateLearningElementsStep from '../CreateTopic/Modal/CreateLearningElementsStep'
import { useCreateTopicModal } from '../CreateTopic/Modal/CreateTopicModal.hooks'

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
}

export type RemoteLearningElementWithClassification = RemoteLearningElement & {
  classification: string
}

const CreateLearningElementModal = ({
  openCreateTopicModal = false,
  currentTopicLmsId,
  handleCloseCreateTopicModal,
  selectedLearningElements,
  setSelectedLearningElements,
  selectedLearningElementsClassification,
  setSelectedLearningElementsClassification
}: CreateTopicModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const { courseId, topicId } = useParams()
  const [remoteTopic, setRemoteTopic] = useState<RemoteTopics[]>([])
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectAllLearningElementsChecked, setSelectAllLearningElementsChecked] = useState(false)
  const {
    handleCreateLearningElementsInExistingTopic,
    handleLearningElementChange,
    handleLearningElementClassification
  } = useCreateTopicModal({
    setSelectedLearningElements,
    setSelectedLearningElementsClassification
  })

  //Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getRemoteTopics = useStore((state) => state.getRemoteTopics)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)

  //Constants
  const createLearningElementModalStepperSteps = [t('appGlobal.learningElements'), t('appGlobal.classifications')]

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

  //filter out the learning elements that are already in the learning path
  useEffect(() => {
    getUser()
      .then((user) => {
        return getRemoteTopics(courseId).then((topics: RemoteTopics[]) => {
          // Filter remote topics by matching current topic LMS id
          const filteredTopics = topics.filter((topic) => topic.topic_lms_id === currentTopicLmsId)
          return { user, filteredTopics }
        })
      })
      .then(({ user, filteredTopics }) => {
        return getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId).then(
          (learningPathElementData: LearningPathElement) => {
            // Get IDs of learning elements already in the learning path
            const existingLearningElementIds = learningPathElementData.path.map(
              (element) => element.learning_element.lms_id
            )

            // For each topic, filter out learning elements already in the learning path.
            // If lms_learning_elements is undefined, fallback to an empty array.
            return setRemoteTopic(
              filteredTopics.map((topic) => ({
                ...topic,
                lms_learning_elements: topic.lms_learning_elements
                  ? topic.lms_learning_elements.filter(
                      (learningElement) => !existingLearningElementIds.includes(learningElement.lms_id)
                    )
                  : []
              }))
            )
          }
        )
      })
  }, [
    activeStep,
    openCreateTopicModal,
    topicId,
    selectedLearningElements,
    selectedLearningElementsClassification,
    setSelectedLearningElements,
    setSelectedLearningElementsClassification
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
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 1 && (
            <CreateLearningElementClassificationsStep
              selectedTopics={remoteTopic}
              selectedLearningElements={selectedLearningElements}
              selectedLearningElementsClassification={selectedLearningElementsClassification}
              onNext={() =>
                handleCreateLearningElementsInExistingTopic(
                  currentTopicLmsId,
                  selectedLearningElementsClassification,
                  topicId,
                  courseId
                ).then(() => {
                  handleCloseCreateTopicModal()
                  setActiveStep(0)
                })
              }
              handleLearningElementClassification={handleLearningElementClassification}
              onBack={handleBack}
              nextButtonText={t('components.CreateLearningElementModal.createLearningElements')}
            />
          )}
        </Box>
      </Grid>
    </Modal>
  )
}
export default memo(CreateLearningElementModal)
