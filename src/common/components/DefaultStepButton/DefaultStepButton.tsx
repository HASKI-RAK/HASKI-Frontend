import { memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import DefaultStepButton from '@mui/material/StepButton'
import { StepButtonProps as DefaultStepButtonProps } from '@common/components'
import { usePageName } from '@services'

/**
 * @prop {@link DefaultStepButtonProps} - The props of the default StepButton component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type StepButtonProps = DefaultStepButtonProps & EventHandlers

/**
 * WrappedStepButton component.
 *
 * @remarks
 * The WrappedStepButton component is a wrapper around the MUI StepButton component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedStepButton can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedStepButton = withXAPI(DefaultStepButton, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'StepButton'
})

/**
 * StepButton component.
 *
 * @param props - Props containing the default StepButton props and event handlers.
 *
 * @remarks
 * The StepButton component is a wrapper around the WrappedStepButton component.
 * It retrieves the page name from a hook and passes it to the WrappedStepButton component.
 * StepButton can be used as a standalone component on a page.
 *
 * @category Components
 */
const StepButton = ({ ...props }: StepButtonProps) => {
  const { pageName } = usePageName()
  return <WrappedStepButton pageName={pageName} {...props} />
}

export default memo(StepButton)
