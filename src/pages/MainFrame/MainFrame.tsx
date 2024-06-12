import { Outlet, useParams } from 'react-router-dom'
import { Box, Divider, Grid } from '@common/components'
import { useMediaQuery, useTheme } from '@common/hooks'
import { BreadcrumbsContainer, Footer, LocalNavBar, MenuBar, OpenQuestionnaire, PrivacyModal } from '@components'

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
  const isLocalNavOpen = useMediaQuery(theme.breakpoints.up('lg')) && !!courseId

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MenuBar />
        <BreadcrumbsContainer />
        <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
          {isLocalNavOpen && (
            <>
              <Grid item container sx={{ width: '26.5rem' }}>
                <LocalNavBar />
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
    </>
  )
}

export default MainFrame
