import DefaultButton from '@mui/material/Button'
import { ButtonProps as DefaultButtonProps } from '@common/components'
import { MouseEvent, memo } from 'react'
import {
  StatementComponent,
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn
} from '@services'
import { elementType } from 'prop-types'

type ButtonProps = DefaultButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Button = ({ useStatement = _useStatement, children, onClick, ...props }: ButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id!,
    defaultComponent: StatementComponent.Button
  })

  const handleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    // Send statement on every button click
    sendStatement()

    if (onClick) {
      onClick(event)
    }
  }

  return (
    <DefaultButton onClick={handleClick} {...props}>
      {children}
    </DefaultButton>
  )
}

export default memo(Button)
