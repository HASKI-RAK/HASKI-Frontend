import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import {
  AdapterDayjs,
  DateTimePicker,
  Grid,
  LocalizationProvider,
  renderTimeViewClock,
  TextField
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
            color="primary"
            defaultValue={remoteCourse?.fullname}
            sx={{
              width: '100%',
              mt: '1rem',
              '& .MuiInputLabel-root': {
                color: (theme) => theme.palette.text.primary
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: (theme) => theme.palette.text.primary
              }
            }}
            required
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            label={t('components.CreateCourseDetailsTable.startDate')}
            value={datePickerValue}
            onChange={(newValue) => setDatePickerValue(newValue || dayjs())}
            sx={{
              width: '100%',
              '& .MuiInputLabel-root': {
                color: (theme) => theme.palette.text.primary
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: (theme) => theme.palette.text.primary
              }
            }}
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
