import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementClassificationTable, RemoteLearningElementWithClassification } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'
import { Solution } from '../CreateTopicModal/CreateTopicModal'

type CreateLearningElementClassificationsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  handleLearningElementClassification: (classification: {
    [key: number]: RemoteLearningElementWithClassification[]
  }) => void
  selectedSolutions: { [key: number]: Solution[] }
  onSolutionChange: (selectedSolutions: { [key: number]: Solution[] }) => void
  onNext: () => void
  onBack: () => void
  nextButtonText: string
}

const CreateLearningElementClassificationsStep = ({
  selectedTopics,
  selectedLearningElements,
  selectedLearningElementsClassification,
  handleLearningElementClassification,
  selectedSolutions,
  onSolutionChange,
  onNext,
  onBack,
  nextButtonText
}: CreateLearningElementClassificationsStepProps) => {
  const { t } = useTranslation()
  const [isNextDisabled, setIsNextDisabled] = useState(false)

  const handleNextClick = () => {
    setIsNextDisabled(true)
    onNext()
    setTimeout(() => {
      setIsNextDisabled(false)
    }, 1000)
  }

  return (
    <Grid container item>
      <CreateLearningElementClassificationTable
        selectedTopics={selectedTopics}
        selectedLearningElements={selectedLearningElements}
        LearningElementsClassification={selectedLearningElementsClassification}
        onLearningElementChange={handleLearningElementClassification}
        selectedSolutions={selectedSolutions}
        onSolutionChange={onSolutionChange}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={
                !selectedTopics.every((topic) =>
                  selectedLearningElementsClassification[topic.topic_lms_id]?.every(
                    (el) => el.classification !== '' || el.disabled
                  )
                ) || isNextDisabled
              }
              onClick={handleNextClick}
              sx={{ mr: -2 }}>
              {nextButtonText}
            </Button>
          </Grid>
        </Box>
      </CreateLearningElementClassificationTable>
    </Grid>
  )
}

export default memo(CreateLearningElementClassificationsStep)
