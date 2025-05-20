import { SnackbarMessageProps } from '@components'
import { TFunction } from 'i18next'
import log from 'loglevel'

const handleError = (
  t: TFunction,
  addSnackbar: (newSnackbar: SnackbarMessageProps) => void,
  errorTranslationMessage: string,
  error: any,
  hideDuration: number
) => {
  const message = t(errorTranslationMessage)
  addSnackbar({
    message,
    severity: 'error',
    autoHideDuration: hideDuration
  })
  log.error(`${message} ${error}`)
}

export default handleError
