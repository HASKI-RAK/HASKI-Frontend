import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, Grid } from '@common/components'
import {
  CreateLearningElementModal,
  handleError,
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution
} from '@components'
import { RemoteLearningElement, Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

const CreateLearningElement = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const [createLearningElementModalOpen, setCreateLearningElementModalOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<Topic>()
  const [selectedLearningElements, setSelectedLearningElements] = useState<{
    [key: number]: RemoteLearningElement[]
  }>({})
  const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
    [key: number]: RemoteLearningElementWithClassification[]
  }>({})
  const [selectedLearningElementSolution, setSelectedLearningElementSolution] = useState<{
    [key: number]: RemoteLearningElementWithSolution[]
  }>({})
  const [selectedSolutions, setSelectedSolutions] = useState<{
    [key: number]: Solution[]
  }>({})
  const [activeStep, setActiveStep] = useState<number>(0)

  const { courseId } = useParams()
  const { topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  const handleCloseLearningElementModal = useCallback(() => {
    setSelectedLearningElements({})
    setSelectedLearningElementsClassification({})
    setCreateLearningElementModalOpen(false)
    setSelectedSolutions({})
    setActiveStep(0)
  }, [setSelectedLearningElements, setCreateLearningElementModalOpen, setSelectedLearningElementsClassification])

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
  }, [topicId, getUser, getLearningPathTopic, courseId, t, addSnackbar])

  return (
    <Grid>
      <Button
        id="create-learning-element-button"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'end', marginTop: '0.6rem', minWidth: '14rem' }}
        onClick={useCallback(() => {
          setCreateLearningElementModalOpen(true)
        }, [setCreateLearningElementModalOpen])}>
        {t('components.CreateLearningElement.createLearningElement')}
      </Button>
      <CreateLearningElementModal
        openCreateTopicModal={createLearningElementModalOpen}
        currentTopicLmsId={currentTopic?.lms_id ?? 0}
        handleCloseCreateTopicModal={handleCloseLearningElementModal}
        selectedLearningElements={selectedLearningElements}
        setSelectedLearningElements={setSelectedLearningElements}
        selectedLearningElementsClassification={selectedLearningElementsClassification}
        setSelectedLearningElementsClassification={setSelectedLearningElementsClassification}
        setSelectedLearningElementSolution={setSelectedLearningElementSolution}
        selectedLearningElementSolution={selectedLearningElementSolution}
        setSelectedSolutions={setSelectedSolutions}
        selectedSolutions={selectedSolutions}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
    </Grid>
  )
}

export default memo(CreateLearningElement)
