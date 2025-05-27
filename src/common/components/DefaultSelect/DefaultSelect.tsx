import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultSelect from '@mui/material/Select'
import { SelectProps as DefaultSelectProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultSelectProps} - The props of the default Select component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type SelectProps = DefaultSelectProps & EventHandlers

/**
 * WrappedSelect component.
 *
 * @remarks
 * The WrappedSelect component is a wrapper around the MUI Select component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedSelect can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedSelect = withXAPI(DefaultSelect, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Select'
})

/**
 * Select component.
 *
 * @param props - Props containing the default Select props and event handlers.
 *
 * @remarks
 * The Select component is a wrapper around the WrappedSelect component.
 * It retrieves the page name from a hook and passes it to the WrappedSelect component.
 * Select can be used as a standalone component on a page.
 *
 * @category Components
 */
const Select = ({ ...props }: SelectProps) => {
  const { pageName } = usePageName()
  return <WrappedSelect pageName={pageName} {...props} />
}

export default memo(Select)
