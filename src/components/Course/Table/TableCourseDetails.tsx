import DefaultSave from '@mui/icons-material/Save'
import DefaultSchool from '@mui/icons-material/School'
import { FormControlLabel, SelectChangeEvent, Tooltip } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Divider,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@common/components'
import { Close } from '@common/icons'
import { RemoteCourse } from '@core'

type optionsType = {
  name: string
  description: string
  key: string
}[]

const TableCourseDetails = ({ course }: { course: RemoteCourse | undefined }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [algorithm, setAlgorithm] = useState('10')

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
  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(parseInt(event.target.value))
    },
    [setSelected]
  )

  const handleChange = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value as string)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column" spacing={3}>
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <TextField label="Kursname" defaultValue={course?.fullname} sx={{ width: '100%' }} />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <DatePicker label="Startdatum" value={value} onChange={setValue} sx={{ width: '100%' }} />
        </Grid>
        <Grid item container direction="row" alignItems="center" justifyContent="space-evenly">
          <Grid item xs={3}>
            <FormControl component="fieldset" sx={{ width: '100%', mt: 1 }}>
              <InputLabel shrink sx={{ ml: '-3rem' }}>
                Algorithmus
              </InputLabel>
              <RadioGroup onChange={handleSelect} value={selected} sx={{ mt: '1rem' }}>
                {options.map((option, index) => (
                  <Grid direction="row" key={option.key}>
                    <FormControlLabel
                      sx={{ width: { xl: '16rem' } }}
                      value={index}
                      control={<Radio role="radio-button" checked={index === selected} />}
                      label={option.name}
                    />
                    {teacherselection === index && (
                      <Tooltip
                        arrow
                        title={t('components.AlgorithmSettingsModal.teacherIconTip')}
                        data-testid="teacher-icon">
                        <DefaultSchool />
                      </Tooltip>
                    )}
                  </Grid>
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ mt: '1.5rem' }} />

          <Grid item xs={6}>
            <Typography id="modal-description" variant="body1" component="p">
              {options[selected].description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

// eslint-disable-next-line immutable/no-mutation
TableCourseDetails.displayName = 'TableCourseDetails'
export default TableCourseDetails
