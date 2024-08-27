import { Box, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import type { LearningElementWithClassification } from '../Table/TableLearningElementClassification'

export type TableAlgorithmNameProps = {
  topicName: string
  algorithmShortName: string
}

type TableAlgorithmProps = {
  selectedTopicsModal: RemoteTopic[]
  selectedLearningElementClassification: { [key: number]: LearningElementWithClassification[] }
  onAlgorithmChange: (selectedAlgorithms: { [key: number]: TableAlgorithmNameProps[] }) => void
  selectedAlgorithms: { [key: number]: TableAlgorithmNameProps[] }
  children?: ReactNode
}

const TableAlgorithm = memo(
  ({
    selectedTopicsModal = [],
    selectedLearningElementClassification,
    onAlgorithmChange,
    selectedAlgorithms,
    children
  }: TableAlgorithmProps) => {
    const { t } = useTranslation()

    const topicAlgorithmOptions = useMemo(() => {
      return t('components.AlgorithmSettingsModal.algorithms', {
        returnObjects: true
      }) as [{ name: string; description: string; key: string; disabled: boolean }]
    }, [])

    const handleAlgorithmChange = useCallback(
      (topicId: number, topicName: string, newAlgorithm: string) => {
        const updatedAlgorithms = {
          ...selectedAlgorithms,
          [topicId]: [{ topicName: topicName, algorithmShortName: newAlgorithm }]
        }
        onAlgorithmChange(updatedAlgorithms)
      },
      [selectedAlgorithms, onAlgorithmChange]
    )

    // Set initial algorithm
    useEffect(() => {
      selectedTopicsModal.forEach((lmsTopic) => {
        if (!selectedAlgorithms[lmsTopic.topic_lms_id]) {
          handleAlgorithmChange(lmsTopic.topic_lms_id, lmsTopic.topic_lms_name, topicAlgorithmOptions[0].key)
        }
      })
    }, [selectedTopicsModal, selectedAlgorithms, handleAlgorithmChange])

    const getAlgorithmByKey = (key: string) => topicAlgorithmOptions.find((option) => option.key === key)

    const algorithmCard = (lmsTopic: RemoteTopic) => {
      //if no algorithm has been chosen yet, the default [0] algorithm appears
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
                  <Box bgcolor={'rgba(255,168,45,0.34)'} borderRadius={3}>
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
                  Description
                </InputLabel>
                <Typography id="modal-description" variant="body1" component="p" sx={{ ml: '2rem' }}>
                  {hasLearningElementClassification
                    ? currentAlgorithm?.description
                    : 'This topic will not be created. Please select learning element classifications to enable algorithm selection.'}
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
          <Grid item>
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Select a topic to set algorithm
            </Typography>
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
TableAlgorithm.displayName = 'TableAlgorithm'
export default TableAlgorithm
