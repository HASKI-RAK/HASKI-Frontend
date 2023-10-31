import { SyntheticEvent, MouseEvent, memo, useCallback } from 'react'
import { AlertProps as DefaultAlertProps } from '@common/components'
import DefaultAlert from '@mui/material/Alert'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type AlertProps = DefaultAlertProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Alert = ({ useStatement = _useStatement, ...props }: AlertProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Alert
  })

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      // Send statement on every alert click
      sendStatement(xAPIVerb.clicked)

      if (props.onClick) {
        props.onClick(event)
      }
    },
    [props.onClick, sendStatement]
  )

  const handleClose = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      // Send statement on every alert close
      sendStatement(xAPIVerb.closed)

      if (props.onClose) {
        props.onClose(event)
      }
    },
    [props.onClose, sendStatement]
  )

  return (
    <DefaultAlert onClick={handleClick} onClose={handleClose} {...props}>
      {props.children}
    </DefaultAlert>
  )
}

export default memo(Alert)
