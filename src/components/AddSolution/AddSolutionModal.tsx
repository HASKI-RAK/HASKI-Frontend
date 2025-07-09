import { Dispatch, SetStateAction, memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Paper, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  RemoteLearningElementWithClassification,
  handleError
} from '@components'
import { LearningPathElement, Topic, RemoteTopics } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { RemoteLearningElementWithSolution, Solution } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'
import CreateLearningElementSolutionStep from '../CreateTopic/Modal/CreateLearningElementSolutionsStep/CreateLearningElementSolutionStep'
import SelectLearningElementStep from './SelectLearningElementStep/SelectLearningElementStep'
import { postLearningElementSolution } from '@services'

type AddSolutionModalProps = {
  open: boolean
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  onClose: () => void
}

const AddSolutionModalProps = ({ open, activeStep, setActiveStep, onClose }: AddSolutionModalProps) => {
    const { t } = useTranslation()
    const { addSnackbar } = useContext(SnackbarContext)
    const { courseId } = useParams()

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
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { topicId } = useParams()

    const handleSend = useCallback(() => {
        if (!currentTopic) {
            addSnackbar({ message: t('components.AddSolutionModal.noTopic'), severity: 'error' })
            return
        }
        setIsLoading(true)
        learningElementsWithSolutions[currentTopic.lms_id]?.forEach((solution) => {
            const outputJson = JSON.stringify({ solution_Lms_Id: solution.learningElementLmsId, activity_type: solution.solutionLmsType })
            postLearningElementSolution({learningElementLmsId: solution.learningElementLmsId, outputJson})
                .then(() => {
                    addSnackbar({message: t('appGlobal.solutionAdded'), severity: 'success'})
                })
                .catch((error) => {
                    handleError(t, addSnackbar, 'error.addSolution', error, 5000)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        })
    }, [onClose])

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


  //filter out the learning elements that are already in the learning path
  useEffect(() => {
    if (!courseId || !topicId) return
    getUser()
      .then((user) =>
        getRemoteTopics(courseId)
          .then((topics: RemoteTopics[]) => {
            // Filter remote topics by matching the current topic LMS ID
            const remoteTopic = topics.find((topic) => topic.topic_lms_id === currentTopic?.lms_id)
            return { user, remoteTopic }
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchRemoteTopics', error, 3000)
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
            const solutions : Solution[] = filteredLearningElements?.map((learningElement) => ({
                solutionLmsId: learningElement.lms_id,
                solutionLmsName: learningElement.lms_learning_element_name,
                solutionLmsType: learningElement.lms_activity_type
            } as Solution)) || []
        })
      )
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 3000)
      })
  }, [
    activeStep,
    setActiveStep,
    topicId,
    courseId,
    selectedLearningElements,
    setSelectedLearningElements,
  ])
    
    return (
        !currentTopic ?
        <Box sx={{ padding: '2rem', width: '80%', margin: 'auto', marginTop: '5rem' }}>
            <h2>{t('components.AddSolutionModal.noTopic')}</h2>
        </Box>
        :
        <Modal open={open} onClose={onClose}>
            <Box sx={{ padding: '2rem', width: '80%', margin: 'auto', marginTop: '5rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', position: 'relative' }}>
                <Fab
                    id="close-modal-button"
                    color="primary"
                    size="small"
                    onClick={onClose}
                    sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
                >
                    <Close />
                </Fab>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {['Select Learning Elements', 'Select Solutions'].map((label) => (
                                <Step key={label}>
                                    <StepButton onClick={() => setActiveStep(activeStep)}>{label}</StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    {activeStep === 0 && (
                        <SelectLearningElementStep
                            selectedTopics={currentTopic}
                            selectedLearningElements={selectedLearningElements}
                            selectedSolutions={selectedSolutions}
                            learningElementsWithSolution={learningElementsWithSolutions}
                            setSelectedLearningElements={setSelectedLearningElements}
                            onNext={() => setActiveStep(1)}
                        />
                    )}
                    {activeStep === 1 && (
                        <CreateLearningElementSolutionStep
                            selectedTopics={
                                currentTopic
                                    ? [{
                                        topic_lms_id: currentTopic.lms_id,
                                        topic_lms_name: currentTopic.name,
                                        lms_learning_elements: []
                                    }]
                                    : []
                            }
                            selectedSolutions={selectedSolutions}
                            LearningElementsClassification={selectedLearningElements}
                            learningElementsWithSolutions={learningElementsWithSolutions}
                            onLearningElementSolutionChange={setLearningElementsWithSolutions}
                            onNext={handleSend}
                            onBack={() => setActiveStep(1)}
                            nextButtonText={t('appGlobal.next')}
                        />
                    )}
                </Grid>
                </Paper>
            </Box>
        </Modal>
    )
}

export default memo(AddSolutionModalProps)