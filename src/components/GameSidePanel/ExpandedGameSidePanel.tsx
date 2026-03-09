import { Dispatch, memo, SetStateAction } from 'react'
import { Divider, Grid, IconButton, Paper } from '@common/components'
import { Close } from '@common/icons'
import { EarnedXpDisplay, LevelBar } from '@components'
import { ExperiencePointsPostResponse } from '@core'

type ExpandedGameSidePanelProps = {
  attemptDuration?: number
  collapse: Dispatch<SetStateAction<boolean>>
  studentId: number
  experiencePointDetails?: ExperiencePointsPostResponse
  showExperiencePointDetails?: boolean
}

const ExpandedGameSidePanel = ({
  attemptDuration,
  collapse,
  studentId,
  experiencePointDetails,
  showExperiencePointDetails
}: ExpandedGameSidePanelProps) => {
  const height = showExperiencePointDetails ? '21rem' : '6.5rem'

  return (
    <Paper
      elevation={2}
      sx={{
        right: 0,
        top: '10rem',
        width: '25rem',
        height: { height },
        position: 'absolute',
        mr: '1rem'
      }}>
      <Grid
        container
        item
        direction="column"
        sx={{
          mt: '0.5rem',
          ml: '1rem',
          mr: '1rem',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          maxWidth: '22rem'
        }}>
        <Grid container justifyContent={'right'} sx={{ mb: '1rem' }}>
          <IconButton onClick={() => collapse(false)} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <Close />
          </IconButton>
        </Grid>
        <LevelBar studentId={studentId} experiencePointDetails={experiencePointDetails}></LevelBar>
        {showExperiencePointDetails && (
          <Grid item>
            <Divider sx={{ marginTop: '0.5rem', mB: '0.5rem' }} />
            <EarnedXpDisplay experiencePointDetails={experiencePointDetails} attemptDuration={attemptDuration} />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default memo(ExpandedGameSidePanel)
