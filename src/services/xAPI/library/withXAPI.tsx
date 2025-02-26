import { ChangeEvent, ComponentType, MouseEvent, useCallback, useContext, } from 'react'
import { XAPI } from './setupXAPI'
import { getStatement, StatementProps } from './getStatement'
import { XAPIContext } from './XAPIProvider'

type EventHandlers = {
  id?: string
  onClick?: (e: MouseEvent) => void
  onChange?: (e: ChangeEvent) => void
  onClose?: (e: MouseEvent) => void
}

type XAPIProps = {
  componentType?: string
  componentFilePath?: string
  onError?: (error: string) => void
  pageName?: string
  userAuthenticated?: boolean
  userID?: string
  xAPIConfig?: XAPI
}

export const withXAPI = <P extends object>(
  WrappedComponent: ComponentType<P & EventHandlers>, { componentFilePath, componentType, onError, pageName, userAuthenticated, userID, xAPIConfig}: XAPIProps
): ComponentType<P & EventHandlers> => {
  const EnhancedComponent = (props: P & EventHandlers) => {

    const { onClick, onChange, onClose, ...rest } = props

    // const x = useContext(XAPIContext)
    // console.log(x)
    // if (!x) return       <WrappedComponent
    //     {...(rest as P)}
    //   />



    
  const sendStatement = useCallback(
    async (verbName: 'clicked' | 'closed' | 'changed') => {
      if (userAuthenticated && xAPIConfig) {
        const { currentLanguage, projectURL, projectVersion, repositories, xAPI } = xAPIConfig

        const statement: StatementProps = {
          componentFilePath: componentFilePath ?? '',
          componentID: props.id ?? '',
          componentType: componentType ?? '',
          currentLanguage: currentLanguage, //x.currentLanguage,
          pageName: pageName ?? '',
          projectURL: projectURL,
          projectVersion: projectVersion,
          repositories: repositories,
          userID: userID ?? '',
          verbName: verbName
        }

        console.log(getStatement(statement))

        xAPI.sendStatement({ statement: getStatement(statement) }).catch((error) => {
          onError ? onError(error) : console.error(error)
        } 
        )
      }
    },
    [props.id, componentType, componentFilePath, xAPIConfig]
  )

    const handleClick = useCallback((e: MouseEvent) => {
      sendStatement('clicked')
      if (onClick) {
        onClick(e)
      }
    }, [onClose, sendStatement])

    const handleChange = useCallback((e: ChangeEvent) => {
      sendStatement('changed')
      if (onChange) {
        onChange(e)
      }
    }, [onClose, sendStatement])

    const handleClose = useCallback((e: MouseEvent) => {
      sendStatement('closed')
      if (onClose) {
        onClose(e)
      }
    }, [onClose, sendStatement])

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