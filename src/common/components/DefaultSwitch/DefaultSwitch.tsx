import DefaultSwitch from '@mui/material/Switch'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { SwitchProps as DefaultSwitchProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultSwitchProps} - The props of the default Switch component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type SwitchProps = DefaultSwitchProps & EventHandlers

/**
 * WrappedSwitch component.
 *
 * @remarks
 * The WrappedSwitch component is a wrapper around the MUI Switch component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedSwitch can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedSwitch = withXAPI(DefaultSwitch, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Switch'
})

/**
 * Switch component.
 *
 * @param props - Props containing the default Switch props and event handlers.
 *
 * @remarks
 * The Switch component is a wrapper around the WrappedSwitch component.
 * It retrieves the page name from a hook and passes it to the WrappedSwitch component.
 * Switch can be used as a standalone component on a page.
 *
 * @category Components
 */
const Switch = ({ ...props }: SwitchProps) => {
  const { pageName } = usePageName()
  return <WrappedSwitch pageName={pageName} {...props} />
}

export default memo(Switch)
