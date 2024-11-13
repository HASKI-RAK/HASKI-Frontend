import log from 'loglevel'
import { useTranslation } from 'react-i18next'
import handleError from './handleError'

describe('handleError', () => {
  const mockLogError = jest.spyOn(log, 'error').mockImplementation(() => {})
  const mockAddSnackbar = jest.fn()

  it('adds a snackbar and logs.error', () => {
    const { t } = useTranslation()
    const error = new Error('An error occurred')
    const autoHideDuration = 5000

    handleError(t, mockAddSnackbar, 'error.translationString', error, autoHideDuration)
    expect(mockLogError).toHaveBeenCalledWith('error.translationString Error: An error occurred')
    expect(mockAddSnackbar).toHaveBeenCalledWith({
      message: 'error.translationString',
      severity: 'error',
      autoHideDuration: autoHideDuration
    })
  })
})
