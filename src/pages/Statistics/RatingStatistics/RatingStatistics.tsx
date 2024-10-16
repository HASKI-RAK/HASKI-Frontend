import { MouseEvent, memo, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@common/components'
import {
  DashboardInfoDrawer,
  DashboardInfoDrawerButton,
  LearningElementRatingDashboard,
  StudentRatingDashboard
} from '@components'
import { AuthContext } from '@services'

/**
 * # RatingStatistics page
 *
 * Displays the student rating and learning element rating dashboard.
 *
 * @remarks
 * The user can switch between both dashboard via ToggleButton.
 *
 * @example
 * ```tsx
 * <RatingStatistics />
 * ```
 */
const RatingStatistics = () => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string>('student')
  const [isOpen, setIsOpen] = useState(false)
  const { isAuth } = useContext(AuthContext)

  const handleChange = useCallback(
    (_: MouseEvent<HTMLElement>, newSelection: string | null) => {
      if (newSelection) setSelected(newSelection)
    },
    [setSelected]
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
            overflow: 'hidden'
          }}>
          <Grid container direction="column" alignItems="center" sx={{ mt: 5 }}>
            <Grid item>
              <ToggleButtonGroup value={selected} onChange={handleChange} exclusive>
                <ToggleButton value="student">{t('pages.RatingStatistics.studentRating')}</ToggleButton>
                <ToggleButton value="learningElement">{t('pages.RatingStatistics.learningElementRating')}</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid sx={{ mt: 5 }}>
              {selected === 'student' && <StudentRatingDashboard />}
              {selected === 'learningElement' && <LearningElementRatingDashboard />}
            </Grid>
          </Grid>
          <Box
            sx={{
              position: 'relative',
              mt: 1
            }}>
            <DashboardInfoDrawerButton isOpen={isOpen} setIsOpen={setIsOpen} />
            <DashboardInfoDrawer isOpen={isOpen} selectedDashboard={selected} />
          </Box>
        </Box>
      )}
    </>
  )
}

export default memo(RatingStatistics)
