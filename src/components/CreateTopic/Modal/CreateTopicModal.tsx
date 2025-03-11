import log from 'loglevel'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Button, CircularProgress, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  CreateAlgorithmTable,
  CreateAlgorithmTableNameProps,
  CreateLearningElementClassificationTable,
  CreateLearningElementSolutionTable,
  CreateLearningElementTable,
  CreateRemoteTopicsTable,
  ExistingTopicsTable
} from '@components'
import { LearningPathTopic, RemoteLearningElement, RemoteTopic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { useCreateTopicModal } from './CreateTopicModal.hooks'

type CreateTopicModalProps = {
  openCreateTopicModal?: boolean
  successTopicCreated: boolean
  setSuccessTopicCreated: React.Dispatch<React.SetStateAction<boolean>>
  handleCloseCreateTopicModal: () => void
}

export type RemoteLearningElementWithClassification = RemoteLearningElement & {
  classification: string
  disabled?: boolean
}

export type RemoteLearningElementWithSolution = {
  learningElementLmsId: number
  learningElementName: string
  solutionLmsId?: number
}

export type Solution = {
  solutionLmsId: number
  solutionLmsName: string
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
    const [selectedSolutions, setSelectedSolutions] = useState<{ [key: number]: Solution[] }>({})
    const [selectedLearningElementSolution, setSelectedLearningElementSolution] = useState<{ [topicId: number]: RemoteLearningElementWithSolution[]}>({})
    const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
      [key: number]: RemoteLearningElementWithClassification[]
    }>({})
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<{ [key: number]: CreateAlgorithmTableNameProps[] }>({})
    const [activeStep, setActiveStep] = useState<number>(0)
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
      setSuccessTopicCreated,
      setSelectedTopics,
      selectedLearningElements,
      setSelectedLearningElements,
      selectedLearningElementSolution,
      setSelectedLearningElementSolution,
      selectedSolutions,
      setSelectedSolutions,
      selectedLearningElementsClassification,
      setSelectedLearningElementsClassification,
      selectedAlgorithms,
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
      t('appGlobal.solutions'),
      t('appGlobal.algorithms')
    ]

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
                  addSnackbar({
                    message: t('error.getRemoteTopics'),
                    severity: 'error',
                    autoHideDuration: 5000
                  })
                  log.error(t('error.getRemoteTopics') + ' ' + error)
                })
            })
            .catch((error) => {
              addSnackbar({
                message: t('error.getTopics'),
                severity: 'error',
                autoHideDuration: 5000
              })
              log.error(t('error.getTopics') + ' ' + error)
            })
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.getUser') + ' ' + error)
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
            {activeStep === 0 ? (
              <>
                <CreateRemoteTopicsTable
                  onTopicChange={handleTopicChange}
                  selectedTopics={selectedTopics}
                  remoteTopics={remoteTopics}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="flex-end" alignItems="flex-end">
                      <Button
                        id="create-topic-modal-available-topics-next-button"
                        variant="contained"
                        color="primary"
                        disabled={selectedTopics.length === 0}
                        onClick={() => {
                          setActiveStep(1)
                        }}
                        sx={{ mr: -2 }}>
                        {t('appGlobal.next')}
                      </Button>
                    </Grid>
                  </Box>
                </CreateRemoteTopicsTable>
                {alreadyCreatedTopics != undefined && alreadyCreatedTopics.topics.length > 0 && (
                  <ExistingTopicsTable existingTopics={alreadyCreatedTopics} />
                )}
              </>
            ) : activeStep === 1 ? (
              <Grid container item>
                <CreateLearningElementTable
                  selectedTopics={selectedTopics}
                  onLearningElementChange={handleLearningElementChange}
                  selectedLearningElements={selectedLearningElements}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="create-topic-modal-available-learning-elements-next-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="create-topic-modal-available-learning-elements-back-button"
                        variant="contained"
                        color="primary"
                        disabled={
                          //At least 1 Learning element in each topic has to be selected
                          !selectedTopics.every(
                            (topic) =>
                              selectedLearningElements[topic.topic_lms_id] &&
                              selectedLearningElements[topic.topic_lms_id].length > 0
                          )
                        }
                        sx={{ mr: -2 }}
                        onClick={() => setActiveStep(activeStep + 1)}>
                        {t('appGlobal.next')}
                      </Button>
                    </Grid>
                  </Box>
                </CreateLearningElementTable>
              </Grid>
            ) : activeStep === 2 ? (
              <Grid container item>
                <CreateLearningElementClassificationTable
                  selectedTopics={selectedTopics}
                  LearningElements={selectedLearningElements}
                  LearningElementsClassification={selectedLearningElementsClassification}
                  selectedSolutions={selectedSolutions}
                  onLearningElementChange={handleLearningElementClassification}
                  onSolutionChange={handleSolutionsChange}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="create-topic-modal-available-learning-element-classification-back-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="create-topic-modal-available-learning-element-classification-next-button"
                        variant="contained"
                        color="primary"
                        disabled={
                          //Every learning element has to have a classification set
                          !selectedTopics.every(
                            (topic) =>
                              selectedLearningElementsClassification[topic.topic_lms_id] &&
                              selectedLearningElementsClassification[topic.topic_lms_id].every(
                                (element) => element.classification !== 'noKey' || element.disabled
                              )
                          )
                        }
                        sx={{ mr: -2 }}
                        onClick={() => setActiveStep(activeStep + 1)}>
                        {t('appGlobal.next')}
                      </Button>
                    </Grid>
                  </Box>
                </CreateLearningElementClassificationTable>
              </Grid>
            ) : activeStep === 3 ? (
              <Grid container item>
                <CreateLearningElementSolutionTable
                  selectedTopics={selectedTopics}
                  LearningElements={selectedLearningElements}
                  LearningElementsClassification={selectedLearningElementsClassification}
                  selectedSolutions={selectedSolutions}
                  learningElementsWithSolutions={selectedLearningElementSolution}
                  onLearningElementSolutionChange={handleLearningElementSolutionChange}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="create-topic-modal-available-learning-element-classification-back-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="create-topic-modal-available-learning-element-classification-next-button"
                        variant="contained"
                        color="primary"
                        //disabled={
                        //  //Every Solution has to be used
                        //  !selectedTopics.every(
                        //    (topic) => 
                        //      selectedSolutions[topic.topic_lms_id].every(
                        //        (solution) => selectedLearningElementSolution[topic.topic_lms_id].some(
                        //          (element) => element.solutionLmsId === solution.solutionLmsId
                        //      )
                        //    ))
                        //}
                        sx={{ mr: -2 }}
                        onClick={() => setActiveStep(activeStep + 1)}>
                        {t('appGlobal.next')}
                      </Button>
                    </Grid>
                  </Box>
                </CreateLearningElementSolutionTable>
              </Grid>
            ) : activeStep === 4 ? (
              <Grid container item>
                <CreateAlgorithmTable
                  selectedTopics={selectedTopics}
                  selectedLearningElementClassification={selectedLearningElementsClassification}
                  onAlgorithmChange={handleAlgorithmChange}
                  selectedAlgorithms={selectedAlgorithms}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="create-topic-modal-available-topic-algorithms-back-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="create-topic-modal-create-topics-button"
                        variant="contained"
                        color="primary"
                        disabled={
                          //Every Topic has to have an algorithm set
                          !selectedTopics.every(
                            (topic) =>
                              selectedAlgorithms[topic.topic_lms_id] &&
                              selectedAlgorithms[topic.topic_lms_id].every(
                                (element) => element.algorithmShortName !== 'noKey'
                              )
                          ) ||
                          createTopicIsSending ||
                          successTopicCreated
                        }
                        sx={{ mr: -2 }}
                        onClick={async () => {
                          setCreateTopicIsSending(true)

                          // Ensure each handleCreate call finishes before the next one starts
                          for (const [topicId] of Object.entries(selectedAlgorithms)) {
                            await handleCreate(
                              selectedAlgorithms[parseInt(topicId)][0].topicName,
                              parseInt(topicId),
                              selectedLearningElementsClassification,
                              selectedAlgorithms[parseInt(topicId)][0].algorithmShortName,
                              courseId
                            )
                          }
                        }}>
                        {createTopicIsSending ? (
                          <CircularProgress size={24} />
                        ) : (
                          t('components.CreateTopicModal.createTopics')
                        )}
                      </Button>
                    </Grid>
                  </Box>
                </CreateAlgorithmTable>
              </Grid>
            ) : null}
          </Box>
        </Grid>
      </Modal>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateTopicModal.displayName = 'CreateTopicModal'
export default CreateTopicModal
