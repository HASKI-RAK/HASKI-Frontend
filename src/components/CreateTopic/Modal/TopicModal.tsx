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
  const [alreadyCreatedTopics, setAlreadyCreatedTopics] = useState<Topic[]>([])
  const [selectedLearningElementsClassification, setSelectedLearningElementsClassifiction] = useState<{
    [key: number]: LearningElementWithClassification[]
  }>({})

  const options = [
    {
      name: 'Fixed Order',
      description: 'The learning elements are presented in a predetermined order.',
      key: 'default'
    },
    {
      name: 'Graf',
      description:
        'This algorithm is based on the learning adaptive mechanism by Graf et al. It calculates the learning path based on the learning style of the learner.',
      key: 'graf'
    },
    {
      name: 'ACO',
      description:
        'The Ant Colony Algorithm (ACO) is inspired by the behavior of ant workers. It calculates the learning path by simulating ants who leave behind pheromones to mark the best path.',
      key: 'aco'
    },
    {
      name: 'Genetic Algorithm',
      description:
        'The Genetic Algorithm is inspired by evolution. It approximates the best learning path by simulating the process of mutation and selection. It is often used for its speed.',
      key: 'ga'
    },
    {
      name: 'Tyche',
      description:
        "Tyche is an algorithm based on the principle of luck. It is used to calculate the best learning path by taking into account the learners' luck factors.",
      key: 'tyche'
    }
  ]

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<[number, string, string][]>(
    selectedTopics.map((topic) => [topic.topic_lms_id, topic.topic_lms_name, options[0].key])
  )
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
    /*    if (activeStep === 1 && Object.keys(selectedLearningElements).length === 0) {
      // Gather all learning elements from the selected topics
      console.log('wtf')
      const allLearningElements = selectedTopics.reduce((acc, topic) => {
        acc[topic.topic_lms_id] = topic.lms_learning_elements
        return acc
      }, {} as { [key: number]: RemoteLearningElement[] })
      setSelectedLearningElements(allLearningElements)
    }*/
    /* if (activeStep === 2) {
      Object.keys(selectedLearningElements).forEach((topicId) => {
        // Search for learning elements that do not have a classification yet
        if (Object.keys(selectedLearningElementsClassification).indexOf(topicId) === -1) {
          // set classification for new learning elements
          const updatedElements = selectedLearningElements[parseInt(topicId)].map((element) => {
            return { ...element, classification: '' }
          })

          // Update the state with the combined elements for this topic
          setSelectedLearningElementsClassifiction((prev) => ({
            ...prev,
            [topicId]: updatedElements
          }))
        }
      })
    }*/
  }, [activeStep, selectedTopics])

  const handleSetTopics = () => {
    setActiveStep(1)
  }

  const handleTopicChange = (topics: RemoteTopic[]) => {
    setSelectedTopics(topics)
  }

  const handleLearningElementChange = (learningElements: { [key: number]: RemoteLearningElement[] }) => {
    setSelectedLearningElements(learningElements)
  }

  const handleLearningElementClassification = (learningElementClassifications: {
    [key: number]: LearningElementWithClassification[]
  }) => {
    setSelectedLearningElementsClassifiction(learningElementClassifications)
  }

  const handleAlgorithmChange = (algorithms: [number, string, string][]) => {
    console.log(algorithms)
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
    console.log(learningElementName)
    return postLearningElement({ topicId, outputJson })
  }

  const handleCreateAlgorithms = (userId: number, topicId: number, algorithmShortname: string) => {
    const date = new Date()
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
    selectedLearningElements: { [key: number]: LearningElementWithClassification[] },
    algorithmShortName: string,
    courseId?: string
  ) => {
    console.log(selectedLearningElements)
    console.log(algorithmShortName)
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
                selectedLearningElementsState={selectedLearningElements}>
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
                      disabled={selectedTopics.length === 0}
                      sx={{ mr: -2 }}
                      onClick={() =>
                        selectedAlgorithms.map((selectedAlgorithm) => {
                          handleCreate(
                            selectedAlgorithm[1],
                            selectedAlgorithm[0],
                            selectedLearningElementsClassification,
                            selectedAlgorithm[2],
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
