import { Outlet, useParams } from 'react-router-dom'
import { Box, Divider, Drawer, Grid } from '@common/components'
import { MenuBar, Footer, BreadcrumbsContainer, LocalNav, OpenQuestionnaire, PrivacyModal } from '@components'
import { useTheme, useMediaQuery } from '@common/hooks'
import { useEffect, useState } from 'react'

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
