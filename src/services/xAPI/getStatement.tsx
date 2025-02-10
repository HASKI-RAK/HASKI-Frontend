import { Actor, Context, ContextActivity, Statement, StatementObject, Verb } from '@xapi/xapi'
import { getConfig } from '@shared'

/**
 * getActor function.
 *
 * @param lmsUserID - The LMS user ID of the current user.
 *
 * @remarks
 * getActor presents a function that can be used to get the actor part of an xAPI statement.
 *
 * @returns - The actor part of an xAPI statement.
 *
 * @category Services
 */
const getActor = (lmsUserID: string): Actor => {
  return {
    account: {
      homePage: new URL(window.location.href).origin,
      name: lmsUserID
    }
  }
}

/**
 * getVerb function.
 *
 * @param verb - The verb of the xAPI statement.
 *
 * @remarks
 * getVerb presents a function that can be used to get the verb part of an xAPI statement.
 *
 * @returns - The verb part of an xAPI statement.
 *
 * @category Services
 */
const getVerb = (verb: string): Verb => {
  return {
    id: (getConfig().WIKI ?? '').concat('/variables/services.').concat(verb),
    display: {
      en: verb
    }
  }
}

/**
 * getObject function.
 *
 * @param componentURL - The URL of the component.
 * @param component - The name of the component.
 *
 * @remarks
 * getObject presents a function that can be used to get the object part of an xAPI statement.
 *
 * @returns - The object part of an xAPI statement.
 *
 * @category Services
 */
const getObject = (componentURL: string, component: string): StatementObject => {
  return {
    id: new URL(window.location.href).origin.concat(componentURL),
    definition: {
      name: {
        en: component
      },
      type: (getConfig().WIKI ?? '').concat('/functions/common.').concat(component)
    }
  }
}

/**
 * getParent function.
 *
 * @param path - The path of the parent page.
 * @param getEnglishName - The function to translate a page name to english.
 *
 * @remarks
 * getParent presents a function that can be used to get the parent part of an xAPI statement.
 *
 * @returns - The parent part of an xAPI statement.
 *
 * @category Services
 */
const getParent = (path: string, getEnglishName: (key: string) => string): ContextActivity[] => {
  return [
    {
      id: new URL(window.location.href).origin.concat(path),
      definition: {
        type: (getConfig().WIKI ?? '')
          .concat('/pages/')
          .concat(path.split('/').pop() as string /*Cannot be undefined, but TS doesn't know that*/),
        name: {
          en: getEnglishName(path.split('/').pop() as string /*Cannot be undefined, but TS doesn't know that*/)
        }
      }
    }
  ]
}

/**
 * getGrouping function.
 *
 * @remarks
 * getGrouping presents a function that can be used to get the grouping part of an xAPI statement.
 *
 * @returns - The grouping part of an xAPI statement.
 *
 * @category Services
 */
const getGrouping = (): ContextActivity[] => {
  return [
    {
      id: new URL(window.location.href).origin,
      definition: {
        type: (getConfig().WIKI ?? '').concat('/functions/pages.Home'),
        name: {
          en: 'Home'
        }
      }
    }
  ]
}

/**
 * getContextActivities function.
 *
 * @param path - The path of the parent page.
 * @param getEnglishName - The function to translate a page name to english.
 *
 * @remarks
 * getContextActivities presents a function that can be used to get the contextActivities part of an xAPI statement.
 *
 * @returns - The contextActivities part of an xAPI statement.
 *
 * @category Services
 */
export const getContextActivities = (path: string, getEnglishName: (key: string) => string) => {
  if (path === '/') {
    return
  } else if (path.split('/').length === 2) {
    return {
      parent: getParent(path, getEnglishName)
    }
  } else {
    return {
      parent: getParent(path, getEnglishName),
      grouping: getGrouping()
    }
  }
}

/**
 * getContext function.
 *
 * @param path - The path of the parent page.
 * @param getEnglishName - The function to translate a page name to english.
 * @param filePath - The file path of the component that sends an xAPI statement.
 *
 * @remarks
 * getContext presents a function that can be used to get the context part of an xAPI statement.
 *
 * @returns - The context part of an xAPI statement.
 *
 * @category Services
 */
const getContext = (path: string, getEnglishName: (key: string) => string, filePath: string): Context => {
  if (getContextActivities(path, getEnglishName))
    return {
      platform: 'Frontend',
      language: localStorage.getItem('i18nextLng') ?? '',
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: new URL(window.location.href).origin,
          domain_version: getConfig().FRONTEND_VERSION ?? '',
          github: getConfig().FRONTEND_GITHUB ?? '',
          event_function: 'src'.concat(filePath)
        }
      },
      contextActivities: getContextActivities(path, getEnglishName)
    }
  else
    return {
      platform: 'Frontend',
      language: localStorage.getItem('i18nextLng') ?? '',
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: new URL(window.location.href).origin,
          domain_version: getConfig().FRONTEND_VERSION ?? '',
          github: getConfig().FRONTEND_GITHUB ?? '',
          event_function: 'src'.concat(filePath)
        }
      }
    }
}

/**
 * getStatement function.
 *
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
export const getStatement = (
  lmsUserID: string,
  verb: string,
  path: string,
  componentID: string,
  componentName: string,
  getEnglishName: (key: string) => string,
  filePath: string
): Statement => {
  return {
    actor: getActor(lmsUserID),
    verb: getVerb(verb),
    object: getObject(path.concat('#', componentID), componentName),
    context: getContext(path, getEnglishName, filePath),
    timestamp: new Date().toISOString().replace('Z', '+00:00')
  }
}

export default getStatement