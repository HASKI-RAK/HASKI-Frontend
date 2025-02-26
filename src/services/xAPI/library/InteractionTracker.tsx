
import { XAPI } from './setupXAPI'
import { getStatement, StatementProps } from './getStatement'
import { useCallback, useEffect, useState } from 'react'


type XAPIProps = {
  componentType?: string
  componentFilePath?: string
  onError?: (error: string) => void
  pageName?: string
  userAuthenticated?: boolean
  userID?: string
  xAPIConfig?: XAPI
}


export const InteractionTracker = ( { componentFilePath, componentType, onError, pageName, userAuthenticated, userID, xAPIConfig }: XAPIProps) => {

    const [lastMouseMove, setLastMouseMove] = useState<number>(Date.now())
    const [lastKeyStroke, setLastKeyStroke] = useState<number>(Date.now())

    // TODO: Import Statement from useXAPI.
  const sendStatement = useCallback((verbName: 'clicked' | 'closed' | 'changed') => {
    if (userAuthenticated && xAPIConfig) {
      const { currentLanguage, projectURL, projectVersion, repositories, xAPI } = xAPIConfig

      const statement: StatementProps = {
        componentFilePath: componentFilePath ?? '',
        componentID: '',
        componentType: componentType ?? '',
        currentLanguage: currentLanguage,
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
  }, [userAuthenticated, xAPIConfig, componentFilePath, componentType, pageName, userID, onError])

  
  const handleMouseMove = useCallback(() => {
    const now = Date.now()

    if(now - lastMouseMove > 3000) { // TODO: Set to 30000.
        console.log('test')
        sendStatement('changed')
        setLastMouseMove(now)
    }
  }, [lastMouseMove, setLastMouseMove, sendStatement])

  const handleKeyStroke = useCallback(() => {
    const now = Date.now()

    if(now - lastKeyStroke > 1000) { // TODO: Set to 100000.
        console.log('test2')
        sendStatement('changed')
        setLastKeyStroke(now)
    }
  }, [lastKeyStroke, setLastKeyStroke, sendStatement])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('keydown', handleKeyStroke)
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('keydown', handleKeyStroke)
        }
    }, [handleMouseMove, handleKeyStroke, sendStatement])

    return null
}