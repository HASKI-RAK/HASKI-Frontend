import { memo } from 'react'
import { Avatar, Divider, Fade, Grid, Typography } from '@common/components'

type CoverSheetProps = {
  header: string
  body: string
  imagePath: string
}

const CoverSheet = memo(({ header, body, imagePath }: CoverSheetProps) => {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        mt: '7.5rem',
        mb: '3rem'
      }}>
      <Grid item xs={7}>
        <Typography variant="h3" align="center" sx={{ pt: '2.5rem' }}>
          {header}
        </Typography>
        <Fade in={!!body} easing="linear" timeout={1000}>
          <Typography align="center" sx={{ pt: '2.5rem', pb: '2.5rem', pr: '2rem' }} variant="h5">
            {body}
          </Typography>
        </Fade>
      </Grid>
      <Divider flexItem orientation="vertical" />
      <Grid container item justifyContent="center" sx={{ pt: '7.5rem', pb: '3rem' }} xs={4}>
        <Avatar
          src={imagePath}
          sx={{
            height: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' },
            width: { xs: '6.25rem', sm: '7.5rem', md: '11.25rem', lg: '15.625rem' }
          }}
        />
      </Grid>
    </Grid>
  )
})

// eslint-disable-next-line immutable/no-mutation
CoverSheet.displayName = 'MemoCoverSheet'
export default CoverSheet
