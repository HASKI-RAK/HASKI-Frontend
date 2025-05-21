import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultPopover from '@mui/material/Popover'

import { PopoverProps as DefaultPopoverProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultPopoverProps} - The props of the default Popover component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type PopoverProps = DefaultPopoverProps & EventHandlers

/**
 * WrappedPopover component.
 *
 * @remarks
 * The WrappedPopover component is a wrapper around the MUI Popover component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedPopover can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedPopover = withXAPI(DefaultPopover, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Popover'
})

/**
 * Popover component.
 *
 * @param props - Props containing the default Popover props and event handlers.
 *
 * @remarks
 * The Popover component is a wrapper around the WrappedPopover component.
 * It retrieves the page name from a hook and passes it to the WrappedPopover component.
 * Popover can be used as a standalone component on a page.
 *
 * @category Components
 */
const Popover = ({ ...props }: PopoverProps) => {
  const { pageName } = usePageName()
  return <WrappedPopover pageName={pageName} {...props} />
}

export default memo(Popover)
