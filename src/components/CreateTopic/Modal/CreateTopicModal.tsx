import log from 'loglevel'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import { CreateAlgorithmTableNameProps, HandleError } from '@components'
import { LearningPathTopic, RemoteLearningElement, RemoteTopic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import CreateAlgorithmsStep from './CreateAlgorithmsStep'
import CreateLearningElementClassificationsStep from './CreateLearningElementClassificationsStep'
import CreateLearningElementsStep from './CreateLearningElementsStep'
import CreateRemoteTopicsStep from './CreateRemoteTopicsStep'
import { useCreateTopicModal } from './CreateTopicModal.hooks'

type CreateTopicModalProps = {
  openCreateTopicModal?: boolean
  successTopicCreated: boolean
  setSuccessTopicCreated: React.Dispatch<React.SetStateAction<boolean>>
  handleCloseCreateTopicModal: () => void
}

export type RemoteLearningElementWithClassification = RemoteLearningElement & {
  classification: string
}

const CreateTopicModal = memo(
  ({
    openCreateTopicModal = false,
    successTopicCreated,
    setSuccessTopicCreated,
    handleCloseCreateTopicModal
  }: CreateTopicModalProps) => {
    //Hooks
    const { t } = useTranslation()
    const { courseId } = useParams<{ courseId: string }>()
    const { addSnackbar } = useContext(SnackbarContext)
    const [remoteTopics, setRemoteTopics] = useState<RemoteTopic[]>([])
    const [createTopicIsSending, setCreateTopicIsSending] = useState<boolean>(false)
    const [alreadyCreatedTopics, setAlreadyCreatedTopics] = useState<LearningPathTopic>()
    const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
    const [selectedLearningElements, setSelectedLearningElements] = useState<{
      [key: number]: RemoteLearningElement[]
    }>({})
    const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
      [key: number]: RemoteLearningElementWithClassification[]
    }>({})
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<{ [key: number]: CreateAlgorithmTableNameProps }>({})
    const [activeStep, setActiveStep] = useState<number>(0)
    const {
      handleCreate,
      handleTopicChange,
      handleLearningElementChange,
      handleLearningElementClassification,
      handleAlgorithmChange
    } = useCreateTopicModal({
      setCreateTopicIsSending,
      setSuccessTopicCreated,
      setSelectedTopics,
      setSelectedLearningElements,
      setSelectedLearningElementsClassification,
      setSelectedAlgorithms
    })

    //Store
    const getUser = usePersistedStore((state) => state.getUser)
    const getTopics = useStore((state) => state.getLearningPathTopic)
    const getRemoteTopics = useStore((state) => state.getRemoteTopic)

    //Constants
    const createTopicModalStepperSteps = [
      t('appGlobal.topics'),
      t('appGlobal.learningElements'),
      t('appGlobal.classifications'),
      t('appGlobal.algorithms')
    ]

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1)
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1)

    const handleSubmit = async () => {
      setCreateTopicIsSending(true)
      for (const [topicId] of Object.entries(selectedAlgorithms)) {
        await handleCreate(
          selectedAlgorithms[parseInt(topicId)].topicName,
          parseInt(topicId),
          selectedLearningElementsClassification,
          selectedAlgorithms[parseInt(topicId)].algorithmShortName,
          courseId
        )
      }
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
                  HandleError(t, addSnackbar, 'error.getRemoteTopics', error)
                })
            })
            .catch((error) => {
              HandleError(t, addSnackbar, 'error.getTopics', error)
            })
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.getUser') + ' ' + error)
          HandleError(t, addSnackbar, 'error.getUser', error)
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
                handleLearningElementChange={handleLearningElementChange}
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
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {activeStep === 3 && (
              <CreateAlgorithmsStep
                selectedTopics={selectedTopics}
                selectedLearningElementsClassification={selectedLearningElementsClassification}
                selectedAlgorithms={selectedAlgorithms}
                handleAlgorithmChange={handleAlgorithmChange}
                createTopicIsSending={createTopicIsSending}
                successTopicCreated={successTopicCreated}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            )}
          </Box>
        </Grid>
      </Modal>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateTopicModal.displayName = 'CreateTopicModal'
export default CreateTopicModal
