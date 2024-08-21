import { Box, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { ReactNode, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'

type TableAlgorithmProps = {
  selectedTopicsModal: RemoteTopic[]
  onAlgorithmChange: (selectedAlgorithms: [number, string, string][]) => void
  selectedAlgorithms: [number, string, string][]
  children?: ReactNode
}

const TableAlgorithm = memo(
  ({ selectedTopicsModal = [], onAlgorithmChange, selectedAlgorithms, children }: TableAlgorithmProps) => {
    const { t } = useTranslation()

    const options = [
      {
        name: 'Fixed Order',
        description: 'The learning elements are presented in a predetermined order.',
        key: 'default'
      },
      {
        name: 'Graf',
        description:
          'This algorithm is based on the learning adaptive mechanism by Graf et al. It calculates the learning path based on the learning style of the learner.',
        key: 'graf'
      },
      {
        name: 'ACO',
        description:
          'The Ant Colony Algorithm (ACO) is inspired by the behavior of ant workers. It calculates the learning path by simulating ants who leave behind pheromones to mark the best path.',
        key: 'aco'
      },
      {
        name: 'Genetic Algorithm',
        description:
          'The Genetic Algorithm is inspired by evolution. It approximates the best learning path by simulating the process of mutation and selection. It is often used for its speed.',
        key: 'ga'
      },
      {
        name: 'Tyche',
        description:
          "Tyche is an algorithm based on the principle of luck. It is used to calculate the best learning path by taking into account the learners' luck factors.",
        key: 'tyche'
      }
    ]

    const [algorithmValues, setAlgorithmValues] = useState<[number, string, string][]>(selectedAlgorithms)

    const handleAlgorithmChange = (topicId: number, topicName: string, newAlgorithm: string) => {
      const newValues: [number, string, string][] = [
        ...algorithmValues.filter((item) => item[0] !== topicId),
        [topicId, topicName, newAlgorithm]
      ]
      setAlgorithmValues(newValues)
      onAlgorithmChange(newValues)
    }

    const getAlgorithmByKey = (key: string) => options.find((option) => option.key === key)

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
        {selectedTopicsModal.length === 0 ? (
          <Grid item>
            <Typography variant="h6" sx={{ mt: '1rem' }}>
              Select a topic to set algorithm
            </Typography>
            {children}
          </Grid>
        ) : (
          <>
            <Grid item>
              <Typography variant="h6" sx={{ mt: '1rem' }}>
                Select algorithms
              </Typography>
            </Grid>
            {selectedTopicsModal.map((lmsTopic) => {
              const currentAlgorithmKey =
                algorithmValues.find((item) => item[0] === lmsTopic.topic_lms_id)?.[2] || options[0].key
              const currentAlgorithm = getAlgorithmByKey(currentAlgorithmKey)

              return (
                <Grid item container alignItems="center" justifyContent="center" direction="column">
                  <Paper sx={{ padding: '1rem', width: '95%' }}>
                    <Grid container direction="row" alignItems="flex-start">
                      <Grid item xs={4}>
                        <Grid container direction="column">
                          <Box bgcolor={'rgba(255,168,45,0.34)'} borderRadius={3}>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
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
                              value={currentAlgorithmKey}
                              onChange={(event) =>
                                handleAlgorithmChange(
                                  lmsTopic.topic_lms_id,
                                  lmsTopic.topic_lms_name,
                                  event.target.value as string
                                )
                              }
                              inputProps={{ 'aria-label': 'Without label' }}
                              sx={{ mt: '1rem', mb: '1rem' }}>
                              {options.map((option) => (
                                <MenuItem key={option.key} value={option.key}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormGroup>
                        </Grid>
                      </Grid>
                      <Grid item xs={7} container>
                        <InputLabel shrink sx={{ ml: '1rem' }}>
                          Description
                        </InputLabel>
                        <Typography id="modal-description" variant="body1" component="p" sx={{ ml: '2rem' }}>
                          {currentAlgorithm?.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )
            })}
            {children}
          </>
        )}
      </Grid>
    )
  }
)

TableAlgorithm.displayName = 'TableAlgorithm'
export default TableAlgorithm
