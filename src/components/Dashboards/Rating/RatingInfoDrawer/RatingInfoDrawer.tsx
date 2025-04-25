import { memo } from 'react'
import { Box, Drawer, Typography } from '@common/components'
import { useTranslation } from 'react-i18next'

/**
 * @prop isOpen - Whether the drawer is open or not.
 * @prop selectedDashboard - The currently selected dashboard.
 * @interface
 */
type RatingInfoDrawerProps = {
  isOpen: boolean
  selectedDashboard: 'StudentRatingDashboard' | 'LearningElementRatingDashboard' // TODO: Custom type
}

/**
 * RatingDashboardInfoDrawer component.
 * 
 * @param props - Props containing isOpen and selectedDashboard.
 * 
 * @remarks
 * RatingDashboardInfoDrawer represents a component that displays information about the currently selected dashboard.
 * The drawer can be opened or closed.
 * Different information is displayed based on the selected dashboard.
 * RatingDashboardInfoDrawer can be used as a standalone component on a page.
 * 
 * @category Components
 */
const RatingInfoDrawer = ({ isOpen, selectedDashboard }: RatingInfoDrawerProps) => {
  const { t } = useTranslation()
  
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
            <Typography variant ="h5">{t(`components.${selectedDashboard}.dashboardTitle`)}</Typography>
            <Typography variant ="body1">{t(`components.${selectedDashboard}.dashboardText`)}</Typography>
            <Typography variant ="h5" sx={{ mt: 2 }}>
                {t(`components.${selectedDashboard}.ratingTitle`)}
            </Typography>
            <Typography variant ="body1">{t(`components.${selectedDashboard}.ratingText`)}</Typography>
            <Typography variant ="h5" sx={{ mt: 2 }}>
                {t(`components.${selectedDashboard}.spiderGraphTitle`)}
            </Typography>
            <Typography variant ="body1">{t(`components.${selectedDashboard}.spiderGraphText`)}</Typography>
            {
            selectedDashboard == 'StudentRatingDashboard' ? (
                <>
                    <Typography variant ="h5" sx={{ mt: 2 }}>
                        {t('components.StudentRatingDashboard.histogramTitle')}
                    </Typography>
                    <Typography variant ="body1">{t('components.StudentRatingDashboard.histogramText')}</Typography>
                </>
            ) : null
            }
            <Typography variant ="h5" sx={{ mt: 2 }}>
                {t(`components.${selectedDashboard}.lineGraphTitle`)}
            </Typography>
            <Typography variant ="body1">{t(`components.${selectedDashboard}.lineGraphText`)}</Typography>
        </Box>
      )}
    </Drawer>
  )
}

export default memo(RatingInfoDrawer)
