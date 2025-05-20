import { ButtonProps as DefaultButtonProps } from '@common/components'
import DefaultButton from '@mui/material/Button'
import { usePageName } from '@services'
import { forwardRef,memo,Ref } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'

/**
 * @prop {@link DefaultButtonProps} - The props of the default Button component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type ButtonProps = DefaultButtonProps & EventHandlers

/**
 * WrappedButton component.
 *
 * @remarks
 * The WrappedButton component is a wrapper around the MUI Button component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedButton can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedButton = withXAPI(DefaultButton, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Button'
})

/**
 * Button component.
 *
 * @param props - Props containing the ref, default Button props and event handlers.
 *
 * @remarks
 * The Button component is a wrapper around the WrappedButton component.
 * It retrieves the page name from a hook and passes it to the WrappedButton component.
 * Button can be used as a standalone component on a page.
 *
 * @category Components
 */
const Button = forwardRef(({ ...props }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = usePageName()
  return <WrappedButton ref={ref} pageName={pageName} {...props} />
})

// eslint-disable-next-line
Button.displayName = 'Button'
export default memo(Button)
