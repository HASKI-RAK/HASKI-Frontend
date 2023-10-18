export const getButtonObject = (elementURL: string, componentName?: string) => {
  return {
    id: elementURL,
    definition: {
      name: {
        en: 'Button' // hardcoded -> is it possible to get this automatically?
      },
      type: 'http://vocab.xapi.fr/activities/assignment' // wiki url to component e.g. button (common) -> hardcoded // wiki url + componentName.toLowerCase()
    }
  }
}
