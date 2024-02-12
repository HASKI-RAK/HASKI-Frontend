import DefaultModal from '@mui/material/Modal'
// TODO: Replace with common/components
import { memo, useCallback } from 'react'
import { ModalProps as DefaultModalProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultModalProps - The props of a mui Modal.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type ModalProps = DefaultModalProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Modal component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Modal.
 *
 * @category Common
 */
const Modal = ({ useStatement = _useStatement, onClose, ...props }: ModalProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Modal
  })

  return (
    <DefaultModal
      onClose={useCallback(
        (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
          sendStatement(xAPIVerb.closed, new URL(import.meta.url).pathname)
          onClose?.(event, reason)
        },
        [sendStatement, onClose]
      )}
      {...props}>
      {props.children}
    </DefaultModal>
  )
}

export default memo(Modal)
