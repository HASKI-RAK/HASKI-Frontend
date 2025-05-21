import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { ToggleButtonGroupProps as DefaultToggleButtonGroupProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultToggleButtonGroupProps} - The props of the default ToggleButtonGroup component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type ToggleButtonGroupProps = DefaultToggleButtonGroupProps & EventHandlers

/**
 * WrappedToggleButtonGroup component.
 *
 * @remarks
 * The WrappedToggleButtonGroup component is a wrapper around the MUI ToggleButtonGroup component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedToggleButtonGroup can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedToggleButtonGroup = withXAPI(DefaultToggleButtonGroup, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'ToggleButtonGroup'
})

/**
 * ToggleButtonGroup component.
 *
 * @param props - Props containing the default ToggleButtonGroup props and event handlers.
 *
 * @remarks
 * The ToggleButtonGroup component is a wrapper around the WrappedToggleButtonGroup component.
 * It retrieves the page name from a hook and passes it to the WrappedToggleButtonGroup component.
 * ToggleButtonGroup can be used as a standalone component on a page.
 *
 * @category Components
 */
const ToggleButtonGroup = ({ ...props }: ToggleButtonGroupProps) => {
  const { pageName } = usePageName()
  return <WrappedToggleButtonGroup pageName={pageName} {...props} />
}

export default memo(ToggleButtonGroup)
