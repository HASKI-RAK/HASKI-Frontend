import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography, Zoom } from '@mui/material'
import { useRef } from 'react'

export type CollapsibleListEntryProps = {
  header?: string
  body?: string[]
  startAnimation?: boolean
} // header for list

const CollapsibleListEntry = (props: CollapsibleListEntryProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const offset = 0

  return (
    <Zoom
      key={props.header}
      in={props.startAnimation}
      style={{ transitionDelay: `${offset * 20}ms`, width: '70%', margin: '0 auto' }}>
      <div ref={ref} className="CollapsibleText" data-testid="CollapsibleText">
        <Accordion>
          <AccordionSummary
            expandIcon={props.body ? <ExpandMore /> : null}
            aria-controls="panel-content"
            id="panel-header">
            <Typography variant="h6">{props.header}</Typography>
          </AccordionSummary>
          {props.body && (
            <div>
              <Divider variant="middle" />
              <AccordionDetails>
                <ul>
                  {props.body.map((entry, index) => (
                    <li key={index}>
                      <Typography>{entry}</Typography>
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </div>
          )}
        </Accordion>
      </div>
    </Zoom>
  )
}

export default CollapsibleListEntry
