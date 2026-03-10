import { memo, useCallback } from 'react'
import { Box, LinearProgress, Tooltip, Typography } from '@common/components'
import { alpha, Theme } from '@common/theme'

export type LabeledProgressBarProps = {
  current?: number | string
  tooltip?: string
  total?: number | string
  value?: number
}

const LabeledProgressBar = ({ current = 0, total = 0, value = 0, tooltip }: LabeledProgressBarProps) => {
  const getProgressColor = useCallback(
    (theme: Theme) => {
      if (value === 100) return theme.palette.success.main
      if (value >= 50) return theme.palette.warning.main
      return theme.palette.error.main
    },
    [value]
  )

  return (
    <Tooltip title={tooltip ? <Typography variant="body2">{tooltip}</Typography> : undefined} arrow>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          border: '1px solid',
          borderColor: (theme) => alpha(theme.palette.text.primary, 0.25),
          borderRadius: 9,
          p: '1px'
        }}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 18,
            borderRadius: 8,
            backgroundColor: 'grey.300',
            '& .MuiLinearProgress-bar': {
              borderRadius: 8,
              backgroundColor: (theme) => getProgressColor(theme)
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              transform: 'translateY(0.5px)'
            }}>
            {current} / {total}&nbsp;
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary', lineHeight: 1 }}>
              ({Math.round(value)}%)
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  )
}

export default memo(LabeledProgressBar)
