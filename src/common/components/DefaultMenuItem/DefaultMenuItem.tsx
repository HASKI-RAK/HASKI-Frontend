import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultMenuItem from '@mui/material/MenuItem'
import { MenuItemProps as DefaultMenuItemProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultMenuItemProps} - The props of the default MenuItem component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type MenuItemProps = DefaultMenuItemProps & EventHandlers

/**
 * WrappedMenuItem component.
 *
 * @remarks
 * The WrappedMenuItem component is a wrapper around the MUI MenuItem component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedMenuItem can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedMenuItem = withXAPI(DefaultMenuItem, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'MenuItem'
})

/**
 * MenuItem component.
 *
 * @param props - Props containing the default MenuItem props and event handlers.
 *
 * @remarks
 * The MenuItem component is a wrapper around the WrappedMenuItem component.
 * It retrieves the page name from a hook and passes it to the WrappedMenuItem component.
 * MenuItem can be used as a standalone component on a page.
 *
 * @category Components
 */
const MenuItem = ({ ...props }: MenuItemProps) => {
  const { pageName } = usePageName()
  return <WrappedMenuItem pageName={pageName} {...props} />
}

export default memo(MenuItem)
