// const object: Record<JSX.Elemen, string> = {}
import { StatementComponent } from './Statement.hooks'

export const getButtonObject = (elementURL: string, statementComponent: StatementComponent) => {
  return {
    id: new URL(window.location.href).origin.concat(elementURL),
    definition: {
      name: {
        en: StatementComponent[statementComponent]
      },
      type: 'http://vocab.xapi.fr/activities/'.concat(StatementComponent[statementComponent].toLowerCase()) // wiki url to component e.g. button (common) -> hardcoded // wiki url + componentName.toLowerCase()
    }
  }
}
