import { Outlet, useParams } from 'react-router-dom'
import {
  DefaultBox as Box,
  DefaultDivider as Divider,
  DefaultStack as Stack,
  DefaultGrid as Grid
} from '@common/components'
import { MenuBar, Footer, BreadcrumbsContainer, LocalNav } from '@components'
/**
 * Main frame component.
 *
 * @remarks
 * It contains the main frame of the application and is used in the App.tsx.
 * It contains the menu bar, the breadcrumbs, the local navigation and the outlet for the other pages.
 * The footer is also included.
 * It holds a layout for all pages.
 * Help, Global settings and User settings are also included in the menu bar.
 *
 * @category Pages
 */
const MainFrame = () => {
  const { courseId } = useParams()

  // !! converts courseId to a boolean
  const renderMenuBar = !!courseId
  const renderLocalNav = !!courseId

  return (
    <Stack direction="column" sx={{ minHeight: 'inherit' }}>
      {renderMenuBar ? <MenuBar courseSelected={true} /> : <MenuBar courseSelected={false} />}
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
  )
}

export default MainFrame
