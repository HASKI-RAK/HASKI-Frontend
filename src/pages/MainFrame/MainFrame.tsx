import { Outlet, useParams } from 'react-router-dom'
import { Box, Divider, Grid } from '@common/components'
import { MenuBar, Footer, BreadcrumbsContainer, LocalNav, OpenQuestionnaire, PrivacyModal } from '@components'
import { useTheme, useMediaQuery } from '@common/hooks'

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

  // !! converts courseId to a boolean
  const renderMenuBar = !!courseId
  const renderLocalNav = !!courseId
  const theme = useTheme()
  const open = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {renderMenuBar ? <MenuBar courseSelected={true} /> : <MenuBar courseSelected={false} />}
        <BreadcrumbsContainer />
        <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
          {renderLocalNav && open && (
            <>
              <Grid item container sx={{ width: '26.5rem' }}>
                  <LocalNav />
              </Grid>
              <Divider flexItem orientation='vertical' />
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
