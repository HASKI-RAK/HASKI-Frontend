import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  Paper,
  Step,
  StepButton,
  Stepper,
  Typography
} from '@common/components'
import { Close } from '@common/icons'
import { LearningPathTopic, RemoteCourse, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import { SkeletonList } from '../../index'
import TableAlgorithm from '../Table/TableAlgorithm'
import TableLearningElement from '../Table/TableLearningElement'
import TableTopic from '../Table/TableTopic'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

const TopicModal = memo(({ open = false, handleClose }: CourseModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState<RemoteCourse>()
  const [remoteTopics, setRemoteTopics] = useState<RemoteTopic[]>([])
  const getRemoteTopics = useStore((state) => state.getRemoteTopic)
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
  const [selectedLearningElements, setSelectedLearningElements] = useState<RemoteLearningElement[]>([])
  const getTopics = useStore((state) => state.getLearningPathTopic)
  const getUser = usePersistedStore((state) => state.getUser)
  const [topics, setTopics] = useState<LearningPathTopic>()

  const options = [
    {
      name: 'Fixed Order',
      description: 'The learning elements are presented in a predetermined order.',
      key: 'fixed'
    },
    {
      name: 'Bayes',
      description:
        'Bayes is a probabilistic algorithm that calculates the learning path based on the probability for the best order for a learner.',
      key: 'bayes'
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
      key: 'genetic'
    },
    {
      name: 'Tyche',
      description:
        "Tyche is an algorithm based on the principle of luck. It is used to calculate the best learning path by taking into account the learners' luck factors.",
      key: 'tyche'
    }
  ]

  const [selectedAlgorithms, setSelectedAlgorithms] = useState<[number, string][]>(
    selectedTopics.map((topic) => [topic.topic_id, options[0].key])
  )
  const [activeStep, setActiveStep] = useState<number>(0)
  const steps = ['Select Topics', 'Select Learning Elements', 'Select Algorithm']

  useEffect(() => {
    getUser().then((user) => {
      getTopics(user.id, user.lms_user_id, user.settings.id, '1').then((topics) => {
        console.log(topics)
        return setTopics(topics)
      })
    })
    getRemoteTopics(2).then((response) => {
      setRemoteTopics(response)
    })
    selectedTopics.sort((a, b) => a.topic_id - b.topic_id)
    if (activeStep === 1) {
      // Gather all learning elements from the selected topics
      const allLearningElements = selectedTopics.flatMap((topic) => topic.learning_elements)
      setSelectedLearningElements(allLearningElements)
    }
  }, [activeStep, selectedTopics])

  const handleSetTopics = () => {
    console.log('Selected Topics:', selectedTopics)
    setActiveStep(1)
  }

  const handleTopicChange = (topics: RemoteTopic[]) => {
    setSelectedTopics(topics)
  }

  const handleLearningElementChange = (learningElements: RemoteLearningElement[]) => {
    setSelectedLearningElements(learningElements)
  }

  const handleAlgorithmChange = (algorithms: [number, string][]) => {
    console.log(algorithms)
    setSelectedAlgorithms(algorithms)
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
            data-testid={'QuestionnaireResultsCloseButton'}
            onClick={handleClose}
            sx={{
              position: 'sticky',
              top: '0%',
              left: '95.5%'
            }}>
            <Close />
          </Fab>
          <Stepper nonLinear activeStep={activeStep} sx={{ pt: '1rem' }}>
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
            <Grid container item>
              <TableTopic
                onTopicChange={handleTopicChange}
                selectedTopicsModal={selectedTopics}
                remoteTopics={remoteTopics}
              />
              <Grid container justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={handleSetTopics}>
                  {'Next'}
                </Button>
              </Grid>
            </Grid>
          ) : activeStep === 1 ? (
            <Grid container item>
              <TableLearningElement
                selectedTopicsModal={selectedTopics}
                onLearningElementChange={handleLearningElementChange}
                selectedLearningElementsState={selectedLearningElements}
              />
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button
                  id="add-course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveStep(activeStep - 1)}>
                  {'Back'}
                </Button>
                <Button
                  id="add-course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Selected Algorithms:', selectedAlgorithms)}>
                  {'Next'}
                </Button>
              </Grid>
            </Grid>
          ) : activeStep === 2 ? (
            <Grid container item>
              <TableAlgorithm
                selectedTopicsModal={selectedTopics}
                onAlgorithmChange={handleAlgorithmChange}
                selectedAlgorithms={selectedAlgorithms}
              />
              <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                  {'Back'}
                </Button>
                <Button
                  id="add-course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Selected Algorithms:', selectedAlgorithms)}>
                  {'Create Topics'}
                </Button>
              </Grid>
            </Grid>
          ) : null}
          {topics && (
            <Grid item container alignItems="stretch" direction="row">
              <Grid container item>
                <Typography variant="h6" sx={{ mt: '1rem' }}>
                  Already created Topics
                </Typography>
              </Grid>
              <Paper sx={{ padding: '1rem', width: '100%' }}>
                <FormGroup>
                  {topics.topics.map((LmsTopic) => (
                    <FormControlLabel control={<Checkbox />} label={LmsTopic.name} key={LmsTopic.name} />
                  ))}
                </FormGroup>
              </Paper>
            </Grid>
          )}
        </Box>
      </Grid>
    </Modal>
  )
})
// eslint-disable-next-line immutable/no-mutation
TopicModal.displayName = 'TopicModal'
export default TopicModal
