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

/**
 * @prop DefaultAccordionProps - The props of a mui Accordion.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type AccordionProps = DefaultAccordionProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Accordion component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Accordion.
 *
 * @category Common
 */
const Accordion = ({ useStatement = _useStatement, onClick, ...props }: AccordionProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Accordion
  })

  return (
    <DefaultAccordion
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}>
      {props.children}
    </DefaultAccordion>
  )
}

export default memo(Accordion)
