import { forwardRef, memo, Ref } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultIconButton from '@mui/material/IconButton'
import { IconButtonProps as DefaultIconButtonProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultIconButtonProps} - The props of the default IconButton component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type IconButtonProps = DefaultIconButtonProps & EventHandlers

/**
 * WrappedIconButton component.
 *
 * @remarks
 * The WrappedIconButton component is a wrapper around the MUI IconButton component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedIconButton can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedIconButton = withXAPI(DefaultIconButton, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'IconButton'
})

/**
 * IconButton component.
 *
 * @param props - Props containing the ref, default IconButton props and event handlers.
 *
 * @remarks
 * The IconButton component is a wrapper around the WrappedIconButton component.
 * It retrieves the page name from a hook and passes it to the WrappedIconButton component.
 * IconButton can be used as a standalone component on a page.
 *
 * @category Components
 */
const IconButton = forwardRef(({ ...props }: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { pageName } = usePageName()
  return <WrappedIconButton ref={ref} pageName={pageName} {...props} />
})

// eslint-disable-next-line
IconButton.displayName = 'IconButton'
export default memo(IconButton)
