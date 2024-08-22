import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import { LearningPathTopic, RemoteCourse, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import { postLearningElement } from '../../../services/LearningElement/postLearningElement'
import { postCalculateLearningPath } from '../../../services/LearningPath/postCalculateLearningPath'
import { postLearningPathAlgorithm } from '../../../services/LearningPathAlgorithm/postLearningPathAlgorithm'
import { postTopic } from '../../../services/Topic/postTopic'
import TableAlgorithm from '../Table/TableAlgorithm'
import type { TableAlgorithmNameProps } from '../Table/TableAlgorithm'
import TableLearningElement from '../Table/TableLearningElement'
import TableLearningElementClassification from '../Table/TableLearningElementClassification'
import TableRemoteTopics from '../Table/TableRemoteTopics'
import TableTopics from '../Table/TableTopics'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

type LearningElementWithClassification = RemoteLearningElement & {
  classification: string
}

const TopicModal = memo(({ open = false, handleClose }: CourseModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()
  const [selectedCourse, setSelectedCourse] = useState<RemoteCourse>()
  const [remoteTopics, setRemoteTopics] = useState<RemoteTopic[]>([])
  const getRemoteTopics = useStore((state) => state.getRemoteTopic)
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
  const [selectedLearningElements, setSelectedLearningElements] = useState<{ [key: number]: RemoteLearningElement[] }>(
    {}
  )
  const getTopics = useStore((state) => state.getLearningPathTopic)
  const getUser = usePersistedStore((state) => state.getUser)
  const [topics, setTopics] = useState<LearningPathTopic>()
  const [selectedLearningElementsClassification, setSelectedLearningElementsClassifiction] = useState<{
    [key: number]: LearningElementWithClassification[]
  }>({})

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<{ [key: number]: TableAlgorithmNameProps[] }>({})

  const [activeStep, setActiveStep] = useState<number>(0)
  const steps = ['Topics', 'Learning Elements', 'Classifications', 'Algorithms']

  useEffect(() => {
    getUser().then((user) => {
      getTopics(user.settings.user_id, user.lms_user_id, user.id, courseId).then((topics) => {
        setTopics(topics)
        getRemoteTopics(courseId).then((response) => {
          return setRemoteTopics(
            response.filter((topic) => !topics.topics.some((t) => t.lms_id === topic.topic_lms_id))
          )
        })
      })
    })

    selectedTopics.sort((a, b) => a.topic_lms_id - b.topic_lms_id)
  }, [activeStep, selectedTopics])

  const handleSetTopics = () => {
    setActiveStep(1)
  }

  const allAlgorithmsValid = () => {
    console.log(Object.values(selectedAlgorithms))
    return Object.values(selectedAlgorithms).every((algorithms) => algorithms[0].algorithmShortName != 'noKey')
  }

  const hasLearningElementClassification = () => {
    return Object.keys(selectedLearningElementsClassification).length != 0
  }

  const handleTopicChange = (topics: RemoteTopic[]) => {
    setSelectedTopics(topics)
    /*    Object.keys(selectedLearningElements).forEach((topicId) => {
      if (topics.entries(topicId)) {
        console.log('ist drin' + topicId)
      } else {
        console.log('ist nicht drin' + topicId)
      }
    })*/
    const topicIds = topics.map((topic) => topic.topic_lms_id)
    // selectedLearningElements where the topic is not selected anymore
    const selectedLearningElementKeysNotInTopics = Object.keys(selectedLearningElements).filter(
      (topicId) => !topicIds.includes(parseInt(topicId))
    )
    // Log or handle the keys that are not in topics
    selectedLearningElementKeysNotInTopics.forEach((topicId) => {
      console.log(`Key ${topicId} is beeing removed from selectedLearningElements`)
      delete selectedLearningElements[parseInt(topicId)]
    })

    const selectedLearningElementClassificationKeysNotInTopics = Object.keys(
      selectedLearningElementsClassification
    ).filter((topicId) => !topicIds.includes(parseInt(topicId)))
    selectedLearningElementClassificationKeysNotInTopics.forEach((topicId) => {
      console.log(`Key ${topicId} is beeing removed from selectedLearningElementClassification`)
      delete selectedLearningElementsClassification[parseInt(topicId)]
    })

    const selectedAlgorithmKeysNotInTopics = Object.keys(selectedAlgorithms).filter(
      (topicId) => !topicIds.includes(parseInt(topicId))
    )
    selectedAlgorithmKeysNotInTopics.forEach((topicId) => {
      console.log(`Key ${topicId} is beeing removed from selectedAlgorithms`)
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

  const handleAlgorithmChange = (algorithms: { [key: number]: TableAlgorithmNameProps[] }) => {
    setSelectedAlgorithms(algorithms)
  }

  const handleCreateTopics = (topicName: string, lmsCourseId: number, courseId: string) => {
    const date = new Date()
    const outputJson: string = JSON.stringify({
      name: topicName,
      lms_id: lmsCourseId,
      is_topic: true,
      contains_le: true,
      created_by: 'Dimitri Bigler',
      created_at: date.toISOString().split('.')[0] + 'Z',
      updated_at: date.toISOString().split('.')[0] + 'Z',
      university: 'HS-KE'
    })
    return postTopic({ courseId, outputJson })
  }

  const handleCreateLearningElements = (
    learningElementName: string,
    learningElementActivityType: string,
    learningElementClassification: string,
    lmsLearningElementId: number,
    topicId: number
  ) => {
    const date = new Date()
    const outputJson: string = JSON.stringify({
      lms_id: lmsLearningElementId,
      activity_type: learningElementActivityType,
      classification: learningElementClassification,
      name: learningElementName,
      created_by: 'Dimitri Bigler',
      created_at: date.toISOString().split('.')[0] + 'Z',
      updated_at: date.toISOString().split('.')[0] + 'Z',
      university: 'HS-KE'
    })
    //console.log(learningElementName)
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

    return postCalculateLearningPath({ userId, courseId, topicId, outputJson })
  }

  const handleCreate = (
    topicName: string,
    lmsCourseId: number,
    selectedLearningElementsClassification: { [key: number]: LearningElementWithClassification[] },
    algorithmShortName: string,
    courseId?: string
  ) => {
    // ToDo: error in getting current courseId

    if (courseId == undefined) return
    handleCreateTopics(topicName, lmsCourseId, courseId).then((topic) => {
      const topicLmsId = topic.lms_id
      const topicId = topic.id
      if (selectedLearningElementsClassification[topicLmsId]) {
        selectedLearningElementsClassification[topicLmsId].forEach((element) => {
          handleCreateLearningElements(
            element.lms_learning_element_name,
            element.lms_activity_type,
            element.classification,
            element.lms_id,
            topic.id
          )
        })
        getUser().then((user) => {
          handleCreateAlgorithms(user.settings.user_id, topic.id, algorithmShortName).then(() => {
            handleCalculateLearningPaths(user.settings.user_id, user.role, user.university, courseId, topicId)
          })
        })
      }
    })
  }

  const handleConsoleLog = (
    topicName: string,
    lmsCourseId: number,
    selectedLearningElementClassification: { [key: number]: LearningElementWithClassification[] },
    algorithmShortName: string,
    courseId?: string
  ) => {
    console.log(selectedLearningElements)
    console.log(selectedLearningElementClassification)
    console.log(algorithmShortName)
  }

  const isAllValid = allAlgorithmsValid()
  const hasClassification = hasLearningElementClassification()
  const shouldDisable = !(isAllValid && hasClassification)
  //console.log(shouldDisable)

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
            data-testid={'TopicModalCloseButton'}
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
              <TableRemoteTopics
                onTopicChange={handleTopicChange}
                selectedTopicsModal={selectedTopics}
                remoteTopics={remoteTopics}>
                <Box sx={{ padding: '1rem', width: '95%' }}>
                  <Grid container justifyContent="flex-end" alignItems="flex-end">
                    <Button
                      id="add-course-button"
                      variant="contained"
                      color="primary"
                      disabled={selectedTopics.length === 0}
                      onClick={handleSetTopics}
                      sx={{ mr: -2 }}>
                      {'Next'}
                    </Button>
                  </Grid>
                </Box>
              </TableRemoteTopics>
              {topics && <TableTopics topics={topics} />}
            </>
          ) : activeStep === 1 ? (
            <Grid container item>
              <TableLearningElement
                selectedTopicsModal={selectedTopics}
                onLearningElementChange={handleLearningElementChange}
                selectedLearningElements={selectedLearningElements}>
                <Box sx={{ padding: '1rem', width: '95%' }}>
                  <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Button
                      id="add-course-button"
                      variant="contained"
                      color="primary"
                      sx={{ ml: 1 }}
                      onClick={() => setActiveStep(activeStep - 1)}>
                      {'Back'}
                    </Button>
                    <Button
                      id="add-course-button"
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
                      {'Next'}
                    </Button>
                  </Grid>
                </Box>
              </TableLearningElement>
            </Grid>
          ) : activeStep === 2 ? (
            <Grid container item>
              <TableLearningElementClassification
                selectedTopicsModal={selectedTopics}
                LearningElements={selectedLearningElements}
                LearningElementsClassifcation={selectedLearningElementsClassification}
                onLearningElementChange={handleLearningElementClassification}>
                <Box sx={{ padding: '1rem', width: '95%' }}>
                  <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Button
                      id="add-course-button"
                      variant="contained"
                      color="primary"
                      sx={{ ml: 1 }}
                      onClick={() => setActiveStep(activeStep - 1)}>
                      {'Back'}
                    </Button>
                    <Button
                      id="add-course-button"
                      variant="contained"
                      color="primary"
                      sx={{ mr: -2 }}
                      onClick={() => setActiveStep(activeStep + 1)}>
                      {'Next'}
                    </Button>
                  </Grid>
                </Box>
              </TableLearningElementClassification>
            </Grid>
          ) : activeStep === 3 ? (
            <Grid container item>
              <TableAlgorithm
                selectedTopicsModal={selectedTopics}
                selectedLearningElementClassification={selectedLearningElementsClassification}
                onAlgorithmChange={handleAlgorithmChange}
                selectedAlgorithms={selectedAlgorithms}>
                <Box sx={{ padding: '1rem', width: '95%' }}>
                  <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Button
                      id="add-course-button"
                      variant="contained"
                      color="primary"
                      sx={{ ml: 1 }}
                      onClick={() => setActiveStep(activeStep - 1)}>
                      {'Back'}
                    </Button>
                    <Button
                      id="add-course-button"
                      variant="contained"
                      color="primary"
                      disabled={shouldDisable}
                      sx={{ mr: -2 }}
                      onClick={() =>
                        Object.entries(selectedAlgorithms).map(([topicId]) => {
                          handleConsoleLog(
                            selectedAlgorithms[parseInt(topicId)][0].topicName,
                            parseInt(topicId),
                            selectedLearningElementsClassification,
                            selectedAlgorithms[parseInt(topicId)][0].algorithmShortName,
                            courseId
                          )
                        })
                      }>
                      {'Create Topics'}
                    </Button>
                  </Grid>
                </Box>
              </TableAlgorithm>
            </Grid>
          ) : null}
        </Box>
      </Grid>
    </Modal>
  )
})
// eslint-disable-next-line immutable/no-mutation
TopicModal.displayName = 'TopicModal'
export default TopicModal
