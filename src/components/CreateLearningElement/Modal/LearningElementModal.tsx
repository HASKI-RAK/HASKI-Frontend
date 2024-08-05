import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Fab, Grid, Modal, Typography } from '@common/components'
import { Close } from '@common/icons'
import { LearningPathLearningElement, LearningPathTopic, RemoteCourse, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import TableTopics from '../../CreateTopic/Table/TableTopics'
import { SkeletonList } from '../../index'
import TableAlreadyCreatedLearningElement from '../Table/TableAlreadyCreatedLearningElement'
import TableAvailableLearningElement from '../Table/TableAvailableLearningElement'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

const LearningElementModal = memo(({ open = false, handleClose }: CourseModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()
  const [selectedCourse, setSelectedCourse] = useState<RemoteCourse>()
  const [remoteTopics, setRemoteTopics] = useState<RemoteTopic[]>([])
  const getRemoteTopics = useStore((state) => state.getRemoteTopic)
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
  const [selectedLearningElements, setSelectedLearningElements] = useState<RemoteLearningElement[]>([])
  const getTopics = useStore((state) => state.getLearningPathTopic)
  const getUser = usePersistedStore((state) => state.getUser)
  const [alreadyCreatedTopics, setAlreadyCreatedTopics] = useState<Topic[]>([])
  const [currentTopic, setCurrentTopic] = useState<RemoteTopic>()
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)
  const [alreadyCreatedLearningElements, setAlreadyCreatedLearningElements] = useState<LearningPathLearningElement[]>(
    []
  )
  const [availableLearningElements, setAvailableLearningElements] = useState<RemoteLearningElement[]>([])
  const [remoteTopic, setRemoteTopic] = useState<RemoteTopic>()

  const handleLearningElementChange = (learningElements: RemoteLearningElement[]) => {
    setSelectedLearningElements(learningElements)
  }

  useEffect(() => {
    getUser().then((user) => {
      getRemoteTopics(courseId)
        .then((remoteTopics) => {
          setRemoteTopics(remoteTopics)
          const currentTopic = remoteTopics.filter((topic) => topic.topic_lms_id === 93)[0]
          console.log(currentTopic.lms_learning_elements)
          setCurrentTopic(currentTopic)
          return currentTopic.lms_learning_elements
        })
        .then((currentElements) => {
          getLearningPathElement(user.settings.user_id, user.lms_user_id, user.id, '2', '19').then(
            (LearningPathElement) => {
              setAlreadyCreatedLearningElements(LearningPathElement.path)
              return setAvailableLearningElements(
                currentElements.filter(
                  (element) => !LearningPathElement.path.some((el) => el.learning_element.lms_id === element.lms_id)
                )
              )
            }
          )
        })
    })

    // Gather all learning elements from the selected topics
    const allLearningElements = selectedTopics.flatMap((topic) => topic.lms_learning_elements)
    setSelectedLearningElements(allLearningElements)
  }, [
    getUser,
    getRemoteTopics,
    setRemoteTopics,
    getLearningPathElement,
    setAvailableLearningElements,
    setAlreadyCreatedLearningElements,
    open,
    courseId
  ])

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
            data-testid={'QuestionnaireResultsCloseButton'}
            onClick={handleClose}
            sx={{
              position: 'sticky',
              top: '0%',
              left: '95.5%'
            }}>
            <Close />
          </Fab>
          <>
            <Grid container item justifyContent="center" alignItems="center">
              <Typography variant={'h5'}>{currentTopic?.topic_lms_name}</Typography>
            </Grid>
            <Grid container item>
              <TableAvailableLearningElement
                availableLearningElements={availableLearningElements}
                onLearningElementChange={handleLearningElementChange}
              />
              <Grid container justifyContent="flex-end" alignItems="center" sx={{ mt: 2 }}>
                <Button
                  id="add-course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Learning Elements created')}>
                  {'Create Learning Elements'}
                </Button>
              </Grid>
            </Grid>
            <Grid container item>
              <TableAlreadyCreatedLearningElement alreadyCreatedLearningElements={alreadyCreatedLearningElements} />
            </Grid>
          </>
        </Box>
      </Grid>
    </Modal>
  )
})
// eslint-disable-next-line immutable/no-mutation
LearningElementModal.displayName = 'LearningElementModal'
export default LearningElementModal
