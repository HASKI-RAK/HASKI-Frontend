import { StatementObject } from '@xapi/xapi'

export type ObjectProps = {
  component: string
  componentID: string
  repository: string
}

/**
 * getObject function.
 *TODO
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
export const getObject = ({ component, componentID, repository }: ObjectProps): StatementObject => {
  return {
    id: window.location.href.concat('#' + componentID),
    definition: {
      name: {
        en: component
      },
      type: repository.concat(component)
    }
  }
}
