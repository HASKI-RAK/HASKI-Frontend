import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs, Button, DatePicker, Grid, LocalizationProvider } from '@common/components'
import { ButtonGroup } from '@mui/material'

export interface DateRange {
  startDate: Dayjs
  endDate: Dayjs
}

type DateRangePickerProps = {
  startDate: Dayjs
  endDate: Dayjs
  onStartDateChange: (value: Dayjs) => void
  onEndDateChange: (value: Dayjs) => void
  showPresets?: boolean
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  showPresets = true
}: DateRangePickerProps) => {
  const { t } = useTranslation()

  const handlePresetClick = (days: number) => {
    const newEndDate = dayjs()
    const newStartDate = dayjs().subtract(days, 'day')
    onStartDateChange(newStartDate)
    onEndDateChange(newEndDate)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column" wrap="nowrap" sx={{ display: 'inline-flex', gap: 0.25 }}>
        <Grid item>
          <Grid container wrap="nowrap" alignItems="center" sx={{ gap: 0.25, mt: 1 }}>
            <Grid item sx={{ mr: 0.5 }}>
              <DatePicker
                label={t('Von')}
                value={startDate}
                onChange={(newValue) => onStartDateChange(newValue || dayjs())}
                slotProps={{ textField: { size: 'small', margin: 'none' } }}
                sx={{
                  width: 160,
                  '& .MuiInputLabel-root': {
                    color: (theme) => theme.palette.text.primary,
                    fontSize: '0.8rem'
                  },
                  '& .MuiOutlinedInput-input, & .MuiInputBase-input': {
                    fontSize: '0.8rem',
                    py: 0.25,
                    px: 0.75
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: (theme) => theme.palette.text.primary
                  }
                }}
                format="DD/MM/YYYY"
              />
            </Grid>
            <Grid item>
              <DatePicker
                label={t('Bis')}
                value={endDate}
                onChange={(newValue) => onEndDateChange(newValue || dayjs())}
                minDate={startDate}
                slotProps={{ textField: { size: 'small', margin: 'none' } }}
                sx={{
                  width: 160,
                  '& .MuiInputLabel-root': {
                    fontSize: '0.8rem'
                  },
                  '& .MuiOutlinedInput-input, & .MuiInputBase-input': {
                    fontSize: '0.8rem',
                    py: 0.25,
                    px: 0.75
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: (theme) => theme.palette.text.primary
                  }
                }}
                format="DD/MM/YYYY"
              />
            </Grid>
          </Grid>
        </Grid>

        {showPresets && (
          <Grid item>
            <Grid container justifyContent="center">
              <Grid item>
                <ButtonGroup
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiButton-root': {
                      px: 0.5,
                      py: 0.125,
                      minWidth: 'unset',
                      lineHeight: 1.2,
                      textTransform: 'none'
                    }
                  }}>
                  <Button onClick={() => handlePresetClick(7)}>{t('last7Days')}</Button>
                  <Button onClick={() => handlePresetClick(30)}>{t('last30Days')}</Button>
                  <Button onClick={() => handlePresetClick(90)}>{t('last90Days')}</Button>
                  <Button onClick={() => handlePresetClick(365)}>{t('lastYear')}</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </LocalizationProvider>
  )
}

export default memo(DateRangePicker)
