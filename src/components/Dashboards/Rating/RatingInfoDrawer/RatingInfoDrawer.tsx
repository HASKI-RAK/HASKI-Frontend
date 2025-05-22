import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Drawer, Typography } from '@common/components'
import { SelectedRatingDashboard } from '@components'

/**
 * @prop isOpen - Whether the drawer is open or not.
 * @prop selectedDashboard - The currently selected dashboard.
 * @interface
 */
type RatingInfoDrawerProps = {
  isOpen: boolean
  selectedDashboard: SelectedRatingDashboard
}

// TODO: NUR RATINGDRAWER NENNEN?
/**
 * RatingInfoDrawer component.
 *
 * @param props - Props containing isOpen and selectedDashboard.
 *
 * @remarks
 * RatingInfoDrawer represents a component that displays information about the currently selected dashboard.
 * The drawer can be opened or closed.
 * Different information is displayed based on the selected dashboard.
 * RatingInfoDrawer can be used as a standalone component on a page.
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

export default memo(RatingInfoDrawer)
