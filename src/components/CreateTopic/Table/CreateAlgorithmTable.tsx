import { ReactNode, memo, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@common/components'
import { LearningElementWithClassification, SkeletonList } from '@components'
import { RemoteTopic } from '@core'
import { useCreateAlgorithmTable } from './CreateAlgorithmTable.hooks'

export type CreateAlgorithmTableNameProps = {
  topicName: string
  algorithmShortName: string
}

type CreateAlgorithmTableProps = {
  selectedTopicsModal: RemoteTopic[]
  selectedLearningElementClassification: { [key: number]: LearningElementWithClassification[] }
  onAlgorithmChange: (selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps[] }) => void
  selectedAlgorithms: { [key: number]: CreateAlgorithmTableNameProps[] }
  children?: ReactNode
}

const CreateAlgorithmTable = memo(
  ({
    selectedTopicsModal = [],
    selectedLearningElementClassification,
    onAlgorithmChange,
    selectedAlgorithms,
    children
  }: CreateAlgorithmTableProps) => {
    const { t } = useTranslation()
    const { handleAlgorithmChange } = useCreateAlgorithmTable({ selectedAlgorithms, onAlgorithmChange })

    const topicAlgorithmOptions = useMemo(() => {
      return t('components.AlgorithmSettingsModal.algorithms', {
        returnObjects: true
      }) as [{ name: string; description: string; key: string; disabled: boolean }]
    }, [])

    // Set initial algorithm
    useEffect(() => {
      selectedTopicsModal.forEach((lmsTopic) => {
        if (!selectedAlgorithms[lmsTopic.topic_lms_id]) {
          handleAlgorithmChange(lmsTopic.topic_lms_id, lmsTopic.topic_lms_name, topicAlgorithmOptions[0].key)
        }
      })
    }, [selectedTopicsModal, selectedAlgorithms, handleAlgorithmChange])

    const algorithmCard = (lmsTopic: RemoteTopic) => {
      const getAlgorithmByKey = (key: string) => topicAlgorithmOptions.find((option) => option.key === key)

      //if no algorithm has been chosen yet, the default [0] algorithm is set
      const currentAlgorithm = getAlgorithmByKey(
        selectedAlgorithms[lmsTopic.topic_lms_id]?.[0]?.algorithmShortName || topicAlgorithmOptions[0].key
      )

      const hasLearningElementClassification =
        Object.keys(selectedLearningElementClassification).indexOf(lmsTopic.topic_lms_id.toString()) !== -1

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
                          whiteSpace: 'normal',
                          overflow: 'visible',
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
                      onChange={(event) =>
                        handleAlgorithmChange(
                          lmsTopic.topic_lms_id,
                          lmsTopic.topic_lms_name,
                          event.target.value as string
                        )
                      }
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
              <Grid item xs={7}>
                <InputLabel shrink sx={{ ml: '1rem' }}>
                  {t('components.AlgorithmSettingsModal.headerRight')}
                </InputLabel>
                <Typography id="modal-description" variant="body1" component="p" sx={{ ml: '2rem' }}>
                  {hasLearningElementClassification
                    ? currentAlgorithm?.description
                    : t('components.TableAlgorithm.missingClassification')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    }

    //return early
    if (selectedTopicsModal.length === 0) {
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
            Select algorithms
          </Typography>
        </Grid>
        {selectedTopicsModal.map((lmsTopic) => {
          return algorithmCard(lmsTopic)
        })}
        {children}
      </Grid>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
CreateAlgorithmTable.displayName = 'CreateAlgorithmTable'
export default CreateAlgorithmTable
