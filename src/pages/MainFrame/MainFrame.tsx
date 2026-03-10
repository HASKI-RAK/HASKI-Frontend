import { memo } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { Box, Divider, Grid } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import {
  BreadcrumbsContainer,
  Footer,
  LocalNavBar,
  MenuBar,
  Newsbanner,
  OpenCreateDefaultLearningPath,
  OpenQuestionnaire,
  PrivacyModal,
  useCourseNavBar,
  useDashboardNavBar
} from '@components'

/**
 * # MainFrame Page
 * Wraps the application in a frame with a menu bar, breadcrumbs, local navigation and footer.
 * @remarks
 * Used in {@link pages.App | App} component.
 * Here the other pages get rendered. This is done by the {@link Outlet} component.
 *
 * The footer is also included.
 *
 * It holds a layout for all pages.
 * Help, Global settings and User settings are also included in the menu bar.
 *
 * @category Pages
 */

const MainFrame = () => {
  const theme = useTheme()
  const { courseId } = useParams()
  const { pathname } = useLocation()

  const isDashboardOpen =
    pathname.startsWith('/scoreboard') ||
    pathname.startsWith('/rating') ||
    pathname.startsWith('/learnercharacteristics') ||
    pathname.startsWith('/leaderboard')
  const isCourseOpen = !!courseId
  const isLocalNavOpen = useMediaQuery(theme.breakpoints.up('lg')) && (isDashboardOpen || isCourseOpen)

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: theme.palette.background.default
        })}>
        <MenuBar />
        <Newsbanner />
        <BreadcrumbsContainer />
        <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
          {isLocalNavOpen && (
            <>
              <Grid item container sx={{ width: '26.5rem' }}>
                <LocalNavBar
                  key={isDashboardOpen ? 'dashboard-nav-bar' : 'course-nav-bar'}
                  useLocalNavBar={isDashboardOpen ? useDashboardNavBar : useCourseNavBar}
                />
              </Grid>
              <Divider flexItem orientation="vertical" />
            </>
          )}
          <Grid item sx={{ flex: 1, overflow: 'auto' }}>
            <Outlet />
          </Grid>
        </Grid>
        <Footer />
      </Box>
      <PrivacyModal />
      <OpenQuestionnaire />
      <OpenCreateDefaultLearningPath />
    </>
  )
}

export default memo(MainFrame)
