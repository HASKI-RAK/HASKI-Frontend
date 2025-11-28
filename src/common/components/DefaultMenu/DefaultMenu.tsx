import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultMenu from '@mui/material/Menu'
import { MenuProps as DefaultMenuProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultMenuProps} - The props of the default Menu component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type MenuProps = DefaultMenuProps & EventHandlers

/**
 * WrappedMenu component.
 *
 * @remarks
 * The WrappedMenu component is a wrapper around the MUI Menu component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedMenu can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedMenu = withXAPI(DefaultMenu, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Menu'
})

/**
 * Menu component.
 *
 * @param props - Props containing the default Menu props and event handlers.
 *
 * @remarks
 * The Menu component is a wrapper around the WrappedMenu component.
 * It retrieves the page name from a hook and passes it to the WrappedMenu component.
 * Menu can be used as a standalone component on a page.
 *
 * @category Components
 */
const Menu = ({ ...props }: MenuProps) => {
  const { pageName } = usePageName()
  return <WrappedMenu pageName={pageName} {...props} />
}

export default memo(Menu)
