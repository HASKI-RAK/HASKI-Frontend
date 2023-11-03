import { ButtonProps as DefaultButtonProps } from '@common/components'
import DefaultButton from '@mui/material/Button'
import { memo } from 'react'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type ButtonProps = DefaultButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Button = ({ useStatement = _useStatement, ...props }: ButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Button
  })

  return (
    <DefaultButton
      onClick={(event) => {
        sendStatement(xAPIVerb.clicked)
        props.onClick?.(event)
      }}
      {...props}>
      {props.children}
    </DefaultButton>
  )
}

export default memo(Button)
