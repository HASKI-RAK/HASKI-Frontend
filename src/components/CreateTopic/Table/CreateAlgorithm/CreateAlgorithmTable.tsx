import { memo, ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography
} from '@common/components'
import { SkeletonList } from '@components'
import { RemoteTopics } from '@core'

import { useCreateAlgorithmTable } from './CreateAlgorithmTable.hooks'


export type CreateAlgorithmTableNameProps = {
  topicName: string
  algorithmShortName: string
}

export type CreateAlgorithmTableProps = {
  selectedTopics: RemoteTopics[]
  onAlgorithmChange: (selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }) => void
  selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps }
  children?: ReactNode
}

export type topicAlgorithmOptionsType = {
  name: string
  description: string
  key: string
}[]

const CreateAlgorithmTable = ({
  selectedTopics,
  onAlgorithmChange,
  selectedAlgorithms,
  children
}: CreateAlgorithmTableProps) => {
  const { t } = useTranslation()
  const { handleAlgorithmChange } = useCreateAlgorithmTable({ selectedAlgorithms, onAlgorithmChange })

  // Memoized list of algorithm options from translations
  const topicAlgorithmOptions: topicAlgorithmOptionsType = useMemo(() => {
    return t('components.AlgorithmSettingsModal.algorithms', {
      returnObjects: true
    })
  }, [t])

  // Set initial algorithm for topics
  useEffect(() => {
    const updatedAlgorithms = selectedTopics.reduce((acc, lmsTopic) => {
      const existingAlgorithm = selectedAlgorithms[lmsTopic.topic_lms_id]

      return {
        ...acc,
        [lmsTopic.topic_lms_id]: existingAlgorithm ?? {
          topicName: lmsTopic.topic_lms_name,
          algorithmShortName: ''
        }
      }
    }, {})

    onAlgorithmChange(updatedAlgorithms)
  }, [selectedTopics])

  // Handle selection change for algorithm
  const handleSelectChange = useCallback(
    (lmsTopicId: number, lmsTopicName: string) => (event: SelectChangeEvent<unknown>) => {
      const { value } = event.target
      if (typeof value === 'string') {
        handleAlgorithmChange(lmsTopicId, lmsTopicName, value)
      }
    },
    [handleAlgorithmChange]
  )

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

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          {t('components.AlgorithmSettingsModal.selectAlgorithms')}
        </Typography>
      </Grid>
      {Object.entries(selectedAlgorithms).map(([key, value]) => {
        const topic = selectedTopics.find((topic) => topic.topic_lms_name === value.topicName) || selectedTopics[0]
        return (
          <Grid item container alignItems="center" direction="column" key={key}>
            <Paper sx={{ padding: '1rem', width: '95%' }}>
              <Grid container alignItems="flex-start">
                <Grid item xs={4}>
                  <Grid container direction="column">
                    <Box bgcolor={(theme) => theme.palette.info.light} borderRadius={3}>
                      <Grid container justifyContent="center">
                        <InputLabel
                          sx={{
                            m: '1rem',
                            wordBreak: 'break-word',
                            color: 'black'
                          }}>
                          {value.topicName}
                        </InputLabel>
                      </Grid>
                    </Box>
                    <FormControl sx={{ mt: 1.5 }}>
                      <InputLabel>{t('appGlobal.algorithm')}</InputLabel>
                      <Select
                        value={value.algorithmShortName}
                        onChange={handleSelectChange(topic.topic_lms_id, value.topicName)}
                        label={t('appGlobal.algorithm')}>
                        {topicAlgorithmOptions.map((option) => (
                          <MenuItem key={option.key} value={option.key}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <InputLabel shrink sx={{ ml: '0.75rem' }}>
                    {t('components.AlgorithmSettingsModal.headerRight')}
                  </InputLabel>
                  <Typography id="create-algorithm-modal-description" variant="body1" component="p" sx={{ ml: '1rem' }}>
                    {topicAlgorithmOptions.find((algorithm) => algorithm.key === value.algorithmShortName)
                      ?.description ?? t('components.CreateAlgorithmTable.initialAlgorithmDescription')}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      })}
      {children}
    </Grid>
  )
}

export default memo(CreateAlgorithmTable)
