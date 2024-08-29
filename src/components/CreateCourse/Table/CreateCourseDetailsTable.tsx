import { renderTimeViewClock } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Grid, TextField } from '@common/components'
import { RemoteCourse } from '@core'

type TableCourseDetailsProps = {
  remoteCourse: RemoteCourse | undefined
  datePickerValue: Dayjs | null
  setDatePickerValue: (value: Dayjs | null) => void
}

const CreateCourseDetailsTable = ({ remoteCourse, datePickerValue, setDatePickerValue }: TableCourseDetailsProps) => {
  const { t } = useTranslation()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            label={t('components.CreateCourseDetailsTable.courseName')}
            defaultValue={remoteCourse?.fullname}
            sx={{ width: '100%', mt: '1rem' }}
            required
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            label={t('components.CreateCourseDetailsTable.startDate')}
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
CreateCourseDetailsTable.displayName = 'TableCourseDetails'
export default CreateCourseDetailsTable
