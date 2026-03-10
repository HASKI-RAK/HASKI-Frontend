import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs, Box,Button, DatePicker, Grid, LocalizationProvider } from '@common/components'
import { Theme } from '@common/theme'

export interface DateRange {
  startDate: Dayjs
  endDate: Dayjs
}

type DateRangePickerProps = {
  startDate: Dayjs
  endDate: Dayjs
  onStartDateChange: (value: Dayjs) => void
  onEndDateChange: (value: Dayjs) => void
  showButtons?: boolean
}

/* ---------- Semester helper ---------- */
const getLastSemesterStart = (today = dayjs()): Dayjs => {
  const year = today.year()
  const march = dayjs(`${year}-03-01`)
  const october = dayjs(`${year}-10-01`)

  if (today.isBefore(march)) return dayjs(`${year - 1}-10-01`)
  if (today.isBefore(october)) return march
  return october
}

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  showButtons = true
}: DateRangePickerProps) => {
  const { t } = useTranslation()

  const handleDaysPreset = (days: number) => {
    onStartDateChange(dayjs().subtract(days, 'day'))
    onEndDateChange(dayjs())
  }

  const handleSemesterPreset = () => {
    onStartDateChange(getLastSemesterStart())
    onEndDateChange(dayjs())
  }

  const presets = [
    { days: 7, label: '7d' },
    { days: 14, label: '14d' },
    { days: 30, label: '30d' },
    { days: 365, label: 'Semester' }
  ]

  // ⬆️ bump these if you want even larger text
  const FONT_INPUT = '1.05rem'
  const FONT_LABEL = '1.20rem'
  const FONT_BUTTON = '1.05rem'
  const FONT_ARROW = '2rem'

  const datePickerSx = {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      border: '1.5px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      transition: 'all 0.2s ease-in-out',
      '& fieldset': { border: 'none' },
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
      color: (theme: Theme) => theme.palette.text.primary,
      fontSize: FONT_LABEL,
      fontWeight: 500,

      // ✅ move the label up (non-shrunk state)
      transform: 'translate(14px, -8px) scale(1)',

      // ✅ move the label up when shrunk (focused / has value)
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -15px) scale(0.85)'
      }
    },
    '& .MuiOutlinedInput-input, & .MuiInputBase-input': {
      fontSize: FONT_INPUT,
      py: 0.6,
      px: 1.2
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: (theme: Theme) => theme.palette.primary.main
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container alignItems="center" wrap="nowrap" sx={{ display: 'inline-flex', gap: 0.75 }}>
        <Grid item sx={{ display: 'flex', gap: 0.5, flex: 1, minWidth: 0 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <DatePicker
              label={t('Von')}
              value={startDate}
              onChange={(newValue) => onStartDateChange(newValue || dayjs())}
              slotProps={{ textField: { size: 'small', margin: 'none' } }}
              sx={datePickerSx}
              format="DD/MM/YYYY"
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
            <ArrowForwardIcon sx={{ fontSize: FONT_ARROW, color: 'text.primary', opacity: 0.6 }} />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <DatePicker
              label={t('Bis')}
              value={endDate}
              onChange={(newValue) => onEndDateChange(newValue || dayjs())}
              minDate={startDate}
              slotProps={{ textField: { size: 'small', margin: 'none' } }}
              sx={datePickerSx}
              format="DD/MM/YYYY"
            />
          </Box>
        </Grid>

        {showButtons && (
          <Grid
            item
            sx={{
              ml: 'auto',
              pt: 0.5,
              display: 'flex',
              gap: 0.4
            }}>
            {presets.map(({ days, label }) => (
              <Button
                key={label}
                onClick={() => (label === 'Semester' ? handleSemesterPreset() : handleDaysPreset(days))}
                variant="outlined"
                disableRipple
                sx={{
                  px: 1,
                  minWidth: label === 'Semester' ? 70 : 45,
                  height: '28px', // a bit taller so bigger text fits nicely
                  borderRadius: 2.5,
                  textTransform: 'none',
                  fontSize: FONT_BUTTON,
                  fontWeight: 500,
                  lineHeight: 1,
                  border: '1.5px solid',
                  borderColor: 'divider',
                  color: 'text.primary',
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
            ))}
          </Grid>
        )}
      </Grid>
    </LocalizationProvider>
  )
}

export default memo(DateRangePicker)
