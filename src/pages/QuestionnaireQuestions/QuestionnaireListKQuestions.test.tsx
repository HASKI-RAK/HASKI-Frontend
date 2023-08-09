import QuestionnaireListKQuestions from './QuestionnaireListKQuestions'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import renderer from 'react-test-renderer'

describe('Test ListK Questionnaire', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ status: 200 }),
      status: 200,
      message: 'OK'
    })
  ) as jest.Mock

  test('ListK Questionnaire rendered', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
          <QuestionnaireListKQuestions />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const RadioButtonGroup = getByTestId('ListKQuestionnaireButtonGroup1')
    expect(RadioButtonGroup).toBeInTheDocument
  })

  test('renders correctly and matches snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: false, setExpire: jest.fn(), logout: jest.fn() }}>
            <QuestionnaireListKQuestions />
          </AuthContext.Provider>
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
