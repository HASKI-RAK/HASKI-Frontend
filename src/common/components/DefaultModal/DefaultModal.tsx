import { ModalProps as DefaultModalProps } from '@common/components'
import DefaultModal from '@mui/material/Modal'
import { memo, useCallback } from 'react'
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

const Modal = ({ useStatement = _useStatement, children, onClose, ...props }: ModalProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Modal
  })

  const handleClose = useCallback(
    (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
      sendStatement(xAPIVerb.closed)

      if (onClose) {
        onClose(event, reason)
      }
    },
    [onClose, sendStatement]
  )

  return (
    <DefaultModal onClose={handleClose} {...props}>
      {children}
    </DefaultModal>
  )
}

export default memo(Modal)
