import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Fab, Grid, Modal, Step, StepButton, Stepper, Typography } from '@common/components'
import { Close } from '@common/icons'
import { RemoteCourse } from '@core'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
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
  const [selectedTopics, setSelectedTopics] = useState<RemoteTopic[]>([])
  const [selectedLearningElements, setSelectedLearningElements] = useState<RemoteLearningElement[]>([])
  const [activeStep, setActiveStep] = useState<number>(0)
  const steps = ['Select Topics', 'Select Learning Elements', 'Select Algorithm']

  useEffect(() => {
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
              <TableTopic onTopicChange={handleTopicChange} selectedTopicsModal={selectedTopics} />
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
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                  {'Back'}
                </Button>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(2)}>
                  {'Next'}
                </Button>
              </Grid>
            </Grid>
          ) : activeStep === 2 ? (
            <Grid container item>
              <TableAlgorithm lmsRemoteTopics={selectedTopics} />
              <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                  {'Back'}
                </Button>
                <Button
                  id="add-course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Selected Course:', selectedCourse)}>
                  {'Create Topics'}
                </Button>
              </Grid>
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
