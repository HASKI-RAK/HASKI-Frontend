import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Zoom from '@mui/material/Zoom'
import {
  CollapsibleTextHookReturn,
  useCollapsibleText as _useCollapsibleText,
  useCollapsibleTextHookParams
} from './CollapsibleText.hooks'

/**
 * @prop header - Header title to be displayed on collapsible component.
 * @prop body - Conent to be displayed on collapsible component in expanded state.
 * @interface
 */
interface CollapsibleTextProps {
  header: string
  body?: []
  animate?: boolean
  offset?: number
  useCollapsibleText?: (params?: useCollapsibleTextHookParams) => CollapsibleTextHookReturn
}

/**
 * CollapsibleText component.
 *
 * @param props - Props containing the body and header texts.
 *
 * @remarks
 * CollapsibleText presents a component that displays a mui Accordion expandable item.
 * Due to nesting the component stays in place.
 * If no body text is provided it cannot be expanded and no expand icon will be shown.
 *
 * @category Components
 */
const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  header,
  body,
  animate,
  offset,
  useCollapsibleText = _useCollapsibleText
}) => {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  animate ??= false
  offset ??= 0
  offset = animate ? offset : 0

  const { animateState, animateObj } = useCollapsibleText()

  const handleScroll = useCallback(() => {
    animateObj(ref, true)
  }, [animateObj, animate])

  // Starts animation on component mount and continues already started animation.
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [animateState, handleScroll])

  const toggleExpansion = () => {
    if (body) {
      setExpanded(!expanded)
    }
  }

  return (
    <Zoom in={animateState} style={{ transitionDelay: `${offset * 20}ms` }}>
      <div ref={ref} className="CollapsibleText" data-testid="CollapsibleText">
        <Accordion expanded={expanded} onChange={toggleExpansion}>
          <div>
            <AccordionSummary
              expandIcon={body ? <ExpandMoreIcon /> : null}
              aria-controls="panel-content"
              id="panel-header">
              <Typography variant="h6">{header}</Typography>
            </AccordionSummary>
          </div>
          {body && (
            <div>
              <Divider variant="middle" />
              <AccordionDetails>
                <ul>{body.map((entry, index)=><li key = {index} ><Typography>{entry}</Typography></li>)}</ul>
              </AccordionDetails>
            </div>
          )}
        </Accordion>
      </div>
    </Zoom>
  )
}

export default memo(CollapsibleText)