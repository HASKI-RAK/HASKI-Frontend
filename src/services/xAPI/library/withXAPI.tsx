import { ChangeEvent, ComponentType, MouseEvent } from 'react'
import { XAPI } from './setupXAPI'
import { useXAPI } from './xAPI.hooks'

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
  pageName?: string,
  userAuthenticated?: boolean,
  userID?: string,
  xAPIConfig?: XAPI
): ComponentType<P & EventHandlers> => {
  const EnhancedComponent = (props: P & EventHandlers) => {
    const { onClick, onChange, onClose, ...rest } = props

    const { sendStatement } = useXAPI({
      componentID: props.id,
      componentType: componentType,
      filePath: componentFilePath,
      pageName: pageName,
      userAuthenticated: userAuthenticated,
      userID: userID,
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
