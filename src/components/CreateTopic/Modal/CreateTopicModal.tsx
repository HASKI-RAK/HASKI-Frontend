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
  CreateLearningElementTable,
  CreateRemoteTopicsTable,
  ExistingTopicsTable
} from '@components'
import { LearningPathTopic, RemoteLearningElement, RemoteTopic, User } from '@core'
import {
  SnackbarContext,
  postCalculateLearningPathForAllStudents,
  postLearningElement,
  postLearningPathAlgorithm,
  postTopic
} from '@services'
import { usePersistedStore, useStore } from '@store'

type CourseModalProps = {
  open?: boolean
  successTopicCreated: boolean
  setSuccessTopicCreated: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void
}

type LearningElementWithClassification = RemoteLearningElement & {
  classification: string
}

const CreateTopicModal = memo(
  ({ open = false, successTopicCreated, setSuccessTopicCreated, handleClose }: CourseModalProps) => {
    const { t } = useTranslation()
    const { courseId } = useParams<{ courseId: string }>()

    const [remoteTopics, setRemoteTopics] = useState<RemoteTopic[]>([])
    const [isSending, setIsSending] = useState<boolean>(false)
    const { addSnackbar } = useContext(SnackbarContext)
    const [alreadyCreatedTopics, setAlreadyCreatedTopics] = useState<LearningPathTopic>()
    const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
    const [selectedLearningElements, setSelectedLearningElements] = useState<{
      [key: number]: RemoteLearningElement[]
    }>({})
    const [selectedLearningElementsClassification, setSelectedLearningElementsClassifiction] = useState<{
      [key: number]: LearningElementWithClassification[]
    }>({})
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<{ [key: number]: CreateAlgorithmTableNameProps[] }>({})
    const [activeStep, setActiveStep] = useState<number>(0)
    const steps = ['Topics', 'Learning Elements', 'Classifications', 'Algorithms']

    const getUser = usePersistedStore((state) => state.getUser)
    const getRemoteTopics = useStore((state) => state.getRemoteTopic)
    const getTopics = useStore((state) => state.getLearningPathTopic)

    useEffect(() => {
      getUser().then((user) => {
        getTopics(user.settings.user_id, user.lms_user_id, user.id, courseId).then((topics) => {
          setAlreadyCreatedTopics(topics)
          getRemoteTopics(courseId).then((response) => {
            return setRemoteTopics(
              response.filter((topic) => !topics.topics.some((t) => t.lms_id === topic.topic_lms_id))
            )
          })
        })
      })

      setSelectedTopics((prevSelectedTopics) => [...prevSelectedTopics].sort((a, b) => a.topic_lms_id - b.topic_lms_id))
    }, [activeStep, getTopics, getUser, getRemoteTopics])

    const handleTopicChange = (topics: RemoteTopic[]) => {
      setSelectedTopics(topics)

      const topicIds = topics.map((topic) => topic.topic_lms_id)
      // selectedLearningElements where the topic is not selected anymore

      // Remove all selectedLearningElements when Topic is deselected
      const selectedLearningElementKeysNotInTopics = Object.keys(selectedLearningElements).filter(
        (topicId) => !topicIds.includes(parseInt(topicId))
      )
      selectedLearningElementKeysNotInTopics.forEach((topicId) => {
        delete selectedLearningElements[parseInt(topicId)]
      })

      // Remove all selectedLearningElementClassifications when Topic is deselected
      const selectedLearningElementClassificationKeysNotInTopics = Object.keys(
        selectedLearningElementsClassification
      ).filter((topicId) => !topicIds.includes(parseInt(topicId)))
      selectedLearningElementClassificationKeysNotInTopics.forEach((topicId) => {
        delete selectedLearningElementsClassification[parseInt(topicId)]
      })

      // Remove all selectedAlgorithms when Topic is deselected
      const selectedAlgorithmKeysNotInTopics = Object.keys(selectedAlgorithms).filter(
        (topicId) => !topicIds.includes(parseInt(topicId))
      )
      selectedAlgorithmKeysNotInTopics.forEach((topicId) => {
        delete selectedAlgorithms[parseInt(topicId)]
      })
    }

    const handleLearningElementChange = (learningElements: { [key: number]: RemoteLearningElement[] }) => {
      setSelectedLearningElements(learningElements)
    }

    const handleLearningElementClassification = (learningElementClassifications: {
      [key: number]: LearningElementWithClassification[]
    }) => {
      setSelectedLearningElementsClassifiction(learningElementClassifications)
    }

    const handleAlgorithmChange = (algorithms: { [key: number]: CreateAlgorithmTableNameProps[] }) => {
      setSelectedAlgorithms(algorithms)
    }

    const handleCreateTopics = (topicName: string, lmsCourseId: number, courseId: string, user: User) => {
      const date = new Date()
      const outputJson: string = JSON.stringify({
        name: topicName,
        lms_id: lmsCourseId,
        is_topic: true,
        contains_le: true,
        created_by: user.name,
        created_at: date.toISOString().split('.')[0] + 'Z',
        updated_at: date.toISOString().split('.')[0] + 'Z',
        university: user.university
      })
      return postTopic({ courseId, outputJson })
    }

    const handleCreateLearningElements = (
      learningElementName: string,
      learningElementActivityType: string,
      learningElementClassification: string,
      lmsLearningElementId: number,
      topicId: number,
      user: User
    ) => {
      const date = new Date()
      const outputJson: string = JSON.stringify({
        lms_id: lmsLearningElementId,
        activity_type: learningElementActivityType,
        classification: learningElementClassification,
        name: learningElementName,
        created_by: user.name,
        created_at: date.toISOString().split('.')[0] + 'Z',
        updated_at: date.toISOString().split('.')[0] + 'Z',
        university: user.university
      })
      return postLearningElement({ topicId, outputJson })
    }

    const handleCreateAlgorithms = (userId: number, topicId: number, algorithmShortname: string) => {
      const outputJson: string = JSON.stringify({
        algorithm_s_name: algorithmShortname
      })
      return postLearningPathAlgorithm({ userId, topicId, outputJson })
    }

    const handleCalculateLearningPaths = (
      userId: number,
      userRole: string,
      university: string,
      courseId: string,
      topicId: number
    ) => {
      const outputJson: string = JSON.stringify({
        university: university,
        role: userRole
      })

      return postCalculateLearningPathForAllStudents({ userId, courseId, topicId, outputJson })
    }

    const handleCreate = (
      topicName: string,
      lmsCourseId: number,
      selectedLearningElementsClassification: { [key: number]: LearningElementWithClassification[] },
      algorithmShortName: string,
      courseId?: string
    ) => {
      if (courseId == undefined) return
      getUser().then((user) => {
        handleCreateTopics(topicName, lmsCourseId, courseId, user).then((topic) => {
          const topicLmsId = topic.lms_id
          const topicId = topic.id
          setIsSending(true)
          selectedLearningElementsClassification[topicLmsId].forEach((element) => {
            return handleCreateLearningElements(
              element.lms_learning_element_name,
              element.lms_activity_type,
              element.classification,
              element.lms_id,
              topic.id,
              user
            )
          })
          handleCreateAlgorithms(user.settings.user_id, topic.id, algorithmShortName).then(() => {
            handleCalculateLearningPaths(user.settings.user_id, user.role, user.university, courseId, topicId).then(
              (response) => {
                if (response) {
                  addSnackbar({
                    message: t('appGlobal.dataSendSuccessful'),
                    severity: 'success',
                    autoHideDuration: 5000
                  })
                  log.info(t('appGlobal.dataSendSuccessful'))
                  setSuccessTopicCreated(true)
                  setIsSending(false)
                } else {
                  addSnackbar({
                    message: t('appGlobal.dataSendUnsuccessful'),
                    severity: 'error',
                    autoHideDuration: 5000
                  })
                  log.error(t('appGlobal.dataSendUnsuccessful'))
                  setSuccessTopicCreated(false)
                  setIsSending(false)
                }
              }
            )
          })
        })
      })
    }

    const handleConsoleLog = (
      topicName: string,
      lmsCourseId: number,
      selectedLearningElementClassification: { [key: number]: LearningElementWithClassification[] },
      algorithmShortName: string,
      courseId?: string
    ) => {
      setIsSending(true)
      console.log(selectedLearningElements)
      console.log(selectedLearningElementClassification)
      console.log(algorithmShortName)
      setTimeout(() => setIsSending(false), 2000)
    }

    return (
      <Modal open={open} onClose={handleClose}>
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
              id={'topic-modal-close-button'}
              onClick={handleClose}
              sx={{
                position: 'sticky',
                top: '0%',
                left: '95.5%'
              }}>
              <Close />
            </Fab>
            <Stepper activeStep={activeStep} sx={{ pt: '1rem' }}>
              {steps.map((label, index) => (
                <Step key={label} data-testid={'StepperButton'}>
                  <StepButton
                    color="inherit"
                    id={'topic-modal-stepper'}
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
                  selectedTopicsModal={selectedTopics}
                  remoteTopics={remoteTopics}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="flex-end" alignItems="flex-end">
                      <Button
                        id="topic-modal-available-topics-next-button"
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
                  <ExistingTopicsTable topics={alreadyCreatedTopics} />
                )}
              </>
            ) : activeStep === 1 ? (
              <Grid container item>
                <CreateLearningElementTable
                  selectedTopicsModal={selectedTopics}
                  onLearningElementChange={handleLearningElementChange}
                  selectedLearningElements={selectedLearningElements}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="topic-modal-available-learning-elements-next-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="topic-modal-available-learning-elements-back-button"
                        variant="contained"
                        color="primary"
                        disabled={
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
                  selectedTopicsModal={selectedTopics}
                  LearningElements={selectedLearningElements}
                  LearningElementsClassification={selectedLearningElementsClassification}
                  onLearningElementChange={handleLearningElementClassification}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="topic-modal-available-learning-element-classification-back-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="topic-modal-available-learning-element-classification-next-button"
                        variant="contained"
                        color="primary"
                        disabled={
                          !selectedTopics.every(
                            (topic) =>
                              selectedLearningElementsClassification[topic.topic_lms_id] &&
                              selectedLearningElementsClassification[topic.topic_lms_id].every(
                                (element) => element.classification !== 'noKey'
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
                <CreateAlgorithmTable
                  selectedTopicsModal={selectedTopics}
                  selectedLearningElementClassification={selectedLearningElementsClassification}
                  onAlgorithmChange={handleAlgorithmChange}
                  selectedAlgorithms={selectedAlgorithms}>
                  <Box sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                      <Button
                        id="topic-modal-available-topic-algorithms-back-button"
                        variant="contained"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => setActiveStep(activeStep - 1)}>
                        {t('appGlobal.back')}
                      </Button>
                      <Button
                        id="topic-modal-create-topics-button"
                        variant="contained"
                        color="primary"
                        disabled={
                          !selectedTopics.every(
                            (topic) =>
                              selectedAlgorithms[topic.topic_lms_id] &&
                              selectedAlgorithms[topic.topic_lms_id].every(
                                (element) => element.algorithmShortName !== 'noKey'
                              )
                          ) ||
                          isSending ||
                          successTopicCreated
                        }
                        sx={{ mr: -2 }}
                        onClick={() =>
                          Object.entries(selectedAlgorithms).map(([topicId]) => {
                            handleCreate(
                              selectedAlgorithms[parseInt(topicId)][0].topicName,
                              parseInt(topicId),
                              selectedLearningElementsClassification,
                              selectedAlgorithms[parseInt(topicId)][0].algorithmShortName,
                              courseId
                            )
                          })
                        }>
                        {isSending ? <CircularProgress size={24} /> : t('components.TopicModal.createTopics')}
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
CreateTopicModal.displayName = 'TopicModal'
export default CreateTopicModal
