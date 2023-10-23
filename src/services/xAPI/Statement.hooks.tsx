import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import xAPI from './xAPI.setup'
import { Statement } from '@xapi/xapi'
import { getActor } from './getActor'
import { getVerb } from './getVerb'
import { getButtonObject } from './getObject'
import { getContext } from './getContext'
import { usePersistedStore } from '@store'
import log from 'loglevel'
import { useTranslation } from 'react-i18next'

export enum xAPIComponent {
  Null,
  Button,
  Form
}

export type useStatementHookParams = {
  defaultComponentID: string
  defaultComponent?: xAPIComponent
}

export type StatementHookReturn = {
  readonly sendStatement: () => Promise<void>
  readonly getClickedStatement: () => Promise<Statement>
}

export const useStatement = (params?: useStatementHookParams): StatementHookReturn => {
  // Default values
  const { defaultComponentID = 'null', defaultComponent = xAPIComponent.Null } = params ?? {}

  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const lmsUserID = fetchUser()
    .then((user) => {
      return user.id.toString()
    })
    .catch((error) => {
      log.error(error)
      return '-1'
    })

  const getEnglishName = (key: string) => {
    i18n.changeLanguage('en')
    const translatedName = t('pages.'.concat(key))
    i18n.changeLanguage(localStorage.getItem('i18nextLng') ?? 'en')
    return translatedName
  }

  // TODO: Single file getStatement.tsx with all the statement get functions
  const getClickedStatement = async () => {
    return {
      actor: getActor(await lmsUserID),
      verb: getVerb(defaultComponent),
      object: getButtonObject(location.pathname.concat('#', defaultComponentID), defaultComponent),
      context: getContext(location.pathname, getEnglishName),
      timestamp: new Date().toISOString() //toLocaleString('sv')
    }
  }

  // Wraps function so send statements from components
  const sendStatement = async () => {
    console.log(await getClickedStatement())
    xAPI.sendStatement({ statement: await getClickedStatement() }) // Add statements to queue and send them in a batch every few minutes?
  }

  return useMemo(() => ({ sendStatement, getClickedStatement }), [sendStatement, getClickedStatement])
}
