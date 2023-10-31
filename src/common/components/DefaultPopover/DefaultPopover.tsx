import { PopoverProps as DefaultPopoverProps } from '@common/components'
import { memo, useCallback } from 'react'
import DefaultPopover from '@mui/material/Popover'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type PopoverProps = DefaultPopoverProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Popover = ({ useStatement = _useStatement, ...props }: PopoverProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Popover
  })

  const handleClose = useCallback(
    (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      // Send statement on every popover close
      sendStatement(xAPIVerb.closed)

      if (props.onClose) {
        props.onClose(event, reason)
      }
    },
    [props.onClose, sendStatement]
  )

  return (
    <DefaultPopover onClose={handleClose} {...props}>
      {props.children}
    </DefaultPopover>
  )
}

export default memo(Popover)
