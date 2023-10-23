import { xAPIComponent } from './Statement.hooks'

export const getButtonObject = (elementURL: string, statementComponent: xAPIComponent) => {
  return {
    id: new URL(window.location.href).origin.concat(elementURL),
    definition: {
      name: {
        en: xAPIComponent[statementComponent]
      },
      type: 'https://wiki.haski.app/common/components/'.concat(xAPIComponent[statementComponent].toLowerCase()) // wiki url to component e.g. button (common) -> hardcoded // wiki url + componentName.toLowerCase()
    }
  }
}
