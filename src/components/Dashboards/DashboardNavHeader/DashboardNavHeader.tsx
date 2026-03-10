import { memo } from 'react'
import { ChevronRightRounded, KeyboardBackspaceRounded } from '@mui/icons-material' // todo: add to common icons
import { Box, Button, Tooltip, Typography } from '@common/components'

type DashboardNavHeaderProps = {
  backLabel?: string
  backTooltip?: string
  handleBack?: () => void
  title?: string
  subtitle?: string
  titleTooltip?: string
}

const DashboardNavHeader = ({
  backLabel,
  backTooltip,
  handleBack,
  title,
  subtitle,
  titleTooltip
}: DashboardNavHeaderProps) => {
  return (
    <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
      {backLabel && (
        <Tooltip title={backTooltip ? <Typography variant="body2">{backTooltip}</Typography> : undefined}>
          <Button
            startIcon={<KeyboardBackspaceRounded sx={{ fontSize: 18 }} />}
            onClick={handleBack}
            variant="text"
            sx={{
              mb: 1,
              ml: 0.5,
              px: 0.5,
              minHeight: 'auto',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}>
            {backLabel}
          </Button>
        </Tooltip>
      )}
      <Tooltip title={titleTooltip ? <Typography variant="body2">{titleTooltip}</Typography> : undefined}>
        <Typography variant="h4" noWrap sx={{ lineHeight: 1.2, display: 'flex', alignItems: 'baseline', minWidth: 0 }}>
          <Typography component="span" variant="inherit" noWrap sx={{ minWidth: 0 }}>
            {title ?? ''}
          </Typography>
          {subtitle && (
            <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'baseline', minWidth: 0 }}>
              <ChevronRightRounded
                sx={{
                  mx: 0.75,
                  fontSize: '1.5em',
                  color: 'text.disabled',
                  flexShrink: 0,
                  transform: 'translateY(2px)'
                }}
              />
              <Typography
                component="span"
                variant="h5"
                color="text.primary"
                sx={{ lineHeight: 1.2, flexShrink: 0, transform: 'translateY(-1px)' }}>
                {subtitle}
              </Typography>
            </Typography>
          )}
        </Typography>
      </Tooltip>
    </Box>
  )
}

export default memo(DashboardNavHeader)
