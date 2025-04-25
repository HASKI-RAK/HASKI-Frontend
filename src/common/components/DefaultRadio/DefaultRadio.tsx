import DefaultRadio from '@mui/material/Radio'
import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { RadioProps as DefaultRadioProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultRadioProps} - The props of the default Radio component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type RadioProps = DefaultRadioProps & EventHandlers

/**
 * WrappedRadio component.
 *
 * @remarks
 * The WrappedRadio component is a wrapper around the MUI Radio component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedRadio can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedRadio = withXAPI(DefaultRadio, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Radio'
})

/**
 * Radio component.
 *
 * @param props - Props containing the default Radio props and event handlers.
 *
 * @remarks
 * The Radio component is a wrapper around the WrappedRadio component.
 * It retrieves the page name from a hook and passes it to the WrappedRadio component.
 * Radio can be used as a standalone component on a page.
 *
 * @category Components
 */
const Radio = ({ ...props }: RadioProps) => {
  const { pageName } = usePageName()
  return <WrappedRadio pageName={pageName} {...props} />
}

export default memo(Radio)
