import { LinkProps as DefaultLinkProps } from '@common/components'
import DefaultLink from '@mui/material/Link'
import { usePageName } from '@services'
import { ElementType, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'

/**
 * @prop {@link DefaultLinkProps} - The props of the default Link component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type LinkProps<C extends ElementType, P = object> = DefaultLinkProps<C, P> & EventHandlers

/**
 * WrappedLink component.
 *
 * @remarks
 * The WrappedLink component is a wrapper around the MUI Link component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedLink can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedLink = withXAPI(DefaultLink, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Link'
})

/**
 * Link component.
 *
 * @param props - Props containing the default Link props and event handlers.
 *
 * @remarks
 * The Link component is a wrapper around the WrappedLink component.
 * It retrieves the page name from a hook and passes it to the WrappedLink component.
 * Link can be used as a standalone component on a page.
 *
 * @category Components
 */
const Link = <C extends ElementType>({ ...props }: LinkProps<C, { component?: C }>) => {
  const { pageName } = usePageName()
  return <WrappedLink pageName={pageName} {...props} />
}

export default memo(Link)
