import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, Grid } from '@common/components'
import {
  CreateLearningElementSolutionModal,
  handleError,
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution
} from '@components'
import { LearningPathElement, RemoteTopics, Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

const CreateLearningElementSolution = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const [createLearningElementSolutionModalOpen, setCreateLearningElementSolutionModalOpen] = useState(false)
  const [activeStep, setActiveStep] = useState<number>(0)

  const { courseId } = useParams()
  const { topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const getRemoteTopics = useStore((state) => state.getRemoteTopics)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)

  const [currentTopic, setCurrentTopic] = useState<Topic>()
  const [selectedLearningElements, setSelectedLearningElements] = useState<{
    [key: number]: RemoteLearningElementWithClassification[]
  }>({})
  const [selectedSolutions, setSelectedSolutions] = useState<{ [key: number]: Solution[] }>({})
  const [learningElementsWithSolutions, setLearningElementsWithSolutions] = useState<{
    [key: number]: RemoteLearningElementWithSolution[]
  }>({})

  const handleOpen = useCallback(() => {
    setCreateLearningElementSolutionModalOpen(true)
  }, [setCreateLearningElementSolutionModalOpen])

  //empty all states on close
  const handleClose = useCallback(() => {
    setCreateLearningElementSolutionModalOpen(false)
    setActiveStep(0)
    setSelectedLearningElements({})
    setSelectedSolutions({})
    setLearningElementsWithSolutions({})
  }, [setCreateLearningElementSolutionModalOpen])

  //fetch Topic like in CreateLearningElement
  useEffect(() => {
    if (!courseId || !topicId) return
    getUser()
      .then((user) => {
        getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
          .then((learningPathTopic) => {
            setCurrentTopic(learningPathTopic.topics.find((topic) => topic.id === parseInt(topicId)))
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchLearningPathTopic', error, 5000)
          })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchUser', error, 5000)
      })
  }, [topicId, getUser, createLearningElementSolutionModalOpen, getLearningPathTopic, courseId, t, addSnackbar])

  // fetch remote learning elements to use as solutions
  // filter out the learning elements that are already in the learning path
  useEffect(() => {
    if (!courseId || !topicId || !currentTopic) return
    getUser()
      .then((user) =>
        getRemoteTopics(courseId)
          .then((topics: RemoteTopics[]) => {
            // Filter remote topics by matching the current topic LMS ID
            const remoteTopic = topics.find((topic) => topic.topic_lms_id === currentTopic.lms_id)
            return { user, remoteTopic }
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchRemoteTopics', error, 3000)
            // Throw error to stop the chain
            throw error
          })
      )
      .then(({ user, remoteTopic }) =>
        getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, courseId, topicId).then(
          (learningPathElementData: LearningPathElement) => {
            // Extract LMS IDs of learning elements already in the learning path
            const existingLearningElementIds = learningPathElementData.path.map(
              (element) => element.learning_element.lms_id
            )

            // Update remote topics by filtering out elements that already exist in the learning path
            const filteredLearningElements = remoteTopic?.lms_learning_elements.filter(
              (learningElement) => !existingLearningElementIds.includes(learningElement.lms_id)
            )

            // filtered learning elements are possible solutions for the current topic
            const solutions: Solution[] =
              filteredLearningElements?.map(
                (learningElement) =>
                  ({
                    solutionLmsId: learningElement.lms_id,
                    solutionLmsName: learningElement.lms_learning_element_name,
                    solutionLmsType: learningElement.lms_activity_type
                  } as Solution)
              ) || []

            setSelectedSolutions({ [currentTopic.lms_id]: solutions })
          }
        )
      )
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 3000)
      })
  }, [
    activeStep,
    setActiveStep,
    createLearningElementSolutionModalOpen,
    topicId,
    currentTopic,
    courseId,
    selectedLearningElements,
    setSelectedLearningElements
  ])

  return (
    <Grid>
      <Button
        id="add-solution-button"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'end', marginTop: '0.6rem', minWidth: '14rem' }}
        onClick={handleOpen}>
        {t('components.CreateLearningElementSolution.addSolution')}
      </Button>
      <CreateLearningElementSolutionModal
        open={createLearningElementSolutionModalOpen}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleCloseCreateLearningElementSolutionModal={handleClose}
        currentTopic={currentTopic}
        selectedLearningElements={selectedLearningElements}
        selectedSolutions={selectedSolutions}
        learningElementsWithSolutions={learningElementsWithSolutions}
        setSelectedLearningElements={setSelectedLearningElements}
        setLearningElementsWithSolutions={setLearningElementsWithSolutions}
      />
    </Grid>
  )
}

export default memo(CreateLearningElementSolution)
