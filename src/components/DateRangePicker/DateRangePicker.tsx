import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs, Button, DatePicker, Grid, LocalizationProvider, Box } from '@common/components'
import { Theme } from '@common/theme'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

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

  const datePickerSx = {
    width: 145,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      border: '1.5px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      transition: 'all 0.2s ease-in-out',
      '& fieldset': {
        border: 'none'
      },
      '&:hover': {
        borderColor: 'primary.main',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      },
      '&.Mui-focused': {
        borderColor: 'primary.main',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }
    },
    '& .MuiInputLabel-root': {
      color: (theme: Theme) => theme.palette.text.secondary,
      fontSize: '0.7rem',
      fontWeight: 500
    },
    '& .MuiOutlinedInput-input, & .MuiInputBase-input': {
      fontSize: '0.7rem',
      py: 0.4,
      px: 1.2
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: (theme: Theme) => theme.palette.primary.main
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container direction="column" wrap="nowrap" sx={{ display: 'inline-flex', gap: 0.75 }}>
        <Grid item>
          <Grid container wrap="nowrap" alignItems="center" sx={{ gap: 0.5 }}>
            <Grid item>
              <DatePicker
                label={t('Von')}
                value={startDate}
                onChange={(newValue) => onStartDateChange(newValue || dayjs())}
                slotProps={{ textField: { size: 'small', margin: 'none' } }}
                sx={datePickerSx}
                format="DD/MM/YYYY"
              />
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 0.75
                }}>
                <ArrowForwardIcon
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                    opacity: 0.6
                  }}
                />
              </Box>
            </Grid>
            <Grid item>
              <DatePicker
                label={t('Bis')}
                value={endDate}
                onChange={(newValue) => onEndDateChange(newValue || dayjs())}
                minDate={startDate}
                slotProps={{ textField: { size: 'small', margin: 'none' } }}
                sx={datePickerSx}
                format="DD/MM/YYYY"
              />
            </Grid>
          </Grid>
        </Grid>

        {showPresets && (
          <Grid item>
            <Grid container justifyContent="center" sx={{ gap: 0.4 }}>
              {[
                { days: 7, label: '7d' },
                { days: 30, label: '30d' },
                { days: 90, label: '90d' },
                { days: 365, label: '1y' }
              ].map(({ days, label }) => (
                <Grid item key={days}>
                  <Button
                    onClick={() => handlePresetClick(days)}
                    variant="outlined"
                    disableRipple
                    sx={{
                      px: 1,
                      py: 0.3,
                      minWidth: '45px',
                      height: '24px',
                      borderRadius: 2.5,
                      textTransform: 'none',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      lineHeight: 1,
                      border: '1.5px solid',
                      borderColor: 'divider',
                      color: 'text.secondary',
                      bgcolor: 'background.paper',
                      boxShadow: 'none',
                      transition: 'all 0.2s ease-in-out',
                      textDecoration: 'none',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: 'none',
                        textDecoration: 'none'
                      },
                      '&:active': {
                        boxShadow: 'none'
                      }
                    }}>
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </LocalizationProvider>
  )
}

export default memo(DateRangePicker)
