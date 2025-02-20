import { Context, ContextActivity } from '@xapi/xapi'

export type ContextProps = {
  contextActivities?: {
    parent?: ContextActivity[]
    grouping?: ContextActivity[]
    category?: ContextActivity[]
    her?: ContextActivity[]
  }
  domainVersion: string
  filePath: string
  gitHub: string
  language?: string
}

/**
 * getContext function.
 *TODO
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
export const getContext = ({
  contextActivities,
  domainVersion,
  filePath,
  gitHub,
  language = navigator.language
}: ContextProps): Context => {
  if (contextActivities)
    return {
      platform: 'Frontend',
      language: language,
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: window.location.origin,
          domain_version: domainVersion,
          github: gitHub,
          event_function: `src${filePath}`
        }
      },
      contextActivities: contextActivities
    }
  else
    return {
      platform: 'Frontend',
      language: language,
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: window.location.origin,
          domain_version: domainVersion,
          github: gitHub,
          event_function: `src${filePath}`
        }
      }
    }
}
