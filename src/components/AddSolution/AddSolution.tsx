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
        setActiveStep={setActiveStep}
        onClose={handleClose}
      />
    </Grid>
  )
}

export default memo(CreateLearningElement)
