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

type PopoverProps = DefaultPopoverProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

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
