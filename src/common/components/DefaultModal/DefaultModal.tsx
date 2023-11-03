import { ModalProps as DefaultModalProps } from '@common/components'
import DefaultModal from '@mui/material/Modal'
import { memo } from 'react'
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
      onClose={(event, reason) => {
        sendStatement(xAPIVerb.closed)
        props.onClose?.(event, reason)
      }}
      {...props}>
      {props.children}
    </DefaultModal>
  )
}

export default memo(Modal)
