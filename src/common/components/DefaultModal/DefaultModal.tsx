import { ModalProps as DefaultModalProps } from '@common/components'
import DefaultModal from '@mui/material/Modal'
import { memo, useCallback } from 'react'
import log from 'loglevel'
import {
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn,
  xAPIComponent,
  xAPIVerb
} from '@services'

type ModalProps = DefaultModalProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Modal = ({ useStatement = _useStatement, ...props }: ModalProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Modal
  })

  return (
    <DefaultModal
      onClose={useCallback(
        (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
          sendStatement(xAPIVerb.closed).catch((reason) => log.error(reason))
          props.onClose?.(event, reason)
        },
        [sendStatement, props.onClose]
      )}
      {...props}>
      {props.children}
    </DefaultModal>
  )
}

export default memo(Modal)
