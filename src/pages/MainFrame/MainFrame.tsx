import { Outlet, useParams } from 'react-router-dom'
import { Box, Divider, Stack, Grid } from '@common/components'
import { MenuBar, Footer, BreadcrumbsContainer, LocalNav, OpenQuestionnaire, PrivacyModal } from '@components'

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
        <BreadcrumbsContainer />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} flex={1} >
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
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            
              {' '}
              {/* Adjust the xs (Grid) value based on LocalNav */}
              {/**💉 Pages get injected here through App routing */}
              {/* <Container maxWidth="lg" sx={{ height: '100%' }}> */}
              <Outlet />
              {/* </Container> */}
            
            {/** TODO 📑 add real gameification */}
            {/* <Grid item xs={2}>
                         <Typography variant="h4">Gamification</Typography>
                         </Grid> */}
            </Box>
          </Box>
       {/* </Grid> */}
        <Footer />
      </Stack>
      <PrivacyModal />
      <OpenQuestionnaire />
    </>
  )
}

export default MainFrame
