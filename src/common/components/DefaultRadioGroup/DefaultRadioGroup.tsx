import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultRadioGroup from '@mui/material/RadioGroup'

import { RadioGroupProps as DefaultRadioGroupProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultRadioGroupProps} - The props of the default RadioGroup component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type RadioGroupProps = DefaultRadioGroupProps & EventHandlers

/**
 * WrappedRadioGroup component.
 *
 * @remarks
 * The WrappedRadioGroup component is a wrapper around the MUI RadioGroup component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedRadioGroup can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedRadioGroup = withXAPI(DefaultRadioGroup, {
  componentType: 'RadioGroup',
  componentFilePath: new URL(import.meta.url).pathname
})

/**
 * RadioGroup component.
 *
 * @param props - Props containing the default RadioGroup props and event handlers.
 *
 * @remarks
 * The RadioGroup component is a wrapper around the WrappedRadioGroup component.
 * It retrieves the page name from a hook and passes it to the WrappedRadioGroup component.
 * RadioGroup can be used as a standalone component on a page.
 *
 * @category Components
 */
const RadioGroup = ({ ...props }: RadioGroupProps) => {
  const { pageName } = usePageName()
  return <WrappedRadioGroup pageName={pageName} {...props} />
}

export default memo(RadioGroup)
