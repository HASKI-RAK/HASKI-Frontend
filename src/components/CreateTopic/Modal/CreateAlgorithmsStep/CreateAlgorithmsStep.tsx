import { Box, Button, CircularProgress, Grid, Typography } from '@common/components'
import { CreateAlgorithmTable, CreateAlgorithmTableNameProps } from '@components'
import { RemoteTopics } from '@core'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

type CreateAlgorithmsStepProps = {
  selectedTopics: RemoteTopics[]
  selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }
  handleAlgorithmChange: (algorithms: { [key: number]: CreateAlgorithmTableNameProps }) => void
  createTopicIsSending: boolean
  onBack: () => void
  onSubmit: () => Promise<void>
  successfullyCreatedTopicsCount: number
}

const CreateAlgorithmsStep = ({
  selectedTopics,
  selectedAlgorithms,
  handleAlgorithmChange,
  createTopicIsSending,
  onBack,
  onSubmit,
  successfullyCreatedTopicsCount
}: CreateAlgorithmsStepProps) => {
  const { t } = useTranslation()

  const isSubmitDisabled =
    !selectedTopics.every(
      (topic) =>
        selectedAlgorithms[topic.topic_lms_id] && selectedAlgorithms[topic.topic_lms_id].algorithmShortName !== ''
    ) || createTopicIsSending

  return (
    <Grid container item>
      <CreateAlgorithmTable
        selectedTopics={selectedTopics}
        onAlgorithmChange={handleAlgorithmChange}
        selectedAlgorithms={selectedAlgorithms}>
        <Box sx={{ padding: '1rem', width: '95%' }}>
          <Grid container item justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onBack} sx={{ ml: 1 }}>
              {t('appGlobal.back')}
            </Button>
            <Button variant="contained" color="primary" disabled={isSubmitDisabled} onClick={onSubmit} sx={{ mr: -2 }}>
              {createTopicIsSending ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={24} />
                  <Typography sx={{ ml: 1 }}>
                    {successfullyCreatedTopicsCount}/{Object.keys(selectedAlgorithms).length}
                  </Typography>
                </Box>
              ) : (
                t('components.CreateTopicModal.createTopics')
              )}
            </Button>
          </Grid>
        </Box>
      </CreateAlgorithmTable>
    </Grid>
  )
}

export default memo(CreateAlgorithmsStep)
