import { Home } from '@pages'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

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
  const history = createMemoryHistory({ initialEntries: ['/home'] })

  test('renders skeleton since no login is present', () => {
    const result = render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    )

    result.debug()
    // Expect skeleton to be rendered
    expect(result.container.querySelectorAll('span').length).toEqual(1)
  })
})
