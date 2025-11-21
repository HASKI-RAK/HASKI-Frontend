import { Outlet, useParams } from 'react-router-dom'
import { useCourseNavBar } from 'src/components/LocalNav/CourseNavBar/CourseNavBar.hooks'
import { useDashboardNavBar } from 'src/components/LocalNav/DashboardNavBar/DashboardNavBar.hooks'
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
  PrivacyModal
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

export const MainFrame = () => {
  const { courseId } = useParams()
  const theme = useTheme()
  const isLocalNavOpen = useMediaQuery(theme.breakpoints.up('lg')) && !!courseId // todo move into component
  // todo !!course, media query, dashboards in url?
  // todo determine the hook for the local nav based on the url and pass it to the local nav

  //

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
                <LocalNavBar useLocalNavBar={useCourseNavBar} />
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

export default MainFrame // todo memo
