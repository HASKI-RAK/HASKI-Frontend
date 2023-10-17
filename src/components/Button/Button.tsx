import { Button as DefaultButton } from '@common/components'
import { ButtonProps as DefaultButtonProps } from '@mui/material'
import { MouseEvent } from 'react'

const Button = ({ children, onClick, ...props }: DefaultButtonProps) => {
  // location und fetches für die Statements

  const handleClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    // sendStatement

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

export default Button
