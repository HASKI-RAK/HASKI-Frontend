import React, { memo } from 'react'
import { Grid, IconButton, Paper } from '@common/components'
import { ExpandMore } from '@common/icons'

type CollapsedGameSidePanelProps = {
  expand: React.Dispatch<React.SetStateAction<boolean>>
}

const CollapsedSidePanel = ({ expand }: CollapsedGameSidePanelProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        right: 0,
        top: '10rem',
        width: '2.5rem',
        height: '2.5rem',
        position: 'absolute',
        mr: '1rem'
      }}>
      <Grid container item direction="column" sx={{ mt: '0.5rem', ml: '1rem', mr: '1rem' }}>
        <Grid container justifyContent={'right'} sx={{ mb: '1rem' }}>
          <IconButton onClick={() => expand(true)} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <ExpandMore />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default memo(CollapsedSidePanel)
