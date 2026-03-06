import { memo, ReactNode } from 'react'
import { Box, MenuItem, Typography } from '@common/components'
import { alpha, Theme } from '@common/theme'

type DashboardListItemSlots = {
  icon?: ReactNode
  headerRight?: ReactNode
  footerLeft?: ReactNode
  footerRight?: ReactNode
}

export type DashboardListItemProps = {
  disabled?: boolean
  id?: number
  title?: string
  onClick?: () => void
  slots?: DashboardListItemSlots
}

const iconBoxSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  p: 1,
  border: '1px solid',
  borderColor: (theme: Theme) => alpha(theme.palette.text.primary, 0.25),
  borderRadius: 2,
  width: 40,
  height: 40,
  alignSelf: 'center'
}

const DashboardListItem = ({ title, onClick, slots, disabled = false }: DashboardListItemProps) => {
  const icon = slots?.icon ? <Box sx={iconBoxSx}>{slots.icon}</Box> : null
  const iconXs = slots?.icon ? <Box sx={{ ...iconBoxSx, alignSelf: 'center' }}>{slots.icon}</Box> : null

  const iconMd = slots?.icon ? (
    <Box
      sx={{
        ...iconBoxSx,
        gridColumn: '1 / 2',
        gridRow: '1 / 3',
        alignSelf: 'center',
        mr: 1
      }}>
      {slots.icon}
    </Box>
  ) : null

  return (
    <MenuItem
      divider
      disableRipple
      onClick={disabled ? undefined : onClick}
      sx={{
        width: '100%',
        position: 'relative',
        py: 2,
        display: 'block',
        cursor: disabled ? 'default' : 'pointer',
        opacity: 1,
        '&:hover': { backgroundColor: disabled ? 'transparent' : 'action.hover' },
        '&.Mui-focusVisible': { backgroundColor: disabled ? 'transparent' : undefined }
      }}>
      {/* Smaller Screens */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: 2,
          width: '100%',
          minWidth: 0
        }}>
        {iconXs}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%',
            minWidth: 0
          }}>
          <Typography variant="h5" noWrap>
            {title}
          </Typography>
          {slots?.headerRight && <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>{slots.headerRight}</Box>}
          {slots?.footerLeft && <Box sx={{ width: '100%', display: 'block' }}>{slots.footerLeft}</Box>}
          {slots?.footerRight && <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>{slots.footerRight}</Box>}
        </Box>
      </Box>

      {/* Larger Screens */}
      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          width: '100%',
          gap: 1,
          gridTemplateColumns: 'auto 1fr auto',
          gridTemplateRows: 'auto auto',
          alignItems: 'start',
          minWidth: 0
        }}>
        {iconMd}
        <Typography variant="h5" noWrap sx={{ gridColumn: '2 / 3', gridRow: '1 / 2', minWidth: 0 }}>
          {title}
        </Typography>

        <Box sx={{ gridColumn: '3 / 4', gridRow: '1 / 2', justifySelf: 'end' }}>{slots?.headerRight}</Box>

        <Box
          sx={{
            gridColumn: slots?.icon ? '2 / 4' : '1 / 4',
            gridRow: '2 / 3',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minWidth: 0
          }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>{slots?.footerLeft}</Box>
          <Box sx={{ flexShrink: 0 }}>{slots?.footerRight}</Box>
        </Box>
      </Box>
    </MenuItem>
  )
}

export default memo(DashboardListItem)
