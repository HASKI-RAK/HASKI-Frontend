import { ChangeEvent, ComponentType, MouseEvent, Ref, forwardRef, useCallback, useMemo } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

// TODO: Document this type
export type EventHandlers = {
  id?: string
  onClick?: (e: MouseEvent) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onClose?: (e: MouseEvent) => void
}

// TODO: Document this HOC
export const withXAPI = <P extends object>(
  WrappedComponent: ComponentType<P & EventHandlers>,
  { componentFilePath, componentType, pageName }: XAPIComponentProps
) => {
  // Create a new component that wraps the given component enhancing the event handlers with the ability to send xAPI statements.
  const XAPIEnhancedComponent = forwardRef((props: P & EventHandlers, ref: Ref<unknown>) => {
    //HTMLDivElement
    // Extract the event handlers from the props.
    const { id, onClick, onChange, onClose, ...rest } = props

    const xAPIProps = useMemo(
      () => ({
        componentID: id,
        componentFilePath,
        componentType,
        pageName
      }),
      [id, componentFilePath, componentType, pageName]
    )

    // Get the function to send xAPI statements from the hook.
    const { sendStatement } = useXAPI(xAPIProps)

    // Enhance the onClick event handler
    const handleClick = useCallback(
      (e: MouseEvent) => {
        sendStatement('clicked')
        onClick?.(e)
      },
      [onClick, sendStatement]
    )

    // Enhance the onChange event handler.
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        sendStatement('changed')
        onChange?.(e)
      },
      [onChange, sendStatement]
    )

    // Enhance the onClose event handler.
    const handleClose = useCallback(
      (e: MouseEvent) => {
        sendStatement('closed')
        onClose?.(e)
      },
      [onClose, sendStatement]
    )

    // Return the component with the enhanced event handlers.
    return (
      <WrappedComponent
        ref={ref}
        {...(rest as P)}
        onClick={onClick ? handleClick : undefined}
        onChange={onChange ? handleChange : undefined}
        onClose={onClose ? handleClose : undefined}
      />
    )
  })

  XAPIEnhancedComponent.displayName = `withXAPI(${WrappedComponent.displayName ?? WrappedComponent.name})`
  return XAPIEnhancedComponent
}
