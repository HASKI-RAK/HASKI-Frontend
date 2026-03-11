import { memo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Box } from '@common/components'
import { DateRangePicker } from '@components'
import { DateRange } from '../../components/DateRangePicker'

type DatePickerForChartProps = {
  onDateRangeChange?: (dateRange: DateRange) => void
  initialStartDate?: Dayjs
  initialEndDate?: Dayjs
  showPresets?: boolean
  width?: number | string
  height?: number | string
  disabled?: boolean
  position?: {
    top?: string | number
    right?: string | number
    bottom?: string | number
    left?: string | number
  }
}

const DatePickerForChart = ({
  onDateRangeChange,
  initialStartDate = dayjs().subtract(3, 'year'),
  initialEndDate = dayjs(),
  showPresets = true,
  width = 'auto',
  height = 'auto',
  disabled = false,
  position
}: DatePickerForChartProps) => {
  const [startDate, setStartDate] = useState<Dayjs>(initialStartDate)
  const [endDate, setEndDate] = useState<Dayjs>(initialEndDate)

  const handleStartDateChange = (newStartDate: Dayjs) => {
    if (disabled) return
    setStartDate(newStartDate)
    onDateRangeChange?.({ startDate: newStartDate, endDate })
  }

  const handleEndDateChange = (newEndDate: Dayjs) => {
    if (disabled) return
    setEndDate(newEndDate)
    onDateRangeChange?.({ startDate, endDate: newEndDate })
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        ...position,
        zIndex: 10,
        p: 1.25,
        overflow: 'hidden',
        opacity: disabled ? 0.45 : 1,
        filter: disabled ? 'grayscale(0.4)' : 'none',
        pointerEvents: disabled ? 'none' : 'auto'
      }}>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        showButtons={showPresets}
      />
    </Box>
  )
}

export default memo(DatePickerForChart)
