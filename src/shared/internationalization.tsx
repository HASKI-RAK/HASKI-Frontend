import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { SnackbarContext } from '@services'
import React from 'react'

// Custom type options for i18next prevents return type of null
// https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

// Custom type options for i18next prevents return type of null
// https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

// Import all translation files
import translationEnglish from './translation/translationEnglish.json'
import translationGerman from './translation/translationGerman.json'
import log from 'loglevel'

//define the available languages
const resources = {
  en: {
    translation: translationEnglish
  },
  de: {
    translation: translationGerman
  }
}

let lng = ''

if (localStorage.getItem('i18nextLng') === null) {
  localStorage.setItem('i18nextLng', 'de')
  log.trace('Local storage item "i18nextLng" was empty. Set "i18nextLng" language to: de.')
}
// Have to ignore since the dependency is loaded before the test, so it will always be null
/* istanbul ignore next */
else {
  /* istanbul ignore next */
  lng = localStorage.getItem('i18nextLng') as string
  /* istanbul ignore next */
  log.trace('Local storage item "i18nextLng" was already set. Value is: ' + lng + '.')
}

//initial value is german
i18next
  .use(initReactI18next)
  .init({
    returnNull: false,
    resources,
    lng: lng, // local storage get the language from the browser
    fallbackLng: 'de'
  })
  .catch((error) => {
    const { addSnackbar } = React.useContext(SnackbarContext)
    addSnackbar({
      message: 'Error while initializing i18next: ' + error,
      severity: 'error',
      autoHideDuration: 3000
    })
  })

export default i18next
