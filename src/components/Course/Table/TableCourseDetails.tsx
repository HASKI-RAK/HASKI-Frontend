import { RemoteCourse } from '@core'
import { TextField, Grid, Typography, Select, MenuItem, InputLabel, FormControl } from '@common/components'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SelectChangeEvent } from '@mui/material'

const TableCourseDetails = ({ course }: { course: RemoteCourse | undefined }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [algorithm, setAlgorithm] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value as string)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid direction={'column'}>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 3 }}>
          <Typography>Kursname: </Typography>
          <TextField defaultValue={course?.fullname} sx={{ minWidth: '30rem' }}></TextField>
        </Grid>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 3 }}>
          <Typography>Startdatum: </Typography>
          <DatePicker label="Controlled picker" value={value} sx={{ minWidth: '30rem' }}></DatePicker>
        </Grid>
        <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 3 }}>
          <Typography>Algorithmus: </Typography>
          <FormControl>
            <InputLabel>Standard-Algorithmus</InputLabel>
            <Select value={algorithm} onChange={handleChange} sx={{ minWidth: '30rem' }} label={'StandardAlgorithmus'}>
              <MenuItem value={10}>Standard-Algorithmus</MenuItem>
              <MenuItem value={30}>Der Andere</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

// eslint-disable-next-line immutable/no-mutation
TableCourseDetails.displayName = 'TableCourseDetails'
export default TableCourseDetails