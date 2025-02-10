import { Context, ContextActivity } from '@xapi/xapi'

export type ContextActivityProps = {
  pageRepository: string
  path: string
  translate: (key: string) => string
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
export const getParent = ({ pageRepository, path, translate }: ContextActivityProps): ContextActivity[] => {
  return [
    {
      id: new URL(window.location.href).origin.concat(path),
      definition: {
        type: pageRepository.concat(path.split('/').pop() as string /*Cannot be undefined, but TS doesn't know that*/),
        name: {
          en: translate(path.split('/').pop() as string /*Cannot be undefined, but TS doesn't know that*/)
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
export const getGrouping = (pageRepository: ContextActivityProps['pageRepository']): ContextActivity[] => {
  return [
    {
      id: new URL(window.location.href).origin,
      definition: {
        type: pageRepository.concat('Home'),
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
export const getContextActivities = ({
  pageRepository,
  path,
  translate
}: ContextActivityProps): Context['contextActivities'] => {
  if (path === '/') {
    return
  } else if (path.split('/').length === 2) {
    return {
      parent: getParent({ pageRepository, path, translate })
    }
  } else {
    return {
      parent: getParent({ pageRepository, path, translate }),
      grouping: getGrouping(pageRepository)
    }
  }
}
