import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Drawer, Typography } from '@common/components'
import { SelectedRatingDashboard } from '@components'

/**
 * Props for the {@link RatingDashboardDrawer} component.
 */
type RatingDashboardDrawerProps = {
  /**
   * Whether the drawer is open or not.
   */
  isOpen: boolean
  /**
   * The currently selected dashboard.
   */
  selectedDashboard: SelectedRatingDashboard
}

const RatingDashboardDrawer = ({ isOpen, selectedDashboard }: RatingDashboardDrawerProps) => {
  // Hook
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
          <Typography variant="h5">{t(`components.${selectedDashboard}Info.dashboardTitle`)}</Typography>
          <Typography variant="body1">{t(`components.${selectedDashboard}Info.dashboardText`)}</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {t(`components.${selectedDashboard}Info.ratingTitle`)}
          </Typography>
          <Typography variant="body1">{t(`components.${selectedDashboard}Info.ratingText`)}</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {t(`components.${selectedDashboard}Info.spiderGraphTitle`)}
          </Typography>
          <Typography variant="body1">{t(`components.${selectedDashboard}Info.spiderGraphText`)}</Typography>
          {selectedDashboard == 'StudentRating' ? (
            <>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {t('components.StudentRatingInfo.histogramTitle')}
              </Typography>
              <Typography variant="body1">{t('components.StudentRatingInfo.histogramText')}</Typography>
            </>
          ) : null}
          <Typography variant="h5" sx={{ mt: 2 }}>
            {t(`components.${selectedDashboard}Info.lineGraphTitle`)}
          </Typography>
          <Typography variant="body1">{t(`components.${selectedDashboard}Info.lineGraphText`)}</Typography>
        </Box>
      )}
    </Drawer>
  )
}

/**
 * Drawer component for displaying details about the currently selected rating dashboard.
 *
 * Renders a retractable drawer that shows information based on the selected dashboard.
 *
 * @param props - See {@link RatingDashboardDrawerProps}.
 * @returns A drawer containing information about the selected dashboard.
 *
 * @example
 * ```tsx
 * <RatingDashboardDrawer
 *   isOpen={isOpen}
 *   selectedDashboard={selectedDashboard}
 * />
 * ```
 */
export default memo(RatingDashboardDrawer)
