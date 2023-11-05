import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getStatement } from './getStatement'
import { useMemo, useCallback } from 'react'
import { usePersistedStore } from '@store'
import xAPI from './xAPI.setup'
import log from 'loglevel'

export enum xAPIComponent {
  Null,
  Accordion,
  Alert,
  Button,
  Fab,
  Form,
  Link,
  Modal,
  Menu,
  MenuItem,
  Box,
  Popover,
  IconButton,
  StepButton,
  Select,
  TextField,
  RadioGroup,
  ToggleButtonGroup,
  Node,
  Image,
  Text
}

export enum xAPIVerb {
  clicked,
  opened,
  closed,
  changed
}

export type useStatementHookParams = {
  defaultComponentID?: string
  defaultComponent?: xAPIComponent
}

export type StatementHookReturn = {
  readonly getEnglishName: (key: string) => string
  readonly sendStatement: (verb: xAPIVerb) => Promise<void>
}

/**
 *
 */
export const useStatement = (params?: useStatementHookParams): StatementHookReturn => {
  // Default values
  const { defaultComponentID = 'null', defaultComponent = xAPIComponent.Null } = params ?? {}

  // TODO: maybe useTranslation('en')
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const lmsUserID = fetchUser()
    .then((user) => {
      return user.id.toString()
    })
    .catch((error) => {
      log.error(error)
      return '-1'
    })

  // TODO: Schauen, ob es eine direkte Übersetzungsmöglichkeit gibt t('key', 'en')
  const getEnglishName = useCallback(
    (key: string) => {
      i18n.changeLanguage('en')
      const translatedName = t('pages.'.concat(key))
      i18n.changeLanguage(localStorage.getItem('i18nextLng') ?? 'en')
      return translatedName
    },
    [i18n, t]
  )

  // TODO: Add statements to queue and send them in batch every few minutes?
  // Wraps function so send statements from components
  const sendStatement = useCallback(
    async (verb: xAPIVerb) => {
      xAPI
        .sendStatement({
          statement: getStatement(
            await lmsUserID,
            xAPIVerb[verb],
            location.pathname,
            defaultComponentID,
            xAPIComponent[defaultComponent],
            getEnglishName
          )
        })
        .catch((error) => {
          log.error(error) // Some tests in LocalNav and Contact fail if catch is missing, otherwise not needed.
        })
    },
    [
      xAPI.sendStatement,
      getStatement,
      lmsUserID,
      xAPIVerb,
      location.pathname,
      defaultComponentID,
      xAPIComponent[defaultComponent],
      getEnglishName
    ]
  )

  return useMemo(() => ({ getEnglishName, sendStatement }), [getEnglishName, sendStatement])
}
