import { ChangeEvent, ComponentType, MouseEvent } from 'react'
import { xAPIReturn } from '../setupXAPI'
import { useXAPIWrapper } from './xAPIWrapper.hooks'

// custom type for xapi props
type EnhancedEventHandlers = {
  id?: string
  onClick?: (e: MouseEvent) => void
  onChange?: (e: ChangeEvent) => void
  onClose?: (e: MouseEvent) => void
}

const xAPIWrapper = <P extends object>(
  componentName: string,
  filePath: string,
  xAPIObject: xAPIReturn,
  WrappedComponent: ComponentType<P & EnhancedEventHandlers>
): ComponentType<P & EnhancedEventHandlers> => {
  const EnhancedComponent = (props: P & EnhancedEventHandlers) => {
    const { onClick, onChange, onClose, ...rest } = props

    const { sendStatement } = useXAPIWrapper({
      componentID: props.id,
      componentName: componentName, // TODO: SOME KIND OF COMPONENT TYPE?
      filePath: filePath,
      xAPIObject: xAPIObject
    })

    // Overridden event handlers
    const handleClick = (e: MouseEvent) => {
      sendStatement('clicked')
      if (onClick) {
        onClick(e)
      }
    }

    const handleChange = (e: ChangeEvent) => {
      sendStatement('changed')
      if (onChange) {
        onChange(e)
      }
    }

    const handleClose = (e: MouseEvent) => {
      sendStatement('closed')
      if (onClose) {
        onClose(e)
      }
    }

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
