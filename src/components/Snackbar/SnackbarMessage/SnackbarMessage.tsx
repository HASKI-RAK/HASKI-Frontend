import { memo, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Alert, Typography } from '@common/components'
import { SnackbarTransition } from '@components'
import { SnackbarContext } from '@services'

/**
 * @prop error - The error severity of a snackbar.
 * @prop success - The success severity of a snackbar.
 * @prop warning - The warning severity of a snackbar.
 * @prop info - The info severity of a snackbar.
 * @category Components
 * @interface
 */
export type SeverityType = 'error' | 'success' | 'warning' | 'info'

/**
 * @prop autoHideDuration - The duration a snackbar stays before it autmatically disappears.
 * @prop message - The message that is displayed on a snackbar.
 * @prop severity - The severity type of a snackbar.
 * @category Components
 * @interface
 */
export type SnackbarMessageProps = {
  autoHideDuration?: number
  message?: string
  severity?: SeverityType
}

/**
 * SnackbarMessage component.
 *
 * @param props - Props containing message, severity and autoHideDuration of a snackbar.
 *
 * @remarks
 * SnackbarMessage presents an alert to display messages with different severities to inform users.
 * It can't be used as a standalone component and needs to be placed inside a snackbar component.
 *
 * @category Components
 */
const SnackbarMessage = (props: SnackbarMessageProps) => {
  const { t } = useTranslation()
  const [openTransition, setOpenTransition] = useState(true)
  const { removeSnackbar } = useContext(SnackbarContext)

  // Closes the snackbar with a short delay to allow the transition to finish
  const close = useCallback(() => {
    setOpenTransition(false)
    setTimeout(() => {
      props && removeSnackbar(props)
    }, 1000)
  }, [props, removeSnackbar])

  const handleClose = () => {
    close()
  }

  // Uses the automatic hide duration prop of a snackbar to set a timeout.
  // Closes the snackbar after the timout runs out.
  useEffect(() => {
    if (typeof props?.autoHideDuration === 'number' && props?.autoHideDuration !== 0) {
      setTimeout(() => {
        close()
      }, props?.autoHideDuration)
    }
  }, [close, props?.autoHideDuration])

  return (
    <>
      {props?.severity && (
        <SnackbarTransition severity={props.severity} in={openTransition}>
          {props.severity && (
            <Alert onClick={handleClose} onClose={handleClose} severity={props.severity}>
              <Typography>{t(props.severity) + ': ' + props.message}</Typography>
            </Alert>
          )}
        </SnackbarTransition>
      )}
    </>
  )
}

export default memo(SnackbarMessage)
