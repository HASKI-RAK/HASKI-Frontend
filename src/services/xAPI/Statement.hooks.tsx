import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getStatement } from './getStatement'
import { useMemo, useCallback } from 'react'
import { usePersistedStore } from '@store'
import xAPI from './xAPI.setup'
import log from 'loglevel'

/**
 * xAPIComponent enum.
 *
 * @remarks
 * xAPIComponent represents an enum that can be used to determine the component that sends the xAPI statement.
 *
 * @category Services
 */
export enum xAPIComponent {
  Accordion,
  Alert,
  Button,
  Fab,
  Form,
  IconButton,
  Image,
  Link,
  Menu,
  MenuItem,
  Modal,
  Node,
  Null,
  Popover,
  RadioGroup,
  Select,
  StepButton,
  Text,
  TextField,
  ToggleButtonGroup
}

/**
 * xAPIVerb enum.
 *
 * @remarks
 * xAPIVerb represents an enum that can be used to determine the verb of an xAPI statement.
 *
 * @category Services
 */
export enum xAPIVerb {
  clicked,
  closed,
  changed
}

/**
 * @prop defaultComponentID - The default value for the component ID.
 * @prop defaultComponent - The default value for the component.
 * @category Services
 * @category Hooks
 * @interface
 */
export type useStatementHookParams = {
  defaultComponentID?: string
  defaultComponent?: xAPIComponent
}

/**
 * @prop getEnglishName - The function that returns the English name of a component.
 * @prop sendStatement - The function that sends an xAPI statement to an predetermined LRS.
 * @category Services
 * @category Hooks
 * @interface
 */
export type StatementHookReturn = {
  readonly getEnglishName: (key: string) => string
  readonly sendStatement: (verb: xAPIVerb) => Promise<void>
}

/**
 * useStatement hook.
 *
 * @param params - The default values for the statement.
 *
 * @remarks
 * Hook for the Statement logic.
 * Handles the logic to get parts of an xAPI Statement that can only be gathered inside a functional component or hook.
 * Provides a function to send an xAPI statement.
 *
 * @returns - Logic to send an xAPI statement to an LRS.
 *
 * @category Services
 * @category Hooks
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
  // Function to get the english name of a page.
  const getEnglishName = useCallback(
    (key: string) => {
      i18n.changeLanguage('en')
      const translatedName = t('pages.'.concat(key))
      i18n.changeLanguage(localStorage.getItem('i18nextLng') ?? 'en')
      return translatedName
      // return t('pages.'.concat(key), 'en')
    },
    [i18n, t]
  )

  // Wraps function so send statements from components
  const sendStatement = useCallback(
    async (verb: xAPIVerb) => {
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
