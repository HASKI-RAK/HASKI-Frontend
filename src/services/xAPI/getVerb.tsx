enum Component {
  Button,
  Form
}

const verbs: Record<Component, string> = {
  [Component.Button]: 'clicked',
  [Component.Form]: 'submitted'
}

export const getVerb = (element: Component) => {
  return {
    id: 'http://activitystrea.ms/schema/1.0/'.concat(verbs[element]), // URI of action in online directory + element -> hardcoded
    display: {
      en: verbs[element]
    }
  }
}
