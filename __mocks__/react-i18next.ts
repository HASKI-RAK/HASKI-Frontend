const reactI18Next: any = jest.createMockFromModule('react-i18next')

const useTranslation = () => {
  return {
    t: (str: string) => {
      switch (str) {
        case 'components.ContactForm.types':
          return [
            { value: '1', label: 'issue' },
            { value: '2', label: 'Something' }
          ]
        case 'components.ContactForm.topics':
          return [
            { value: '1', label: 'Learningelement' },
            { value: '2', label: 'idk' }
          ]
        default:
          return str
      }
    },
    i18n: {
      changeLanguage: () =>
        new Promise(() => {
          return
        }),
      getFixedT: () => (str: string) => {
        if (str === 'components.QuestionnaireResults.TableILS.balanced') return 'balanced'
        else return str.substring(41, str.length)
      }
    }
  }
}

const initReactI18next = {
  type: '3rdParty',
  init: jest.fn()
}

const I18nextProvider = ({ children }: any) => {
  return children
}

export { useTranslation, initReactI18next, I18nextProvider, reactI18Next }
