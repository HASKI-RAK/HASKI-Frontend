import { memo, ReactNode } from 'react'
import { Box, Grid } from '@common/components'

// global time filter -> own component // only when student scoreboard ->  ausblenden sonst

type DashboardLayoutType = {
  bottomRight?: ReactNode
  datePicker?: ReactNode
  disabledBack?: boolean
  handleBack?: () => void
  left?: ReactNode
  topRight?: ReactNode
}

const DashboardLayout = ({
  datePicker = 'DATE PICKER',
  left,
  topRight = 'TOP RIGHT',
  bottomRight = 'BOTTOM RIGHT'
}: DashboardLayoutType) => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ width: '80vw', mx: 'auto', mb: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box
          sx={{
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
        <Grid item xs={5} sx={{ height: '100%', minHeight: 0 }}>
          <Box
            sx={{
              borderRadius: 1,
              height: '100%',
              borderColor: 'grey',
              borderWidth: 1,
              borderStyle: 'solid',
              overflowY: 'auto',
              overflowX: 'hidden',
              display: 'block'
            }}>
            {left}
          </Box>
        </Grid>

        {/* RIGHT SIDE - TWO BOXES STACKED */}
        <Grid item xs={7} sx={{ height: '100%' }}>
          <Grid container flexDirection="column" sx={{ height: '100%' }} gap={2} display="flex">
            <Grid item xs>
              <Box
                sx={{
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

export default memo(DashboardLayout)
