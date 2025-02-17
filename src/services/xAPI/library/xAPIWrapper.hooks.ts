import { useCallback, useMemo } from 'react'
import { StatementProps, getStatement } from '../library/getStatement'
import { XAPIConfig } from '../library/setupXAPI'
import XAPI from '@xapi/xapi'

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
export type XAPIWrapperHookParams = {
  componentID?: string
  componentType?: string
  filePath?: string
  xAPIConfig?: XAPIConfig & { xAPI: XAPI }
}

/**
 * @prop getEnglishName - The function that returns the English name of a component.
 * @prop sendStatement - The function that sends an xAPI statement to an predetermined LRS.
 * @category Services
 * @category Hooks
 * @interface
 */
export type xAPIWrapperHookReturn = {
  readonly sendStatement: (verb: xAPIVerb) => Promise<void>
}

/**
 * useStatement hook.
 *
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
export const useXAPI = (params?: XAPIWrapperHookParams): xAPIWrapperHookReturn => {
  const { componentID = '', componentName = '', filePath = '', xAPIConfig = undefined } = params ?? {}

  const sendStatement = useCallback(
    async (verbName: xAPIVerb) => {
      if (xAPIConfig?.userAuthenticated) {
        const { translateToEN, userID, repositories, projectVersion, projectURL, userLocation, xAPI } = xAPIConfig

        const statement: StatementProps = {
          componentName: componentName,
          componentID: componentID,
          filePath: filePath,
          projectURL: projectURL,
          projectVersion: projectVersion,
          repositories: repositories,
          userID: userID,
          userLocation: userLocation,
          translateToEN: translateToEN,
          verbName: verbName,
        }

        // xAPI.sendStatement({ statement: getStatement(statement) })
        console.log(getStatement(statement))
      }
    },
    [componentID, componentName, filePath, xAPIConfig]
  )

  return useMemo(() => ({ sendStatement }), [sendStatement])
}