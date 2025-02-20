import XAPI from '@xapi/xapi'
import { useCallback, useMemo } from 'react'
import { StatementProps, getStatement } from './getStatement'
import { XAPIConfig } from './setupXAPI'

/**
 * xAPIVerb enum.
 *
 * @remarks
 * xAPIVerb represents an enum that can be used to determine the verb of an xAPI statement.
 *
 * @category Services
 */
export type xAPIVerb = 'clicked' | 'closed' | 'changed'

/**
 * @prop defaultComponentID - The default value for the component ID.
 * @prop defaultComponent - The default value for the component.
 * @category Services
 * @category Hooks
 * @interface
 */
export type XAPIHookParams = {
  componentID?: string
  componentType?: string
  filePath?: string
  pageName?: string
  userAuthenticated?: boolean
  userID?: string
  xAPIConfig?: XAPIConfig & { xAPI: XAPI }
}

/**
 * @prop getEnglishName - The function that returns the English name of a component.
 * @prop sendStatement - The function that sends an xAPI statement to an predetermined LRS.
 * @category Services
 * @category Hooks
 * @interface
 */
export type xAPIHookReturn = {
  readonly sendStatement: (verb: xAPIVerb) => Promise<void>
}

/**
 * useStatement hook.
 *TODO
 * @param params - The default values for the statement.
 *
 * @remarks
 * Hook for the Statement logic.
 * Handles the logic to get parts of an xAPI Statement that can only be gathered inside a functional component or hook.
 * Provides a function to send an xAPI statement.
 *
 * @returns - Logic to send an xAPI statement to an LRS.
 *
 * @category Services
 * @category Hooks
 */
export const useXAPI = (params?: XAPIHookParams): xAPIHookReturn => {
  const {
    componentID = '',
    componentType = '',
    filePath = '',
    pageName = window.location.pathname.split('/').pop() ?? '',
    userAuthenticated = false,
    userID = '',
    xAPIConfig = undefined
  } = params ?? {}

  const sendStatement = useCallback(
    async (verbName: xAPIVerb) => {
      if (userAuthenticated && xAPIConfig) {
        const { currentLanguage, projectURL, projectVersion, repositories, xAPI } = xAPIConfig

        const statement: StatementProps = {
          componentName: componentType,
          componentID: componentID,
          currentLanguage: currentLanguage,
          filePath: filePath,
          pageName: pageName,
          projectURL: projectURL,
          projectVersion: projectVersion,
          repositories: repositories,
          userID: userID,
          verbName: verbName
        }

        // TODO: xAPI.sendStatement({ statement: getStatement(statement) })
        console.log(getStatement(statement))
      }
    },
    [componentID, componentType, filePath, xAPIConfig]
  )

  return useMemo(() => ({ sendStatement }), [sendStatement])
}
