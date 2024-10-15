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
        width: isOpen ? '22.5rem' : '0px',
        position: 'relative',
        transition: 'width 0.3s ease',
        height: '100%',
        [`& .MuiDrawer-paper`]: {
          maxWidth: '22.5rem',
          height: '100%',
          position: 'relative',
          borderRadius: '0rem',
          border: 0,
          backgroundColor: 'transparent',
          borderLeft: '1px solid #ccc',
          boxShadow: '-5px 0px 10px rgba(0, 0, 0, 0.2)',
          marginLeft: '5px'
        }
      }}>
      {isOpen && (
        <Box sx={{ padding: '16px' }}>
          {selectedDashboard == 'student' ? <StudentRatingInfo /> : <LearningElementRatingInfo />}
        </Box>
      )}
    </Drawer>
  )
}

export default DashboardInfoDrawer // TODO: Memo
