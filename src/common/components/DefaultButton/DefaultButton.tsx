import DefaultButton, { ButtonProps } from '@mui/material/Button'
export { StatementButton as Button }
import { useLocation } from 'react-router-dom'

type CustomButtonProps = ButtonProps & {
  handleClick?: Function
}

const getURL = (id: string) => {
  return new URL(window.location.href).origin.concat(location.pathname).concat('#').concat(id)
}

const StatementButton = ({ handleClick, children, ...props }: CustomButtonProps) => {
  const location = useLocation()

  const onClick = () => {
    // You can perform your custom logic here
    console.log('Custom logic executed')
    console.log(getURL(props.id!)) // Mit if absichern ob id existiert sonst fehler?

    // sendStatement

    // You can also call the original onClick function if needed
    if (handleClick) {
      handleClick()
    }
  }

  return (
    <DefaultButton {...props} onClick={onClick}>
      {children}
    </DefaultButton>
  )
}

export default StatementButton
