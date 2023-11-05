import { AccordionProps as DefaultAccordionProps } from '@common/components'
import DefaultAccordion from '@mui/material/Accordion'
import { memo, useCallback, MouseEvent } from 'react'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type AccordionProps = DefaultAccordionProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Accordion = ({ useStatement = _useStatement, ...props }: AccordionProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Accordion
  })

  return (
    <DefaultAccordion
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      {...props}>
      {props.children}
    </DefaultAccordion>
  )
}

export default memo(Accordion)
