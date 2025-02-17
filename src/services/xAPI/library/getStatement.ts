import { Statement } from '@xapi/xapi'
import { getActor } from './getActor'
import { getContext } from './getContext'
import { getContextActivities } from './getContextActivities'
import { getObject } from './getObject'
import { getVerb } from './getVerb'
import { XAPIRepositories } from './setupXAPI'

/*
TODO: Comment
*/
export type StatementProps = {
  componentID: string
  componentName: string
  filePath: string
  projectURL: string
  projectVersion: string
  repositories: XAPIRepositories
  userID: string
  userLocation: string
  translateToEN: (key: string) => string
  verbName: string
}

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
  filePath,
  componentID,
  componentName,
  projectURL,
  projectVersion,
  repositories,
  translateToEN,
  userID,
  userLocation,
  verbName,
}: StatementProps): Statement => {
  return {
    actor: getActor({ userID: userID }),
    verb: getVerb({ verb: verbName, verbRepository: typeof repositories == 'string' ? repositories : repositories.verb }),
    object: getObject({ componentURL: componentID, component: componentName, componentRepository: typeof repositories == 'string' ? repositories : repositories.component }),
    context: getContext({
      domainVersion: projectVersion,
      filePath: filePath,
      gitHubURL: projectURL,
      contextActivities: getContextActivities({ pageRepository: typeof repositories == 'string' ? repositories : repositories.page, path: userLocation, translate: translateToEN })
    }),
    timestamp: new Date().toISOString().replace('Z', '+00:00')
  }
}
