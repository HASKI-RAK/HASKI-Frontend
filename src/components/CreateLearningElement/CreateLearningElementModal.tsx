import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import { CreateAlgorithmTableNameProps, handleError } from '@components'
import { LearningPathElement, LearningPathTopic, RemoteLearningElement, RemoteTopics } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import CreateLearningElementClassificationsStep from '../CreateTopic/Modal/CreateLearningElementClassificationsStep'
import CreateLearningElementsStep from '../CreateTopic/Modal/CreateLearningElementsStep'
import { useCreateTopicModal } from '../CreateTopic/Modal/CreateTopicModal.hooks'

export type CreateTopicModalProps = {
  openCreateTopicModal?: boolean
  currentTopicLmsId: number
  handleCloseCreateTopicModal: () => void
}

export type RemoteLearningElementWithClassification = RemoteLearningElement & {
  classification: string
}

const CreateLearningElementModal = ({
  openCreateTopicModal = false,
  currentTopicLmsId,
  handleCloseCreateTopicModal
}: CreateTopicModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const { courseId, topicId } = useParams()
  const { addSnackbar } = useContext(SnackbarContext)
  const [remoteTopic, setRemoteTopic] = useState<RemoteTopics[]>([])
  const [createTopicIsSending, setCreateTopicIsSending] = useState<boolean>(false)
  const [successfullyCreatedTopicsCount, setSuccessfullyCreatedTopicsCount] = useState<number>(0)
  const [alreadyCreatedTopics, setAlreadyCreatedTopics] = useState<LearningPathTopic>()
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopics[]>([])
  const [selectedLearningElements, setSelectedLearningElements] = useState<{
    [key: number]: RemoteLearningElement[]
  }>({})
  const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
    [key: number]: RemoteLearningElementWithClassification[]
  }>({})
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<{ [key: number]: CreateAlgorithmTableNameProps }>({})
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectAllLearningElementsChecked, setSelectAllLearningElementsChecked] = useState(false)
  const {
    handleCreate,
    handleCreateLearningElements,
    handleCalculateLearningPaths,
    handleLearningElementChange,
    handleLearningElementClassification
  } = useCreateTopicModal({
    setCreateTopicIsSending,
    setSelectedTopics,
    setSelectedLearningElements,
    setSelectedLearningElementsClassification,
    setSelectedAlgorithms,
    setSuccessfullyCreatedTopicsCount
  })

  //Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getTopics = useStore((state) => state.getLearningPathTopic)
  const getRemoteTopics = useStore((state) => state.getRemoteTopics)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)

  //Constants
  const createTopicModalStepperSteps = [t('appGlobal.learningElements'), t('appGlobal.classifications')]

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

  const handleSubmit = async () => {
    getUser().then((user) => {
      return Promise.all(
        selectedLearningElementsClassification[currentTopicLmsId].map((element) =>
          handleCreateLearningElements(
            element.lms_learning_element_name,
            element.lms_activity_type,
            element.classification,
            element.lms_id,
            parseInt(topicId || '0'),
            user
          )
        )
      ).then(() => {
        return handleCalculateLearningPaths(
          user.settings.user_id,
          user.role,
          user.university,
          courseId || '0',
          parseInt(topicId || '0')
        ).then(() => {
          addSnackbar({
            message: t('appGlobal.dataSendSuccessful'),
            severity: 'success',
            autoHideDuration: 5000
          })
        })
      })
    })
    handleCloseCreateTopicModal()
  }

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
  }, [activeStep, openCreateTopicModal, topicId])

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
              handleLearningElementClassification={handleLearningElementClassification}
              onNext={handleSubmit}
              onBack={handleBack}
            />
          )}
        </Box>
      </Grid>
    </Modal>
  )
}
export default memo(CreateLearningElementModal)
