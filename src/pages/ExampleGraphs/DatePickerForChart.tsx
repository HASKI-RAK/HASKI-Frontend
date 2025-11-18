import { memo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box } from '@common/components'
import DateRangePicker from '../../components/DateRangePicker/DateRangePicker'

const DatePickerForChart = () => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(7, 'day'))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs())
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: -50,
        zIndex: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 0.5,
        backgroundColor: 'background.paper',
        display: 'inline-flex',
        width: 'fit-content',
        overflow: 'hidden'
      }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        showPresets={true}
      />
    </Box>
  )
}

export default memo(DatePickerForChart)
