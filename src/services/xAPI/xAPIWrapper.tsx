import React, { ChangeEvent, ComponentType, MouseEvent } from 'react'
import { xAPIReturn } from './setupXAPI'
import { StatementHookReturn, useStatement, useStatementHookParams, xAPIComponent, xAPIVerb } from './xAPIWrapper.hooks'

// custom type for xapi props
type EnhancedEventHandlers = {
  id?: string
  onClick?: (e: MouseEvent) => void
  onChange?: (e: ChangeEvent) => void
  onClose?: (e: MouseEvent) => void
}
/**
 * !TODO
 * - Add function of sending the statement to the hook
 * - How do i change the creation of the statement to a more meaningful file structure?
 */
const xAPIWrapper = <P extends object>(
  WrappedComponent: ComponentType<P & EnhancedEventHandlers>,
  filePath: string,
  xAPIObject: xAPIReturn
): ComponentType<P & EnhancedEventHandlers> => {
  const EnhancedComponent = (props: P & EnhancedEventHandlers) => {
    const { onClick, onChange, onClose, ...rest } = props
    const { sendStatement } = useStatement({
      defaultComponentID: props.id,
      defaultComponent: xAPIComponent.Menu //TODO: This one has to be filled dynamically
    })

    // Overridden event handlers
    const handleClick = (e: MouseEvent) => {
      console.log('xAPIWrapper handleClick')
      if (onClick) {
        onClick(e)
      }
    }

    const handleChange = (e: ChangeEvent) => {
      console.log('xAPIWrapper handleChange')
      if (onChange) {
        onChange(e)
      }
    }

    const handleClose = (e: MouseEvent) => {
      console.log('xAPIWrapper handleClose' + props.id + filePath)
      sendStatement(xAPIVerb.closed, filePath)
      if (onClose) {
        onClose(e)
      }
    }

    // APIObject.sendStatement

    // Pass down all props and override handlers if they exist
    return (
      <WrappedComponent
        {...(rest as P)}
        {...(onClick ? { onClick: handleClick } : {})}
        {...(onChange ? { onChange: handleChange } : {})}
        {...(onClose ? { onClose: handleClose } : {})}
      />
    )
  }

  return EnhancedComponent
}

export default xAPIWrapper
