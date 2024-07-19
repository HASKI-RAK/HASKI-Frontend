import { renderTimeViewClock } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
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

type TableCourseDetailsProps = {
  course: RemoteCourse | undefined
  datePickerValue: Dayjs | null
  setDatePickerValue: (value: Dayjs | null) => void
}

const TableCourseDetails = ({ course, datePickerValue, setDatePickerValue }: TableCourseDetailsProps) => {
  const [selected, setSelected] = useState(0)
  const [teacherselection, setteacherselection] = useState(0)
  const { t } = useTranslation()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column" spacing={3}>
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <TextField label="Kursname" defaultValue={course?.fullname} sx={{ width: '100%', mt: '1rem' }} required />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <DateTimePicker
            label="Startdatum"
            value={datePickerValue}
            onChange={setDatePickerValue}
            sx={{ width: '100%' }}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

// eslint-disable-next-line immutable/no-mutation
TableCourseDetails.displayName = 'TableCourseDetails'
export default TableCourseDetails
