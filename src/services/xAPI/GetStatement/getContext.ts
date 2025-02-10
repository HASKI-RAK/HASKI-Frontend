import { Context, ContextActivity } from '@xapi/xapi'
import { getContextActivities } from './getContextActivities'

export type ContextProps = {
  contextActivities?: any
  filePath: string
  domainVersion: string
  gitHubURL: string
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
export const getContext = ({ contextActivities, filePath, domainVersion, gitHubURL }: ContextProps): Context => {
  if (contextActivities)
    return {
      platform: 'Frontend',
      language: localStorage.getItem('i18nextLng') ?? '',
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: new URL(window.location.href).origin,
          domain_version: domainVersion,
          github: gitHubURL,
          event_function: 'src'.concat(filePath)
        }
      },
      contextActivities: contextActivities
    }
  else
    return {
      platform: 'Frontend',
      language: localStorage.getItem('i18nextLng') ?? '',
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: new URL(window.location.href).origin,
          domain_version: domainVersion,
          github: gitHubURL,
          event_function: 'src'.concat(filePath)
        }
      }
    }
}
