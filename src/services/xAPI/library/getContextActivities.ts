import { Context, ContextActivity } from '@xapi/xapi'

export type ContextActivityProps = {
  page: string
  repository: string
}

/**
 * getParent function.
 *TODO
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
export const getParent = ({ page, repository }: ContextActivityProps): ContextActivity[] => {
  return [
    {
      id: window.location.href,
      definition: {
        type: `${repository}${page}`,
        name: {
          en: page
        }
      }
    }
  ]
}

/**
 * getGrouping function.
 *TODO
 * @remarks
 * getGrouping presents a function that can be used to get the grouping part of an xAPI statement.
 *
 * @returns - The grouping part of an xAPI statement.
 *
 * @category Services
 */
export const getGrouping = (repository: ContextActivityProps['repository']): ContextActivity[] => {
  return [
    {
      id: window.location.origin,
      definition: {
        type: `${repository}Home`,
        name: {
          en: 'Home'
        }
      }
    }
  ]
}

/**
 * getContextActivities function.
 *TODO
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
export const getContextActivities = ({ page, repository }: ContextActivityProps): Context['contextActivities'] => {
  if (window.location.pathname === '/') {
    return {
      parent: getGrouping(repository)
    }
  } else {
    return {
      parent: getParent({ page, repository }),
      grouping: getGrouping(repository)
    }
  }
}
