import { memo, MouseEvent, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@common/components'
import {
  RatingDashboard,
  RatingInfoDrawer,
  RatingInfoDrawerButton,
  SelectedRatingDashboard,
  useLearningElementRatingDashboard,
  useStudentRatingDashboard
} from '@components'
import { AuthContext } from '@services'

/**
 * # Rating page
 *
 * Displays the student rating and learning element rating on dashboards.
 *
 * @remarks
 * The user can switch between both dashboard via ToggleButton.
 *
 * @example
 * ```tsx
 * <Rating />
 * ```
 */
const Rating = () => {
  const { t } = useTranslation()
  const [selectedDashboard, setSelectedDashboard] = useState<SelectedRatingDashboard>('StudentRating')
  const [isOpen, setIsOpen] = useState(true)
  const { isAuth } = useContext(AuthContext)

  const handleChange = useCallback(
    (_: MouseEvent<HTMLElement>, newSelection: SelectedRatingDashboard) => {
      if (newSelection) setSelectedDashboard(newSelection)
    },
    [setSelectedDashboard]
  )

  return (
    <>
      {isAuth && (
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
            <Grid sx={{ mt: 5 }} /** // TODO FIX THIS SHIT HERE SOMEHOW */>
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
            <RatingInfoDrawerButton isOpen={isOpen} setIsOpen={setIsOpen} /* // TODO: RatingDashboardDrawerButton?*/ />
            <RatingInfoDrawer
              isOpen={isOpen}
              selectedDashboard={selectedDashboard} /* // TODO: RatingDashboardDrawer?*/
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default memo(Rating)
