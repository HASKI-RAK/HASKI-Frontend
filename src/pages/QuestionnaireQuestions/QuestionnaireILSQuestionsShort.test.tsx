import QuestionnaireILSQuestionsShort from './QuestionnaireILSQuestionsShort'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../common/services/AuthContext'
import renderer from 'react-test-renderer'
import "@testing-library/jest-dom/extend-expect";


describe('ILS Short Questionnaire', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ status: 200 }),
      status: 200,
      message: 'OK'
    })
  ) as jest.Mock

  test('ILS Short Questionnaire rendered', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <QuestionnaireILSQuestionsShort />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const RadioButtonGroup = getByTestId('ilsShortQuestionnaireILSButtonGroup1')
    expect(RadioButtonGroup).toBeInTheDocument
  })

  test('renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
            <QuestionnaireILSQuestionsShort />
          </AuthContext.Provider>
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
