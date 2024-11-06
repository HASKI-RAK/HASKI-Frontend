import { ChangeEvent, ReactNode, memo, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@common/components'
import { LearningElementWithClassification, SkeletonList } from '@components'
import { RemoteTopics } from '@core'
import { useCreateAlgorithmTable } from './CreateAlgorithmTable.hooks'

export type CreateAlgorithmTableNameProps = {
  topicName: string
  algorithmShortName: string
}

type CreateAlgorithmTableProps = {
  selectedTopics: RemoteTopics[]
  selectedLearningElementClassification: { [key: number]: LearningElementWithClassification[] }
  onAlgorithmChange: (selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }) => void
  selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }
  children?: ReactNode
}

const CreateAlgorithmTable = ({
  selectedTopics = [],
  selectedLearningElementClassification,
  onAlgorithmChange,
  selectedAlgorithms,
  children
}: CreateAlgorithmTableProps) => {
  // Hooks
  const { t } = useTranslation()
  const { handleAlgorithmChange } = useCreateAlgorithmTable({ selectedAlgorithms, onAlgorithmChange })

  // Constants
  const topicAlgorithmOptions = useMemo(() => {
    return t('components.AlgorithmSettingsModal.algorithms', {
      returnObjects: true
    }) as { name: string; description: string; key: string; disabled: boolean }[]
  }, [t])

  // Set initial algorithm
  useEffect(() => {
    selectedTopics.forEach((lmsTopic) => {
      if (!selectedAlgorithms[lmsTopic.topic_lms_id]) {
        handleAlgorithmChange(lmsTopic.topic_lms_id, lmsTopic.topic_lms_name, topicAlgorithmOptions[0].key)
      }
    })
  }, [selectedTopics, selectedAlgorithms, handleAlgorithmChange, topicAlgorithmOptions])

  // Return early if there are no selected topics
  if (selectedTopics.length === 0) {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid container direction="column" alignItems="center" sx={{ mt: '2rem' }}>
          <SkeletonList />
          {children}
        </Grid>
      </Grid>
    )
  }

  // Callback for rendering the algorithm card
  const algorithmCard = (lmsTopic: RemoteTopics) => {
    const getAlgorithmByKey = (key: string) => topicAlgorithmOptions.find((option) => option.key === key)

    // If no algorithm has been chosen yet, the default [0] algorithm is set
    const currentAlgorithm = getAlgorithmByKey(
      selectedAlgorithms[lmsTopic.topic_lms_id]?.algorithmShortName || topicAlgorithmOptions[0].key
    )

    const useHandleSelectChange = useCallback(
      (event: (Event & { target: { value: string; name: string } }) | ChangeEvent<HTMLInputElement>) => {
        handleAlgorithmChange(lmsTopic.topic_lms_id, lmsTopic.topic_lms_name, event.target.value as string)
      },
      [lmsTopic.topic_lms_id, lmsTopic.topic_lms_name, handleAlgorithmChange]
    )

    const hasLearningElementClassification = lmsTopic.topic_lms_id in selectedLearningElementClassification

    return (
      <Grid item container alignItems="center" direction="column" key={lmsTopic.topic_lms_id}>
        <Paper sx={{ padding: '1rem', width: '95%' }}>
          <Grid container alignItems="flex-start">
            <Grid item xs={4}>
              <Grid container direction="column">
                <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
                  <Grid container justifyContent="center">
                    <InputLabel
                      sx={{
                        mb: '1rem',
                        mt: '1rem',
                        wordBreak: 'break-word',
                        color: 'black'
                      }}>
                      {lmsTopic.topic_lms_name}
                    </InputLabel>
                  </Grid>
                </Box>
                <FormGroup>
                  <Select
                    value={currentAlgorithm?.key}
                    disabled={!hasLearningElementClassification}
                    onChange={useHandleSelectChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{ mt: '1rem', mb: '1rem' }}>
                    {topicAlgorithmOptions.map((option) => (
                      <MenuItem key={option.key} value={option.key} disabled={option.disabled}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormGroup>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <InputLabel shrink sx={{ ml: '0.75rem' }}>
                {t('components.AlgorithmSettingsModal.headerRight')}
              </InputLabel>
              <Typography id="create-algorithm-modal-description" variant="body1" component="p" sx={{ ml: '1rem' }}>
                {hasLearningElementClassification
                  ? currentAlgorithm?.description
                  : t('components.CreateAlgorithmTable.missingClassification')}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          Select algorithms
        </Typography>
      </Grid>
      {selectedTopics.map((lmsTopic) => algorithmCard(lmsTopic))}
      {children}
    </Grid>
  )
}
export default memo(CreateAlgorithmTable)
