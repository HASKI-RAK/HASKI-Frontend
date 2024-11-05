import { memo } from 'react'
import { Box, Drawer } from '@common/components'
import { LearningElementRatingInfo, StudentRatingInfo } from '@components'

type DashboardInfoDrawerProps = {
  isOpen: boolean
  selectedDashboard: string
}

const DashboardInfoDrawer = ({ isOpen, selectedDashboard }: DashboardInfoDrawerProps) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
      sx={{
        width: isOpen ? '22.5rem' : 0,
        position: 'absolute',
        right: 0,
        [`& .MuiDrawer-paper`]: {
          width: isOpen ? '22.5rem' : 0,
          position: 'absolute',
          borderRadius: '0rem',
          border: 0,
          borderLeft: isOpen ? '1px solid #ccc' : 'none',
          boxShadow: isOpen ? '-5px 0px 10px rgba(0, 0, 0, 0.2)' : 'none',
          marginLeft: isOpen ? '5px' : '0',
          height: 'auto',
          overflowY: 'auto'
        }
      }}>
      {isOpen && (
        <Box sx={{ padding: '16px' }}>
          {selectedDashboard === 'student' ? <StudentRatingInfo /> : <LearningElementRatingInfo />}
        </Box>
      )}
    </Drawer>
  )
}

// eslint-disable-next-line immutable/no-mutation
DashboardInfoDrawer.displayName = 'DashboardInfoDrawer'
export default memo(DashboardInfoDrawer)
