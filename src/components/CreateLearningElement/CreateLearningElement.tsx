import { Grid } from '@mui/material'
import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@common/components'
import { Topic } from '@core'
import { usePersistedStore, useStore } from '@store'
import CreateLearningElementModal from './CreateLearningElementModal'

const CreateLearningElement = () => {
  const [createLearningElementModalOpen, setCreateLearningElementModalOpen] = useState(false)
  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const [currentTopic, setCurrentTopic] = useState<Topic>()

  const handleCloseLearningElementModal = () => {
    setCreateLearningElementModalOpen(false)
  }

  useEffect(() => {
    getUser().then((user) => {
      getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId).then((learningPathTopic) => {
        setCurrentTopic(learningPathTopic.topics.filter((topic) => topic.id === parseInt(topicId ?? '0'))[0])
      })
    })
  }, [topicId])

  return (
    <Grid>
      <Button
        id="contact-form-button"
        variant="contained"
        color="primary"
        sx={{ alignSelf: 'end', marginTop: '0.6rem' }}
        onClick={() => setCreateLearningElementModalOpen(true)}>
        Add Learning Element
      </Button>
      <CreateLearningElementModal
        openCreateTopicModal={createLearningElementModalOpen}
        currentTopicLmsId={currentTopic?.lms_id ?? 0}
        handleCloseCreateTopicModal={handleCloseLearningElementModal}></CreateLearningElementModal>
    </Grid>
  )
}

export default memo(CreateLearningElement)
