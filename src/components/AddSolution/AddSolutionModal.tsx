import { Dispatch, SetStateAction, memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  CreateLearningElementClassificationsStep,
  CreateLearningElementsStep,
  RemoteLearningElementWithClassification,
  handleError
} from '@components'
import { LearningPathElement, RemoteLearningElement, RemoteTopics } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { RemoteLearningElementWithSolution, Solution } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'
import { useCreateTopicModal } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal.hooks'
import CreateLearningElementSolutionStep from '../CreateTopic/Modal/CreateLearningElementSolutionsStep/CreateLearningElementSolutionStep'

type AddSolutionModalProps = {
  open: boolean
  onClose: () => void
}

const AddSolutionModalProps = ({ open, onClose }: AddSolutionModalProps) => {
    const { t } = useTranslation()
    const { addSnackbar } = useContext(SnackbarContext)
    const { courseId } = useParams()
    const { topicId } = useParams()
    const getUser = usePersistedStore((state) => state.getUser)
    const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
    const [currentTopic, setCurrentTopic] = useState<RemoteTopics>()
    const [activeStep, setActiveStep] = useState<number>(0)
    const [selectedLearningElements, setSelectedLearningElements] = useState<{
        [key: number]: RemoteLearningElement[]
    }>({})
    const [selectedLearningElementsClassification, setSelectedLearningElementsClassification] = useState<{
        [key: number]: RemoteLearningElementWithClassification[]
    }>({})
    const [selectedSolutions, setSelectedSolutions] = useState<{ [key: number]: Solution[] }>({})
    const [learningElementsWithSolutions, setLearningElementsWithSolutions] = useState<{
        [key: number]: RemoteLearningElementWithSolution[]
    }>({})
    
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ padding: '2rem', width: '80%', margin: 'auto', marginTop: '5rem' }}>
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
                            {['Select Learning Elements', 'Select Classifications', 'Select Solutions'].map((label) => (
                                <Step key={label}>
                                    <StepButton onClick={() => setActiveStep(activeStep)}>{label}</StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    {activeStep === 0 && (
                        <CreateLearningElementsStep
                            courseId={courseId}
                            topicId={topicId}
                            selectedLearningElements={selectedLearningElements}
                            setSelectedLearningElements={setSelectedLearningElements}
                            setActiveStep={setActiveStep}
                        />
                    )}
                    {activeStep === 1 && (
                        <CreateLearningElementClassificationsStep
                            courseId={courseId}
                            topicId={topicId}
                            selectedLearningElementsClassification={selectedLearningElementsClassification}
                            setSelectedLearningElementsClassification={setSelectedLearningElementsClassification}
                            setActiveStep={setActiveStep}
                        />
                    )}
                    {activeStep === 2 && (
                        <CreateLearningElementSolutionStep
                            courseId={courseId}
                            topicId={topicId}
                            selectedSolutions={selectedSolutions}
                            setSelectedSolutions={setSelectedSolutions}
                            learningElementsWithSolutions={learningElementsWithSolutions}
                            setLearningElementsWithSolutions={setLearningElementsWithSolutions}
                        />
                    )}
                </Grid>
            </Box>
        </Modal>
    )
}
export default memo(AddSolutionModalProps)
    