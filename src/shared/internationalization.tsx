import React from 'react'
import { initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import log from 'loglevel'

import { SnackbarContext } from '@services'

import translationEnglish from './translation/translationEnglish.json'
import translationGerman from './translation/translationGerman.json'

// Import all translation files

// Custom type options for i18next prevents return type of null
// https://www.i18next.com/overview/typescript#argument-of-type-defaulttfuncreturn-is-not-assignable-to-parameter-of-type-xyz
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

//define the available languages
const resources = {
  en: {
    translation: translationEnglish
  },
  de: {
    translation: translationGerman
  }
}

// eslint-disable-next-line immutable/no-let
let lng = ''

/* istanbul ignore next */
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
  /* istanbul ignore next */
  .catch((error) => {
    /* istanbul ignore next */
    const { addSnackbar } = React.useContext(SnackbarContext)
    /* istanbul ignore next, can not be translation string as i18next is responsible for that*/
    addSnackbar({
      message: 'Error while initializing i18next.',
      severity: 'error',
      autoHideDuration: 3000
    })
    /* istanbul ignore next, can not be translation string as i18next is responsible for that*/
    log.error('Error while initializing i18next.' + 'Error: ' + error)
  })

export default i18next
