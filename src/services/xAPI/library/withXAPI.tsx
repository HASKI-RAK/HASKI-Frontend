import { ChangeEvent, ComponentType, MouseEvent } from 'react'
import { useXAPI as useXAPI } from './xAPIWrapper.hooks'
import { XAPI } from './setupXAPI'

type EventHandlers = {
  id?: string
  onClick?: (e: MouseEvent) => void
  onChange?: (e: ChangeEvent) => void
  onClose?: (e: MouseEvent) => void
}

export const withXAPI = <P extends object>(
  WrappedComponent: ComponentType<P & EventHandlers>,
  componentType?: string,
  componentFilePath?: string,
  xAPIConfig?: XAPI,
): ComponentType<P & EventHandlers> => {
  const EnhancedComponent = (props: P & EventHandlers) => {
    const { onClick, onChange, onClose, ...rest } = props

    const { sendStatement } = useXAPI({
      componentID: props.id,
      componentType: componentType,
      filePath: componentFilePath,
      xAPIConfig: xAPIConfig
    })

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