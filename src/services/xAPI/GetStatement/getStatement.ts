import { Statement } from '@xapi/xapi'
import { getActor } from './getActor'
import { getContext } from './getContext'
import { getContextActivities } from './getContextActivities'
import { getObject } from './getObject'
import { getVerb } from './getVerb'

export type StatementProps = {
  userID: string
  verb: string
  verbRepository: string
  componentURL: string
  component: string
  componentRepository: string
  pageRepository: string
  path: string
  translate: (key: string) => string
  filePath: string
  domainVersion: string
  gitHubURL: string
}

/**
  userID: string,
  verb: string,
  path: string,
  componentID: string,
  componentName: string,
  getEnglishName: (key: string) => string,
  filePath: string */

/**
 * getStatement function.
 *!TODO: RENAME
 * @param lmsUserID - The LMS user ID of the current user.
 * @param verb - The verb of the xAPI statement.
 * @param path - The path of the parent page.
 * @param componentID - The ID of the component.
 * @param componentName - The name of the component.
 * @param getEnglishName - The function to translate a page name to english.
 * @param filePath - The file path of the component that sends an xAPI statement.
 *
 * @remarks
 * getStatement presents a function that can be used to get an xAPI statement.
 * The resulting statement can be used to send data to an LRS.
 *
 * @returns - An xAPI statement.
 *
 * @category Services
 */
export const getStatement = ({
  userID,
  verb,
  verbRepository,
  componentURL,
  component,
  componentRepository,
  pageRepository,
  domainVersion,
  filePath,
  gitHubURL,
  path,
  translate
}: StatementProps): Statement => {
  return {
    actor: getActor({ userID: userID }),
    verb: getVerb({ verb: verb, verbRepository: verbRepository }),
    object: getObject({ componentURL: componentURL, component: component, componentRepository: componentRepository }),
    context: getContext({
      domainVersion: domainVersion,
      filePath: filePath,
      gitHubURL: gitHubURL,
      contextActivities: getContextActivities({ pageRepository, path, translate })
    }),
    timestamp: new Date().toISOString().replace('Z', '+00:00')
  }
}
