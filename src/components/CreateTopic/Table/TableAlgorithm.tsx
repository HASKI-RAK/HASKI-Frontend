import FormatAlignLeftIcon from '@mui/icons-material/ViewList'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@common/components'
import { SkeletonList } from '@components'
import { RemoteCourse } from '@core'
import RemoteLearningElement from '../../../core/RemoteLearningElement/RemoteLearningElement'
import RemoteTopic from '../../../core/RemoteTopic/RemoteTopic'
import { fetchRemoteCourses } from '../../../services/RemoteCourses'
import { fetchRemoteTopics } from '../../../services/RemoteTopics/fetchRemoteTopics'
import {
  StyledTableCell,
  StyledTableCellWithoutBorder,
  StyledTableRow
} from '../../Questionnaire/QuestionnaireResults/Table/QuestionnaireResultTableStyle'

type TableLearningElementProps = {
  lmsRemoteTopics?: RemoteTopic[]
}

const TableAlgorithm = memo(({ lmsRemoteTopics = [] }: TableLearningElementProps) => {
  const [LmsLearningElements, setLmsLearningElements] = useState<RemoteLearningElement[]>([])
  const [view, setView] = useState<string>('list')

  const [selected, setSelected] = useState(0)
  const [teacherselection, setteacherselection] = useState(0)
  const { t } = useTranslation()
  const options = [
    {
      name: 'Fixed Order',
      description: 'The learning elements are presented in a predetermined order.',
      key: 'fixed'
    },
    {
      name: 'Bayes',
      description:
        'Bayes is a probabilistic algorithm that calculates the learning path based on the probability for the best order for a learner.',
      key: 'bayes'
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
      key: 'genetic'
    },
    {
      name: 'Tyche',
      description:
        "Tyche is an algorithm based on the principle of luck. It is used to calculate the best learning path by taking into account the learners' luck factors.",
      key: 'tyche'
    }
  ]

  const [algorithm, setAlgorithm] = useState(options[0])
  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(parseInt(event.target.value))
    },
    [setSelected]
  )

  const handleAlgorithmChange = (event: any, newValue: any) => {
    setAlgorithm(newValue)
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {lmsRemoteTopics.length === 0 ? (
        <TableRow key={'TableTopicTableRow'}>
          <SkeletonList />
        </TableRow>
      ) : (
        <FormGroup>
          {lmsRemoteTopics.map((lmsLearningElementList) => (
            <div style={{ marginTop: '2rem' }}>
              <Divider />
              <Grid container direction="row" alignItems="center" key={lmsLearningElementList.topic_id} spacing={4}>
                <Grid item xs={2}>
                  <Typography>{lmsLearningElementList.topic_name}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    options={options}
                    getOptionLabel={(option) => option.name}
                    value={algorithm}
                    onChange={handleAlgorithmChange}
                    renderInput={(params) => <TextField {...params} label="Algorithmus" />}
                    sx={{ mt: '1rem', mr: '-1rem', ml: '-2rem' }}
                  />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mt: '2rem', ml: '3rem' }} />
                <Grid item xs={6}>
                  <Typography id="modal-description" variant="body1" component="p">
                    {algorithm.description}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          ))}
        </FormGroup>
      )}
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableAlgorithm.displayName = 'TableAlgorithm'
export default TableAlgorithm
