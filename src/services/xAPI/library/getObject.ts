import { StatementObject } from '@xapi/xapi'

export type ObjectProps = {
  componentURL: string
  component: string
  componentRepository: string
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
export const getObject = ({ componentURL, component, componentRepository }: ObjectProps): StatementObject => {
  return {
    id: window.location.href.concat('#' + componentURL),
    definition: {
      name: {
        en: component
      },
      type: componentRepository.concat(component)
    }
  }
}
