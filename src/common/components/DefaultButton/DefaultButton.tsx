import DefaultButton from '@mui/material/Button'
import { ButtonProps as DefaultButtonProps } from '@common/components'
import { MouseEvent, memo, useCallback } from 'react'
import { xAPIComponent, useStatement as _useStatement, useStatementHookParams, StatementHookReturn } from '@services'

type ButtonProps = DefaultButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Button = ({ useStatement = _useStatement, children, onClick, ...props }: ButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id!,
    defaultComponent: xAPIComponent.Button
  })

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      // Send statement on every button click
      sendStatement()

      if (onClick) {
        onClick(event)
      }
    },
    [onClick, sendStatement]
  )

  return (
    <DefaultButton onClick={handleClick} {...props}>
      {children}
    </DefaultButton>
  )
}

export default memo(Button)
