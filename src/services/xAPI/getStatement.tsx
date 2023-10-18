import { getActor } from './getActor'
import { getClickedVerb } from './getVerb'
import { getButtonObject } from './getObject'
import { getContext } from './getContext'

/**
 *
 * timestamp: ISO 8601
 */
export const getOnClickStatement = (objectID: string) => {
  return {
    actor: getActor(new URL(window.location.href).origin, '-1'),
    verb: getClickedVerb(),
    object: getButtonObject('http://127.0.0.1:8080/mod/assign/view.php?id=11'),
    context: getContext(localStorage.getItem('i18nextLng') ?? '', '', ''),
    timestamp: new Date().toISOString()
  }
}
