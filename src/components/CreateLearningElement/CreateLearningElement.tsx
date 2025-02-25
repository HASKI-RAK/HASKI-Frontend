import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Grid } from '@common/components'
import { CreateLearningElementModal, RemoteLearningElementWithClassification } from '@components'
import { RemoteLearningElement, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'

const CreateLearningElement = () => {
  const [createLearningElementModalOpen, setCreateLearningElementModalOpen] = useState(false)
  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const [currentTopic, setCurrentTopic] = useState<Topic>()
  const [selectedLearningElements, setSelectedLearningElements] = useState<{
    [key: number]: RemoteLearningElement[]
  }>({})
  const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
    [key: number]: RemoteLearningElementWithClassification[]
  }>({})

  const handleCloseLearningElementModal = () => {
    setSelectedLearningElements({})
    setSelectedLearningElementsClassification({})
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
        handleCloseCreateTopicModal={handleCloseLearningElementModal}
        selectedLearningElements={selectedLearningElements}
        setSelectedLearningElements={setSelectedLearningElements}
        selectedLearningElementsClassification={selectedLearningElementsClassification}
        setSelectedLearningElementsClassification={
          setSelectedLearningElementsClassification
        }></CreateLearningElementModal>
    </Grid>
  )
}

export default memo(CreateLearningElement)
