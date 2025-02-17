import log from 'loglevel'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '@services'
import { usePersistedStore } from '@store'
import { getStatement } from './getStatement'

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
  readonly sendStatement: (verb: xAPIVerb, filePath: string) => Promise<void>
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

  const { i18n } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const en = i18n.getFixedT('en')
  const location = useLocation()
  const [lmsUserID, setLmsUserID] = useState<string | undefined>(undefined)

  const getUser = usePersistedStore((state) => state.getUser)
  const getXAPI = usePersistedStore((state) => state.getXAPI)

  // Function to get the english name of a page.
  const getEnglishName = useCallback(
    (key: string) => {
      return en('pages.'.concat(key))
    },
    [en]
  )

  useEffect(() => {
    isAuth &&
      getUser()
        .then((user) => {
          setLmsUserID(user.lms_user_id.toString())
        })
        .catch((error: string) => {
          log.error(error)
          return undefined
        })
  }, [getUser, isAuth])

  // Wraps function so send statements from components.
  const sendStatement = useCallback(
    async (verb: xAPIVerb, filePath: string) => {
      console.log(getStatement(
        '-1',
        xAPIVerb[verb],
        location.pathname,
        defaultComponentID,
        xAPIComponent[defaultComponent],
        getEnglishName,
        filePath
      ))
      lmsUserID &&
        (await getXAPI()?.sendStatement({
          statement: getStatement(
            await lmsUserID,
            xAPIVerb[verb],
            location.pathname,
            defaultComponentID,
            xAPIComponent[defaultComponent],
            getEnglishName,
            filePath
          )
        }))
    },
    [
      getXAPI()?.sendStatement,
      getStatement,
      lmsUserID,
      xAPIVerb,
      location.pathname,
      defaultComponentID,
      xAPIComponent[defaultComponent],
      getEnglishName,
      isAuth
    ]
  )

  return useMemo(() => ({ getEnglishName, sendStatement }), [getEnglishName, sendStatement])
}
