import { Outlet, useParams } from 'react-router-dom'
import { Box, Divider, Grid, Stack } from '@common/components'
import { BreadcrumbsContainer, Footer, LocalNav, MenuBar, OpenQuestionnaire, PrivacyModal, Newsbanner } from '@components'

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

  return (
    <>
      <Stack direction="column" sx={{ minHeight: 'inherit' }}>
        {renderMenuBar ? <MenuBar courseSelected={true} /> : <MenuBar courseSelected={false} />}
        <Newsbanner/>
        <BreadcrumbsContainer />
        <Grid flex={1} container sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
          <Grid container item flexGrow={1} sx={{ alignItems: 'stretch' }}>
            <Grid item xs={renderLocalNav ? 2 : 0}>
              {' '}
              {/* Set the xs value to 0 if LocalNav is not rendered.
                             xs is how much screen i want to reserve for this component */}
              {renderLocalNav && ( // Render the LocalNav if courseId exists
                <Box
                  height={'100%'}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch'
                  }}>
                  <LocalNav />
                  <Divider flexItem orientation="vertical" />
                </Box>
              )}
            </Grid>
            <Grid item xs={renderLocalNav ? 10 : 12}>
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
      </Stack>
      <PrivacyModal />
      <OpenQuestionnaire />
    </>
  )
}

export default MainFrame
