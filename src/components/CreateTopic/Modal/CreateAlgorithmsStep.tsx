import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress, Grid } from '@common/components'
import { CreateAlgorithmTable } from '@components'
import { CreateAlgorithmTableNameProps } from '@components'
import { RemoteTopics } from '@core'
import { RemoteLearningElementWithClassification } from './CreateTopicModal'

type CreateAlgorithmsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElementsClassification: { [key: number]: RemoteLearningElementWithClassification[] }
  selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }
  handleAlgorithmChange: (algorithms: { [key: number]: CreateAlgorithmTableNameProps }) => void
  createTopicIsSending: boolean
  successTopicCreated: boolean
  onBack: () => void
  onSubmit: () => Promise<void>
}

const CreateAlgorithmsStep: React.FC<CreateAlgorithmsStepProps> = ({
  selectedTopics,
  selectedLearningElementsClassification,
  selectedAlgorithms,
  handleAlgorithmChange,
  createTopicIsSending,
  successTopicCreated,
  onBack,
  onSubmit
}) => {
  const { t } = useTranslation()

  const isSubmitDisabled =
    !selectedTopics.every(
      (topic) =>
        selectedAlgorithms[topic.topic_lms_id] && selectedAlgorithms[topic.topic_lms_id].algorithmShortName !== 'noKey'
    ) ||
    createTopicIsSending ||
    successTopicCreated

  return (
    <Grid container item>
      <CreateAlgorithmTable
        selectedTopics={selectedTopics}
        selectedLearningElementClassification={selectedLearningElementsClassification}
        onAlgorithmChange={handleAlgorithmChange}
        selectedAlgorithms={selectedAlgorithms}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button variant="contained" color="primary" disabled={isSubmitDisabled} onClick={onSubmit} sx={{ mr: -2 }}>
              {createTopicIsSending ? <CircularProgress size={24} /> : t('components.CreateTopicModal.createTopics')}
            </Button>
          </Grid>
        </Box>
      </CreateAlgorithmTable>
    </Grid>
  )
}

export default CreateAlgorithmsStep
