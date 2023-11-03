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
  ToggleButtonGroup
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
  readonly sendStatement: (verb: xAPIVerb) => Promise<void>
}

/**
 *
 */
export const useStatement = (params?: useStatementHookParams): StatementHookReturn => {
  // Default values
  const { defaultComponentID = 'null', defaultComponent = xAPIComponent.Null } = params ?? {}

  // maybe useTranslation('en')
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

  // Schauen, ob es eine direkte Übersetzungsmöglichkeit gibt t('key', 'en')
  const getEnglishName = useCallback(
    (key: string) => {
      i18n.changeLanguage('en')
      const translatedName = t('pages.'.concat(key))
      i18n.changeLanguage(localStorage.getItem('i18nextLng') ?? 'en')
      return translatedName
    },
    [i18n, t]
  )

  // Wraps function so send statements from components
  const sendStatement = useCallback(async (verb: xAPIVerb) => {
    console.log(
      getStatement(
        await lmsUserID,
        xAPIVerb[verb],
        location.pathname,
        defaultComponentID,
        xAPIComponent[defaultComponent],
        getEnglishName
      )
    )
    xAPI.sendStatement({
      statement: getStatement(
        await lmsUserID,
        xAPIVerb[verb],
        location.pathname,
        defaultComponentID,
        xAPIComponent[defaultComponent],
        getEnglishName
      )
    }) // Add statements to queue and send them in batch every few minutes?
  }, [])

  return useMemo(() => ({ sendStatement }), [sendStatement])
}
