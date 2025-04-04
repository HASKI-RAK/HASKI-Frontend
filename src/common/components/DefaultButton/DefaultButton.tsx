import DefaultButton from '@mui/material/Button'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { Ref, forwardRef, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ButtonProps as DefaultButtonProps } from '@common/components'

// TODO: DOku
type ButtonProps = DefaultButtonProps & EventHandlers

// TODO: Doku
const WrappedButton = withXAPI(DefaultButton, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Button'
})

// TODO: Doku
const Button = forwardRef(({ ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = usePageName()
  return <WrappedButton ref={ref} pageName={pageName} {...props} />
})

// eslint-disable-next-line
Button.displayName = 'Button'
export default memo(Button)
