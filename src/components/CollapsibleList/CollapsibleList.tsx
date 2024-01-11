import { Accordion } from '@common/components'
import { AccordionDetails, AccordionSummary, Divider, Grid, Stack, Typography, Zoom } from '@mui/material'
import { useRef, useState } from 'react'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Typewriter } from '@components'
import CollapsibleListEntry, { CollapsibleListEntryProps } from './CollapsibleListEntry'

type CollapsibleListProps = {
  content?: CollapsibleListEntryProps[]
}

const CollapsibleList = (props: CollapsibleListProps) => {
  const [startAnimation, setStartAnimation] = useState(true)

  return (
    <>
      <Typography variant="h3" align="center" sx={{ marginBottom: '4rem' }}>
        {'TEst header'}
      </Typography>
      <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {props.content?.map((entry) => (
          <CollapsibleListEntry startAnimation={startAnimation} {...entry} />
        ))}
      </Grid>
    </>
  )
}

export default CollapsibleList
