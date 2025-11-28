import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultCheckbox from '@mui/material/Checkbox'
import { CheckboxProps as DefaultCheckBoxProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultCheckBoxProps} - The props of the default Checkbox component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type CheckboxProps = DefaultCheckBoxProps & EventHandlers

/**
 * WrappedCheckbox component.
 *
 * @remarks
 * The WrappedCheckbox component is a wrapper around the MUI Checkbox component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedCheckbox can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedCheckbox = withXAPI(DefaultCheckbox, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Checkbox'
})

/**
 * Checkbox component.
 *
 * @param props - Props containing the default Checkbox props and event handlers.
 *
 * @remarks
 * The Checkbox component is a wrapper around the WrappedCheckbox component.
 * It retrieves the page name from a hook and passes it to the WrappedCheckbox component.
 * Checkbox can be used as a standalone component on a page.
 *
 * @category Components
 */
const Checkbox = ({ ...props }: CheckboxProps) => {
  const { pageName } = usePageName()
  return <WrappedCheckbox pageName={pageName} {...props} />
}

export default memo(Checkbox)
