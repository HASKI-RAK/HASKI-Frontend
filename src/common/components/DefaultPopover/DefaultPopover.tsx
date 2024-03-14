import DefaultPopover from '@mui/material/Popover'
import { memo, useCallback } from 'react'
import { PopoverProps as DefaultPopoverProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultPopoverProps - The props of a mui Popover.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
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
const Popover = ({ useStatement = _useStatement, onClose, ...props }: PopoverProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Popover
  })

  return (
    <DefaultPopover
      onClose={useCallback(
        (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
          sendStatement(xAPIVerb.closed, new URL(import.meta.url).pathname)
          onClose?.(event, reason)
        },
        [onClose, sendStatement]
      )}
      {...props}>
      {props.children}
    </DefaultPopover>
  )
}

export default memo(Popover)
