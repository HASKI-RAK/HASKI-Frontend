import { xAPIComponent } from './Statement.hooks'

const verbs: Record<xAPIComponent, string> = {
  [xAPIComponent.Null]: 'null',
  [xAPIComponent.Button]: 'clicked',
  [xAPIComponent.Form]: 'submitted'
}

export const getVerb = (component: xAPIComponent) => {
  return {
    id: 'https://wiki.haski.app/verbs/'.concat(verbs[component]), // URI of action in online directory + element -> hardcoded
    display: {
      en: verbs[component]
    }
  }
}
