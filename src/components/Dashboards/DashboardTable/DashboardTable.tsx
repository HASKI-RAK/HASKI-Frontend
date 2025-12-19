// todo fetch course data of current student
// todo different hooks to change data?

import { Box, List, ListItem, ListItemButton, MenuItem, MenuList, Tooltip, Typography } from '@mui/material'
import { ClockIcon } from '@mui/x-date-pickers'

type DashboardTableItemProps = {
  name: string
  score: number
  maxScore: number
  progress: number
  avgTime: number
  avgScore: number
  doneDate: number
  attempts: number
  maxAttempts: number
  watchDate: number
  finishedStudents: number
  studentCount: number
  done: boolean
}

type P = {
  icon?: any
  text?: any
  tooltip?: any
}

const DashboardTableItemProperty = ({ icon, text, tooltip }: P) => {
  // fraction?
  return (
    <Box>
      <Tooltip title={tooltip ?? ''}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon} <Typography>{text}</Typography>
        </Box>
      </Tooltip>
    </Box>
  )
}
// ToggleButton für Lernelemente auf unterster Ebene?
const DashboardTableItem = () => {
  return (
    <MenuItem
      divider
      sx={{ width: '100%', position: 'relative', minHeight: 72, py: { xs: 1.5, md: 0 }, pt: { md: 5 }, pb: { md: 5 } }}>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 1, width: '100%' }}>
        <Typography variant="h5" noWrap>
          TITLE
        </Typography>
        <DashboardTableItemProperty icon={<ClockIcon />} text="Top Right" />
        <DashboardTableItemProperty icon={<ClockIcon />} text="Bottom Left" />
        <DashboardTableItemProperty icon={<ClockIcon />} text="Bottom Right" />
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: '100%',
          height: '100%'
        }}>
        <Typography variant="h5" sx={{ position: 'absolute', top: 8, left: 12 }} noWrap>
          TITLE
        </Typography>
        <Box sx={{ position: 'absolute', top: 8, right: 12 }}>
          <DashboardTableItemProperty icon={<ClockIcon />} text="Top Right" />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 8, left: 12 }}>
          <DashboardTableItemProperty icon={<ClockIcon />} text="Bottom Left" />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 8, right: 12 }}>
          <DashboardTableItemProperty icon={<ClockIcon />} text="Bottom Right" />
        </Box>
      </Box>
    </MenuItem>
  )
}

const DashboardTable = () => {
  return (
    <MenuList sx={{ width: '100%', p: 0 }}>
      <DashboardTableItem />
      <DashboardTableItem />
      <DashboardTableItem />
      <DashboardTableItem />
      <DashboardTableItem />
      <DashboardTableItem />
    </MenuList>
  )
}

export default DashboardTable
