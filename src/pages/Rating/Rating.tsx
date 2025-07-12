import { memo, MouseEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@common/components'
import {
  RatingDashboard,
  RatingDashboardDrawer,
  RatingDashboardDrawerButton,
  SelectedRatingDashboard,
  useLearningElementRatingDashboard,
  useStudentRatingDashboard
} from '@components'

const Rating = () => {
  // Hooks
  const { t } = useTranslation()
  const [selectedDashboard, setSelectedDashboard] = useState<SelectedRatingDashboard>('StudentRating')

  // State
  /**
   * Local state to track whether the drawer is open or not.
   */
  const [isOpen, setIsOpen] = useState(true)

  // Function
  /**
   * Handles the change of the selected dashboard.
   *
   * @param _ - The mouse event that triggered the change.
   * @param newDashboard - The newly selected rating dashboard.
   */
  const handleChange = useCallback(
    (_: MouseEvent<HTMLElement>, newDashboard: SelectedRatingDashboard) => {
      setSelectedDashboard(newDashboard)
    },
    [setSelectedDashboard]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        overflow: 'hidden',
        px: 2
      }}>
      <Grid container direction="column" alignItems="center" sx={{ mt: 5, width: '100%' }}>
        <Grid item>
          <ToggleButtonGroup value={selectedDashboard} onChange={handleChange} exclusive>
            <ToggleButton value="StudentRating">{t('pages.rating.studentRating')}</ToggleButton>
            <ToggleButton value="LearningElementRating">{t('pages.rating.learningElementRating')}</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid sx={{ mt: 5 }}>
          {selectedDashboard === 'StudentRating' && (
            <RatingDashboard selectedDashboard={selectedDashboard} useRatingDashboard={useStudentRatingDashboard} />
          )}
          {selectedDashboard === 'LearningElementRating' && (
            <RatingDashboard
              selectedDashboard={selectedDashboard}
              useRatingDashboard={useLearningElementRatingDashboard}
            />
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'relative',
          mt: 1
        }}>
        <RatingDashboardDrawerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <RatingDashboardDrawer isOpen={isOpen} selectedDashboard={selectedDashboard} />
      </Box>
    </Box>
  )
}

/**
 * Rating page for displaying student and learning element rating dashboards.
 *
 * Shows the rating dashboards, a drawer for additional information,
 * and a button to switch between student and learning element rating dashboards.
 *
 * @returns The rating page.
 *
 * @example
 * ```tsx
 * <Rating />
 * ```
 */
export default memo(Rating)
