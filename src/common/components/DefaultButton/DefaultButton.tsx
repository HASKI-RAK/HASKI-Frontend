import { ButtonProps as DefaultButtonProps } from '@common/components'
import { MouseEvent, memo, useCallback } from 'react'
import DefaultButton from '@mui/material/Button'
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

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      // Send statement on every button click
      sendStatement(xAPIVerb.clicked)

      if (props.onClick) {
        props.onClick(event)
      }
    },
    [props.onClick, sendStatement]
  )

  return (
    <DefaultButton onClick={handleClick} {...props}>
      {props.children}
    </DefaultButton>
  )
}

export default memo(Button)
