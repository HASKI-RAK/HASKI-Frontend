export const getVerb = (verb: string) => {
  return {
    id: 'https://wiki.haski.app/verbs/'.concat(verb), // URI of action in online directory + element -> hardcoded
    display: {
      en: verb
    }
  }
}
