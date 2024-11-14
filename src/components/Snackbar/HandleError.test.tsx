import log from 'loglevel'
import { useTranslation } from 'react-i18next'
import HandleError from './HandleError'

describe('HandleError', () => {
  const mockLogError = jest.spyOn(log, 'error').mockImplementation(() => {})
  const mockAddSnackbar = jest.fn()

  it('adds a snackbar and logs.error', () => {
    const { t } = useTranslation()
    const error = new Error('An error occurred')

    HandleError(t, mockAddSnackbar, 'error.translationString', error)
    expect(mockLogError).toHaveBeenCalledWith('error.translationString Error: An error occurred')
    expect(mockAddSnackbar).toHaveBeenCalledWith({
      message: 'error.translationString',
      severity: 'error',
      autoHideDuration: 5000
    })
  })
})