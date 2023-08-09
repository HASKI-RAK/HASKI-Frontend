import QuestionnaireILSQuestionsLong from './QuestionnaireILSQuestionsLong'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import renderer from 'react-test-renderer'

describe('Test ILS Long Questionnaire', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ status: 200 }),
      status: 200,
      message: 'OK'
    })
  ) as jest.Mock

  test('Test ILS Long Questionnaire', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <QuestionnaireILSQuestionsLong />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const RadioButtonGroup = getByTestId('ilsLongQuestionnaireILSButtonGroup1')
    expect(RadioButtonGroup).toBeInTheDocument
  })

  test('renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
            <QuestionnaireILSQuestionsLong />
          </AuthContext.Provider>
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
