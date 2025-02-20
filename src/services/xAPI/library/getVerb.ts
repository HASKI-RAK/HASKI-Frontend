import { Verb } from '@xapi/xapi'

//TODO: Comment
export type VerbProps = {
  verb: string
  repository: string
}

/**
 * getVerb function.
 *TODO
 * @param verb - The verb of the xAPI statement.
 *
 * @remarks
 * getVerb presents a function that can be used to get the verb part of an xAPI statement.
 *
 * @returns - The verb part of an xAPI statement.
 *
 * @category Services
 */
export const getVerb = ({ verb, repository }: VerbProps): Verb => {
  return {
    id: repository.concat(verb),
    display: {
      en: verb
    }
  }
}
