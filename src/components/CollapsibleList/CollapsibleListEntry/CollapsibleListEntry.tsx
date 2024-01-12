import { ExpandMore } from '@common/icons'
import { memo } from 'react'
import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
  ListItem,
  Divider,
  List,
  Zoom
} from '@common/components'

export type CollapsibleListEntryContentProps = {
  body?: string[]
  header?: string
}

type CollapsibleListEntryProps = CollapsibleListEntryContentProps & {
  startAnimation?: boolean
  delay?: number
}

const CollapsibleListEntry = (props: CollapsibleListEntryProps) => {
  return (
    <Zoom in={props.startAnimation} style={{ transitionDelay: `${props.delay}ms`, width: '70%', margin: '0 auto' }}>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={props.body ? <ExpandMore /> : null}
            aria-controls="panel-content"
            id="panel-header">
            <Typography variant="h6">{props.header}</Typography>
          </AccordionSummary>
          {props.body && (
            <>
              <Divider variant="middle" />
              <AccordionDetails>
                <List style={{ listStyleType: 'circle', paddingLeft: '1rem' }} dense={true}>
                  {props.body.map((entry) => (
                    <ListItem key={entry} style={{ display: 'list-item' }}>
                      <Typography>{entry}</Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </>
          )}
        </Accordion>
      </div>
    </Zoom>
  )
}

export default memo(CollapsibleListEntry)
