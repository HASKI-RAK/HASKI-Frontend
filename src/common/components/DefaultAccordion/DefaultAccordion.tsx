import DefaultAccordion from '@mui/material/Accordion'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import {  memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { AccordionProps as DefaultAccordionProps } from '@common/components'

// TODO: DOku
type AccordionProps = DefaultAccordionProps & EventHandlers

// TODO: Doku
const WrappedAccordion = withXAPI(DefaultAccordion, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'Accordion'
})

// TODO: DOKU
const Accordion = ({ ...props }: AccordionProps) => {
  const { pageName } = usePageName()
  return <WrappedAccordion pageName={pageName} {...props} />
}

export default memo(Accordion)
