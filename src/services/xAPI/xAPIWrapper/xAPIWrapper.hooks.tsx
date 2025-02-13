import { useCallback, useMemo } from 'react'
import { StatementProps, getStatement } from '../GetStatement/getStatement'
import { xAPIReturn } from '../setupXAPI'

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
export type xAPIWrapperHookParams = {
  componentID?: string
  componentName?: string
  filePath?: string
  xAPIObject?: xAPIReturn
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
export const useXAPIWrapper = (params?: xAPIWrapperHookParams): xAPIWrapperHookReturn => {
  const { componentID = '', componentName = '', filePath = '', xAPIObject = undefined } = params ?? {}

  const sendStatement = useCallback(
    async (verb: xAPIVerb) => {
      if (xAPIObject?.isAuth) {
        const statement: StatementProps = {
          userID: xAPIObject.userID,
          verb: verb,
          filePath: filePath,
          component: componentName,
          componentURL: componentID,
          verbRepository: xAPIObject.verbRepository,
          componentRepository: xAPIObject.componentRepository,
          pageRepository: xAPIObject.pageRepository,
          domainVersion: xAPIObject.domainVersion,
          gitHubURL: xAPIObject.gitHub,
          path: xAPIObject.path,
          translate: xAPIObject.translate
        }

        xAPIObject.xAPI.sendStatement({ statement: getStatement(statement) })
      }
    },
    [componentID, componentName, filePath, xAPIObject]
  )

  return useMemo(() => ({ sendStatement }), [sendStatement])
}

//! Inhaltlich done
//TODO: RENAME xAPIObject simply to xAPI?
