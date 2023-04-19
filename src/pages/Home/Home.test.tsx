import { Home } from '@pages'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        //changeLanguage: () => new Promise(() => {}),
        getFixedT: () => (str: string) => {
          if (str === 'components.QuestionnaireResults.TableILS.balanced') return 'balanced'
          else return str
        }
        // You can include here any property your component may use
      }
    }
  }
}))

describe('Test the Home page', () => {
  test('renders QuestionnaireResultsModal', () => {
    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId('QuestionnaireResultsButton'))

    expect(getByTestId('QuestionnaireResultsButton')).toBeInTheDocument()
  })

  test('closes the questionnaire results modal when "handleClose" is called', () => {
    const { getByTestId } = render(<Home />)
    const button = getByTestId('QuestionnaireResultsButton')
    fireEvent.click(button)
    const modal = getByTestId('ILS and ListK Modal')
    const closeButton = getByTestId('QuestionnaireResultsCloseButton')
    fireEvent.click(closeButton)
    expect(modal).not.toBeInTheDocument()
  })
})
