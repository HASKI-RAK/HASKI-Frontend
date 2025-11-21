import { Box, Button, Grid } from '@mui/material' // todo: common/components
import { useCallback } from 'react'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
// todo rename to some more direct

// content:
// 3 graphs
// zurück button -> disabled if on top -> Navigates to one above and not previous in history
// breadcrumbs -> Maybe eh schon da
// global time filter -> own component // only when student scoreboard ->  ausblenden sonst

type DashboardLayoutType = {
  datePicker?: string
  left?: string
  topRight?: string
  bottomRight?: string
}

//todo: zurück vielleicht alleine darüber oder in die linke seite integrieren -> zugehörigkeit zur naviation

const DashboardLayout = ({
  datePicker = 'DATE PICKER',
  left = 'LEFT SIDE',
  topRight = 'TOP RIGHT',
  bottomRight = 'BOTTOM RIGHT'
}: DashboardLayoutType) => {
  // todo translation
  // navigation
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = useCallback(() => navigate(-1), [navigate])



  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ width: '80vw', mx: 'auto', mb: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="contained" disabled={location.pathname.split("/").length <= 2} onClick={handleClick}>
          Zurück {/* >//todo translation string */}
        </Button>
        <Box
          sx={{
            backgroundColor: 'lightgrey',
            borderRadius: 1,
            p: 1,
            textAlign: 'center',
            flexGrow: 1,
            borderColor: 'grey',
            borderWidth: 1,
            borderStyle: 'solid'
          }}>
          {datePicker}
        </Box>
      </Box>
      <Grid container wrap="nowrap" sx={{ width: '80vw', height: '80vh', mx: 'auto', gap: 2 }}>
        {/* LEFT BOX */}
        <Grid item xs={6} sx={{ height: '100%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgrey',
              borderRadius: 1,
              height: '100%',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              borderColor: 'grey',
              borderWidth: 1,
              borderStyle: 'solid'
            }}>
            {left}
          </Box>
        </Grid>

        {/* RIGHT SIDE - TWO BOXES STACKED */}
        <Grid item xs={6} sx={{ height: '100%' }}>
          <Grid container flexDirection="column" sx={{ height: '100%' }} gap={2} display="flex">
            <Grid item xs>
              <Box
                sx={{
                  backgroundColor: 'lightgrey',
                  borderRadius: 1,
                  height: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderStyle: 'solid'
                }}>
                {topRight}
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  backgroundColor: 'lightgrey',
                  borderRadius: 1,
                  height: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderStyle: 'solid'
                }}>
                {bottomRight}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardLayout
