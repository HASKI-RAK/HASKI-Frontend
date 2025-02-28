import { useCallback, useContext, useMemo } from 'react'
import { XAPIContext } from './XAPIProvider'
import { StatementProps, getStatement } from './getStatement'

// TODO: Document this type
export type XAPIVerb = 'clicked' | 'closed' | 'changed' | 'moved' // ? pressed, stroked oder doch clicked?

// TODO Document this type
export type XAPIComponentProps = {
  componentType?: string
  componentFilePath?: string
  pageName?: string
}

// TODO: Document this type
export type XAPIHookParams = {
  componentID?: string
} & XAPIComponentProps

// TODO: Document this type
export type XAPIHookReturn = {
  readonly sendStatement: (verb: XAPIVerb) => void
}

// TODO: Document this hook
export const useXAPI = (params?: XAPIHookParams): XAPIHookReturn => {
  const { componentID = '', componentType = '', componentFilePath = '', pageName } = params ?? {}

  // Context.
  const xAPIContext = useContext(XAPIContext)

  // Resolve the page name.
  const resolvedPageName = useMemo(() => pageName ?? window.location.pathname.split('/').pop() ?? '', [pageName])

  // Function to send a statement.
  const sendStatement = useCallback(
    async (verbName: XAPIVerb) => {
      // Return if xAPIContext is null or user ID is not set.
      if (!xAPIContext || !xAPIContext.userID) return

      const {
        currentLanguage,
        onError = (error: string) => console.error(error),
        projectURL,
        projectVersion,
        repositories,
        userID,
        xAPI
      } = xAPIContext

      const statement: StatementProps = {
        componentFilePath,
        componentID,
        componentType,
        currentLanguage,
        pageName: resolvedPageName,
        projectURL,
        projectVersion,
        repositories,
        userID,
        verbName
      }

      console.log(getStatement(statement)) // TODO: Remove

      xAPI.sendStatement({ statement: getStatement(statement) }).catch((error) => {
        onError(error)
      })
    },
    [componentFilePath, componentID, componentType, xAPIContext]
  )

  return useMemo(() => ({ sendStatement }), [sendStatement])
}
