import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Button, Grid } from '@common/components'
import {
  RemoteLearningElementWithClassification,
  RemoteLearningElementWithSolution,
  Solution,
  handleError
} from '@components'
import { RemoteLearningElement, Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import AddSolutionModal from './AddSolutionModal'

const CreateLearningElement = () => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const [addSolutionModalOpen, setAddSolutionModalOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<Topic>()
  
  const [activeStep, setActiveStep] = useState<number>(0)

  const { courseId } = useParams()
  const { topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)

  const handleOpen = useCallback(() => {
    setAddSolutionModalOpen(true)
  }, [setAddSolutionModalOpen])

  const handleClose = useCallback(() => {
    setAddSolutionModalOpen(false)
    setActiveStep(0)
  }, [setAddSolutionModalOpen])

  useEffect(() => {
    if (!courseId || !topicId) return
    getUser()
      .then((user) => {
        getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
          .then((learningPathTopic) => {
            setCurrentTopic(learningPathTopic.topics.filter((topic) => topic.id === parseInt(topicId))[0])
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
        sx={{ alignSelf: 'end', marginTop: '0.6rem' }}
        onClick={handleOpen}>
        {t('components.AddSolution.addSolution')}
      </Button>
      <AddSolutionModal
        open={addSolutionModalOpen}
        activeStep={activeStep}
        topicId={currentTopic?.id}
        setActiveStep={setActiveStep}
        onClose={handleClose}
      />
    </Grid>
  )
}

export default memo(CreateLearningElement)
