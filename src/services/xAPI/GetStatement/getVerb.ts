import { Verb } from '@xapi/xapi'
import { string } from 'prop-types'

//! Comment
export type VerbProps = {
  verb: string
  verbRepository: string
}

/**
 * getVerb function.
 *
 * @param verb - The verb of the xAPI statement.
 *
 * @remarks
 * getVerb presents a function that can be used to get the verb part of an xAPI statement.
 *
 * @returns - The verb part of an xAPI statement.
 *
 * @category Services
 */
export const getVerb = ({ verb, verbRepository }: VerbProps): Verb => {
  return {
    id: verbRepository.concat(verb),
    display: {
      en: verb
    }
  }
}
