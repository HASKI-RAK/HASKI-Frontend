import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid } from '@common/components'
import { CreateLearningElementTable } from '@components'
import { RemoteLearningElement, RemoteTopics } from '@core'

type CreateLearningElementsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElements: { [key: number]: RemoteLearningElement[] }
  handleLearningElementChange: (selectedLearningElements: { [key: number]: RemoteLearningElement[] }) => void
  onNext: () => void
  onBack: () => void
}

const CreateLearningElementsStep: React.FC<CreateLearningElementsStepProps> = ({
  selectedTopics,
  selectedLearningElements,
  handleLearningElementChange,
  onNext,
  onBack
}) => {
  const { t } = useTranslation()

  return (
    <Grid container item>
      <CreateLearningElementTable
        selectedTopics={selectedTopics}
        onLearningElementChange={handleLearningElementChange}
        selectedLearningElements={selectedLearningElements}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedTopics.every((topic) => selectedLearningElements[topic.topic_lms_id]?.length > 0)}
              onClick={onNext}
              sx={{ mr: -2 }}>
              {t('appGlobal.next')}
            </Button>
          </Grid>
        </Box>
      </CreateLearningElementTable>
    </Grid>
  )
}

export default CreateLearningElementsStep
