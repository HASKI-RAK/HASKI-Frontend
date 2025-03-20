import dayjs, { Dayjs } from 'dayjs'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  AdapterDayjs,
  DateTimePicker,
  Grid,
  LocalizationProvider,
  TextField,
  renderTimeViewClock
} from '@common/components'
import { RemoteCourse } from '@core'

type CreateCourseDetailsTableProps = {
  remoteCourse: RemoteCourse | undefined
  datePickerValue: Dayjs | null
  setDatePickerValue: (value: Dayjs) => void
}

const CreateCourseDetailsTable = ({
  remoteCourse,
  datePickerValue,
  setDatePickerValue
}: CreateCourseDetailsTableProps) => {
  //Hooks
  const { t } = useTranslation()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            label={t('components.CreateCourseDetailsTable.courseName')}
            id="create-course-modal-details-course-name"
            defaultValue={remoteCourse?.fullname}
            sx={{ width: '100%', mt: '1rem' }}
            required
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            label={t('components.CreateCourseDetailsTable.startDate')}
            value={datePickerValue}
            onChange={(newValue) => setDatePickerValue(newValue || dayjs())}
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

export default memo(CreateCourseDetailsTable)
