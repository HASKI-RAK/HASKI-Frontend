import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  Typography,
  Zoom
} from '@common/components'
import { ExpandMore } from '@common/icons'
import { memo } from 'react'

/**
 * @prop body - The body text of an entry, displayed as a bullet points.
 * @prop header - The header text of an entry.
 * @interface
 */
export type CollapsibleListEntryContentProps = {
  body?: string[]
  header?: string
}

/**
 * @prop startAnimation - Whether the animation should start or not.
 * @prop delay - The delay of the animation in ms.
 * @prop {@link CollapsibleListEntryContentProps} - The content of a single CollapsibleListEntry.
 * @interface
 */
type CollapsibleListEntryProps = CollapsibleListEntryContentProps & {
  startAnimation?: boolean
  delay?: number
}

/**
 * CollapsibleListEntry component.
 *
 * @param props - Props containing the header and body of a single entry as well as startAnimation and delay.
 *
 * @remarks
 * CollapsibleListEntry represents a component that displays a header and a body text.
 * The body text is displayed as collapsible bullet point list.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
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
