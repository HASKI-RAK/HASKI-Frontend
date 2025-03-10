import DefaultButton from '@mui/material/Button'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { Ref, forwardRef, memo, useMemo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { ButtonProps as DefaultButtonProps } from '@common/components'

// TODO: DOku
type ButtonProps = DefaultButtonProps & EventHandlers

// TODO: Doku
const Button = forwardRef(({ ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = usePageName()

  const WrappedButton = useMemo(
    () =>
      withXAPI(DefaultButton, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Button',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedButton ref={ref} {...props} />
})

// eslint-disable-next-line
Button.displayName = 'Button'
export default memo(Button)
