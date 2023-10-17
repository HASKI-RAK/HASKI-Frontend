export const getButtonObject = (elementURL: string) => {
  return {
    id: elementURL, // Complete Url + #href of clicked element (button) -> param
    definition: {
      name: {
        en: 'Button' // hardcoded
      },
      type: 'http://vocab.xapi.fr/activities/assignment' // wiki url to component e.g. button (common) -> hardcoded
    }
  }
}
