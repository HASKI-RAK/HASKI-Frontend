import DefaultAccordion from '@mui/material/Accordion'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { AccordionProps as DefaultAccordionProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultAccordionProps} - The props of the default Accordion component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type AccordionProps = DefaultAccordionProps & EventHandlers

/**
 * WrappedAccordion component.
 *
 * @remarks
 * The WrappedAccordion component is a wrapper around the MUI Accordion component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedAccordion can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedAccordion = withXAPI(DefaultAccordion, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Accordion'
})

/**
 * Accordion component.
 *
 * @param props - Props containing the default Accordion props and event handlers.
 *
 * @remarks
 * The Accordion component is a wrapper around the WrappedAccordion component.
 * It retrieves the page name from a hook and passes it to the WrappedAccordion component.
 * Accordion can be used as a standalone component on a page.
 *
 * @category Components
 */
const Accordion = ({ ...props }: AccordionProps) => {
  const { pageName } = usePageName()
  return <WrappedAccordion pageName={pageName} {...props} />
}

export default memo(Accordion)
