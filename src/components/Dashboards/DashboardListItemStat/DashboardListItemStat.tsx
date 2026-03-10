import { memo, ReactNode } from 'react'
import { Box, Tooltip, Typography } from '@common/components'

type DashboardListItemStatProps = {
  icon?: ReactNode
  text?: ReactNode
  tooltip?: ReactNode
}

const DashboardListItemStat = ({ icon, text, tooltip }: DashboardListItemStatProps) => {
  return (
    <Box>
      <Tooltip arrow title={tooltip ? <Typography variant="body2">{tooltip}</Typography> : undefined}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography sx={{ lineHeight: 1, position: 'relative', top: '0.5px' }}>{text}</Typography>
        </Box>
      </Tooltip>
    </Box>
  )
}

export default memo(DashboardListItemStat)
