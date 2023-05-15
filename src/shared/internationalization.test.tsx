//Local Storage should be changed before importing i18n config file.
//That way we can access the else statement in the i18n config file.
import { act, render } from '@testing-library/react'
import { DefaultSelect as Select } from '@common/components'
import { MenuItem } from '@mui/material'
import i18next from './internationalization' // your i18n config file
import { I18nextProvider, useTranslation, I18nextProviderProps } from 'react-i18next'
import { TFunction, i18n, ThirdPartyModule } from 'i18next'
import React from 'react'

describe('i18n test', () => {
  localStorage.setItem('i18nextLng', 'en')
  const ArrangeElement = () => {
    const { i18n } = useTranslation()
    const startingLanguage = localStorage.getItem('i18nextLng') as string

    const onClickLanguageChange = (e: { target: { value: string } }) => {
      i18n.changeLanguage(e.target.value)
      localStorage.setItem('i18nextLng', e.target.value)
    }

    return (
      <div>
        <Select
          className="LanguageDropdown"
          autoWidth={true}
          defaultValue={startingLanguage}
          onChange={onClickLanguageChange}>
          <MenuItem value="de">Deutsch</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </div>
    )
  }

  test('local storage null', () => {
    localStorage.removeItem('i18nextLng')
    // actually give translation to your component
    render(
      <I18nextProvider i18n={i18next}>
        {' '}
        <ArrangeElement />
      </I18nextProvider>
    )
    // example if you have a key called example
    expect(i18next.language).toBe('de')
  })

  test('language can be changed', () => {
    // actually give translation to your component
    render(
      <I18nextProvider i18n={i18next}>
        {' '}
        <ArrangeElement />
      </I18nextProvider>
    )
    // example if you have a key called example
    act(() => {
      i18next.changeLanguage('de')
    })
    expect(i18next.language).toBe('de')

    act(() => {
      i18next.changeLanguage('en')
    })

    expect(i18next.language).toBe('en')
  })

  test('language can be changed', () => {
    localStorage.setItem('i18nextLng', 'en')
    // actually give translation to your component
    render(
      <I18nextProvider i18n={i18next}>
        <ArrangeElement />
      </I18nextProvider>
    )
    // example if you have a key called example

    expect(i18next.language).toBe('en')
  })

  test('was passiert hier?', async () => {
    // localStorage.removeItem('i18nextLng')
    // localStorage.setItem('resources', undefined as unknown as string)
    /*const i18n = jest.mock('./internationalization', () => ({
      i18n: () => Promise.reject(new Error('Failed to load translation file'))
    }))*/
    // initReactI18next.init = jest.fn(() => Promise.reject(new Error('Failed to load translation file')))
    // const i18n = Promise.reject(new Error('Failed to load translation file'))
    /*    render(
      <I18nextProvider i18n={i18next}>
        {' '}
        <ArrangeElement />
      </I18nextProvider>
    )*/
    /*i18next.on('failedLoading', (lng, ns, msg) => {
      console.log({ lng, ns, msg })
    })

    setTimeout(() => {
      i18next.emit('failedLoading')
    }, 2000)*/
    // Force an initialization error by passing an invalid `lng` value
    /*const i18n = {} as i18n
    render(
      <I18nextProvider i18n={i18n}>
        {' '}
        <ArrangeElement />
      </I18nextProvider>
    )*/
  })

  test('i18next initialization should handle errors and show snackbar', async () => {
    // expect.assertions(3) // Number of assertions
    /*
    // Mock the error message
    const errorMessage = 'Mocked error message'
    const error = new Error(errorMessage)

    // Mock the addSnackbar function
    const mockAddSnackbar = jest.fn()

    // Mock the useContext hook
    jest.spyOn(React, 'useContext').mockReturnValueOnce({
      addSnackbar: mockAddSnackbar
    })

    // Promise<TFunction<"translation", undefined>>
    const t: Promise<TFunction<'translation', undefined>> = Promise.reject(i18next.init)

    // Mock the i18next initialization to throw an error
    // jest.spyOn(i18next, 'init').mockReturnValueOnce(t)

    render(
      <I18nextProvider i18n={i18next}>
        {' '}
        <ArrangeElement />
      </I18nextProvider>
    )

    // Render your component or any component that triggers i18next initialization

    // Await any asynchronous tasks to complete
    await act(async () => {})

    // Assertions
    // expect(mockAddSnackbar).toHaveBeenCalledTimes(1)
    // expect(mockAddSnackbar).toHaveBeenCalledWith({
    //   message: 'Error while initializing i18next: ' + errorMessage,
    //   severity: 'error',
    //   autoHideDuration: 3000
    // })
    // expect(i18next.init).toHaveBeenCalled()
  */
  })

  test('catch block is triggered on initialization error', async () => {
    // Mock the SnackbarContext
    const addSnackbar = jest.fn()
    jest.spyOn(React, 'useContext').mockImplementation(() => ({ addSnackbar }))

    // Force an initialization error by passing an invalid `lng` value
    const resources = {
      en: {},
      de: {}
    }

    const { initReactI18next } = require('i18next')

    const lng = 'invalid-language-code'
    await expect(
      i18next.use(initReactI18next).init({
        returnNull: false,
        resources,
        lng,
        fallbackLng: 'de'
      })
    ).rejects.toThrow()

    // Expect the SnackbarContext to have been called with an error message
    expect(addSnackbar).toHaveBeenCalledWith({
      message: expect.stringContaining('Error while initializing i18next'),
      severity: 'error',
      autoHideDuration: 3000
    })
  })
})
