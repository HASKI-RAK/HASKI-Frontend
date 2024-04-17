import { Outlet, useParams } from 'react-router-dom'
import { Box, Divider, Drawer, Stack, Grid } from '@common/components'
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
  const theme = useTheme();
  const open = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <>
      <Grid container direction="column" sx={{ minHeight: 'inherit' }}>
        {renderMenuBar ? <MenuBar courseSelected={true} /> : <MenuBar courseSelected={false} />}
        <BreadcrumbsContainer />
        <Grid flex={1} container sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <Grid container item flexGrow={1} sx={{ alignItems: 'stretch' }}>
            <Grid item sx={{ width: renderLocalNav && open ? '26.5rem' : '0rem' }}>
              {/* Set the xs value to 0 if LocalNav is not rendered.
                             xs is how much screen i want to reserve for this component */}
              {renderLocalNav && open && ( // Render the LocalNav if courseId exists
                <Box
                  height={'100%'}
                  sx={{
                    display: 'flex',
                    width: '26.5rem',
                  }}
                >
                  <Drawer
                    variant="persistent"
                    anchor='left'
                    open={open}
                    sx={{
                      width: '100%',
                      height: '100%',
                      [`& .MuiDrawer-paper`]: {
                        top: '6rem',
                        maxWidth: '26.5rem',
                        position: 'absolute',
                        maxHeight: 'calc(100% - 12rem)', // Adjust as needed
                        borderRadius: '0rem',
                        border: 0,
                        backgroundColor: 'transparent',
                        boxSizing: 'border-box'
                      }
                    }}
                  >
                    <LocalNav />
                  </Drawer>
                  <Divider flexItem orientation="vertical" />
                </Box>
              )}
            </Grid>
            <Grid item xs>
              {' '}
              {/* Adjust the xs (Grid) value based on LocalNav */}
              {/**💉 Pages get injected here through App routing */}
              {/* <Container maxWidth="lg" sx={{ height: '100%' }}> */}
              <Outlet />
              {/* </Container> */}
            </Grid>
            {/** TODO 📑 add real gameification */}
            {/* <Grid item xs={2}>
                         <Typography variant="h4">Gamification</Typography>
                         </Grid> */}
          </Grid>
          <Divider flexItem />
          <Footer />
        </Grid>
      </Grid>
      <PrivacyModal />
      <OpenQuestionnaire />
    </>
  )
}

export default MainFrame
