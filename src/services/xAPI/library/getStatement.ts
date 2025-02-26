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
  componentFilePath: string
  componentID: string
  componentType: string
  currentLanguage?: string
  pageName: string
  projectURL: string
  projectVersion: string
  repositories: XAPIRepositories
  userID: string
  verbName: string
}

/**
 * getStatement function.
 *TODO: RENAME
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
  componentFilePath: filePath,
  currentLanguage,
  componentID,
  componentType,
  pageName,
  projectURL,
  projectVersion,
  repositories,
  userID,
  verbName
}: StatementProps): Statement => {
  return {
    actor: getActor({ userID: userID }),
    verb: getVerb({ verb: verbName, repository: typeof repositories == 'string' ? repositories : repositories.verb }),
    object: getObject({
      componentID,
      component: componentType,
      repository: typeof repositories == 'string' ? repositories : repositories.component
    }),
    context: getContext({
      contextActivities: getContextActivities({
        page: pageName,
        repository: typeof repositories == 'string' ? repositories : repositories.page
      }),
      domainVersion: projectVersion,
      filePath: filePath,
      gitHub: projectURL,
      language: currentLanguage
    }),
    timestamp: new Date().toISOString().replace('Z', '+00:00')
  }
}
