import { PopoverProps as DefaultPopoverProps } from '@common/components'
import DefaultPopover from '@mui/material/Popover'
import { memo, useCallback } from 'react'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

/**
 * @prop DefaultPopoverProps - The props of a mui Popover.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 */
type PopoverProps = DefaultPopoverProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Popover component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Popover.
 *
 * @category Common
 */
const Popover = ({ useStatement = _useStatement, ...props }: PopoverProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Popover
  })

  return (
    <DefaultPopover
      onClose={useCallback(
        (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
          sendStatement(xAPIVerb.closed).catch((reason) => log.error(reason))
          props.onClose?.(event, reason)
        },
        [props.onClose, sendStatement]
      )}
      {...props}>
      {props.children}
    </DefaultPopover>
  )
}

export default memo(Popover)
