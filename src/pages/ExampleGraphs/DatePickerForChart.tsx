import { memo, useState } from 'react'
import { Box } from '@common/components'
import { DateRangePicker } from '@components'

import dayjs, { Dayjs } from 'dayjs'
import { DateRange } from '../../components/DateRangePicker'

type DatePickerForChartProps = {
  onDateRangeChange?: (dateRange: DateRange) => void
  initialStartDate?: Dayjs
  initialEndDate?: Dayjs
  showPresets?: boolean
  position?: {
    top?: string | number
    right?: string | number
    bottom?: string | number
    left?: string | number
  }
}

const DatePickerForChart = ({
  onDateRangeChange,
  initialStartDate = dayjs().subtract(30, 'day'),
  initialEndDate = dayjs(),
  showPresets = true,
  position = { top: 10, right: 10 }
}: DatePickerForChartProps) => {
  const [startDate, setStartDate] = useState<Dayjs>(initialStartDate)
  const [endDate, setEndDate] = useState<Dayjs>(initialEndDate)

  const handleStartDateChange = (newStartDate: Dayjs) => {
    setStartDate(newStartDate)
    onDateRangeChange?.({ startDate: newStartDate, endDate })
  }

  const handleEndDateChange = (newEndDate: Dayjs) => {
    setEndDate(newEndDate)
    onDateRangeChange?.({ startDate, endDate: newEndDate })
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        ...position,
        zIndex: 10,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 2,
        p: 1,
        overflow: 'hidden'
      }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        showPresets={showPresets}
      />
    </Box>
  )
}

export default memo(DatePickerForChart)
