import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { getOnClickStatement } from './getStatement'
import xAPI from './xAPI.setup'
import { Statement } from '@xapi/xapi'
import { getActor } from './getActor'
import { getClickedVerb } from './getVerb'
import { getButtonObject } from './getObject'
import { getContext } from './getContext'
import { usePersistedStore } from '@store'
import log from 'loglevel'

export type useStatementHookParams = {
  defaultComponentID: string
}

export type StatementHookReturn = {
  readonly sendStatement: () => Promise<void>
  readonly getClickedStatement: () => Promise<Statement>
}

export const useStatement = (params?: useStatementHookParams): StatementHookReturn => {
  // Default values
  const { defaultComponentID = '' } = params ?? {}

  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const location = useLocation()

  /**
   * Build params for statement
   */
  const domain = new URL(window.location.href).origin
  const lmsUserID = fetchUser()
    .then((user) => {
      return user.id.toString()
    })
    .catch((error) => {
      log.error(error)
      return '-1'
    })
  const path = location.pathname

  /**
   * Create statements
   */
  const getClickedStatement = async () => {
    return {
      actor: getActor(domain, await lmsUserID),
      verb: getClickedVerb(),
      object: getButtonObject(domain.concat(path, '#', defaultComponentID ?? '')),
      context: getContext(localStorage.getItem('i18nextLng') ?? '', domain, path),
      timestamp: new Date().toISOString()
    }
  }

  // Wraps function so send statements from components
  const sendStatement = async () => {
    console.log(await getClickedStatement())
    xAPI.sendStatement({ statement: await getClickedStatement() })
  }

  return useMemo(() => ({ sendStatement, getClickedStatement }), [sendStatement, getClickedStatement])
}
