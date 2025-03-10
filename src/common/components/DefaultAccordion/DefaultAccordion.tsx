import DefaultAccordion from '@mui/material/Accordion'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  memo,  useMemo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { AccordionProps as DefaultAccordionProps } from '@common/components'

// TODO: DOku
type AccordionProps = DefaultAccordionProps & EventHandlers

// TODO: DOKU
const Accordion = ({ ...props }: AccordionProps) => {
  const { pageName } = usePageName()

  const WrappedAccordion = useMemo(
    () =>
      withXAPI(DefaultAccordion, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Accordion',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedAccordion {...props} />
}

export default memo(Accordion)
