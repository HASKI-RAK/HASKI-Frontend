import { BoxProps as DefaultBoxProps } from '@common/components'
import { usePageName } from '@services'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'

import { Box } from './DefaultBox'

/**
 * @prop {@link DefaultBoxProps} - The props of the default Box component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type NodeWrapperProps = DefaultBoxProps & EventHandlers

/**
 * WrappedNodeWrapper component.
 *
 * @remarks
 * The WrappedNodeWrapper component is a wrapper around the MUI Box component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedNodeWrapper can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedNodeWrapper = withXAPI(Box, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Node'
})

/**
 * NodeWrapper component.
 *
 * @param props - Props containing the default Box props and event handlers.
 *
 * @remarks
 * The NodeWrapper component is a wrapper around the WrappedNodeWrapper component.
 * It retrieves the page name from a hook and passes it to the WrappedNodeWrapper component.
 * NodeWrapper can be used as a standalone component on a page.
 *
 * @category Components
 */
const NodeWrapper = ({ ...props }: NodeWrapperProps) => {
  const { pageName } = usePageName()
  return <WrappedNodeWrapper pageName={pageName} {...props} />
}

export default memo(NodeWrapper)
