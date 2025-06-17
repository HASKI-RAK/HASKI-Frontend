import { Dispatch, SetStateAction, memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Box, Fab, Grid, Modal, Step, StepButton, Stepper } from '@common/components'
import { Close } from '@common/icons'
import {
  RemoteLearningElementWithClassification,
  handleError
} from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { RemoteLearningElementWithSolution, Solution } from '../CreateTopic/Modal/CreateTopicModal/CreateTopicModal'
import CreateLearningElementSolutionStep from '../CreateTopic/Modal/CreateLearningElementSolutionsStep/CreateLearningElementSolutionStep'
import SelectLearningElementStep from './SelectLearningElementStep/SelectLearningElementStep'

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
                        <SelectLearningElementStep
                            selectedTopics={[]}
                            selectedLearningElements={selectedLearningElements}
                            selectedSolutions={selectedSolutions}
                            learningElementsWithSolution={learningElementsWithSolutions}
                            setSelectedLearningElements={setSelectedLearningElements}
                            onNext={() => setActiveStep(1)}
                        />
                    )}
                    {activeStep === 2 && (
                        <CreateLearningElementSolutionStep
                            selectedTopics={[]}
                            selectedSolutions={selectedSolutions}
                            LearningElementsClassification={selectedLearningElements}
                            learningElementsWithSolutions={learningElementsWithSolutions}
                            onLearningElementSolutionChange={setLearningElementsWithSolutions}
                            onNext={() => {
                                // Handle next step logic here
                                onClose()
                            }}
                            onBack={() => setActiveStep(1)}
                            nextButtonText={t('appGlobal.next')}
                        />
                    )}
                </Grid>
            </Box>
        </Modal>
    )
}
export default memo(AddSolutionModalProps)
    