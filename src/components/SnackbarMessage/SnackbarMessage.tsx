import { useState, useCallback, useEffect, useContext } from 'react'
import { SnackbarTransition } from '@components'
import { useTranslation } from 'react-i18next'
import { SnackbarContext } from '@services'
import { DefaultAlert as Alert, DefaultTypography as Typography } from '@common/components'

/**
 * @typedef {Object} SeverityType
 * @param {string} error - The error severity of a snackbar.
 * @param {string} success - The success severity of a snackbar.
 * @param {string} warning - The warning severity of a snackbar.
 * @param {string} info - The info severity of a snackbar.
 */
export type SeverityType = 'error' | 'success' | 'warning' | 'info'

/**
 * @typedef {Object} SnackbarMessageProps
 * @param {number} autoHideDuration - The duration a snackbar stays before it autmatically disappears.
 * @param {string} message - The message that is displayed on a snackbar.
 * @param {SeverityType} severity - The severity type of a snackbar.
 */
export type SnackbarMessageProps = {
  autoHideDuration?: number
  message?: string
  severity?: SeverityType
}

/**
 * SnackbarMessage presents an alert to display messages with different severities to inform users.
 * It can't be used as a standalone component and needs to be placed inside a snackbar component.
 * @param props - Props containing message, severity and autoHideDuration of a snackbar.
 * @returns {JSX.Element} - The message component of a snackbar.
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
    <div data-testid="snackbarMessage">
      {props?.severity && (
        <SnackbarTransition severity={props.severity} in={openTransition}>
          {props.severity && (
            <Alert onClick={handleClose} onClose={handleClose} severity={props.severity}>
              <Typography>{t(props.severity) + ': ' + props.message}</Typography>
            </Alert>
          )}
        </SnackbarTransition>
      )}
    </div>
  )
}

export default SnackbarMessage
