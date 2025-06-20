import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import TableILSQuestions from './TableILSQuestions'

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        //changeLanguage: () => new Promise(() => {}),
        getFixedT: () => (str: string) => {
          return str
        }
        // You can include here any property your component may use
      }
    }
  }
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Test TableILSQuestions Long with all Methods', () => {
  const successSend = false
  const setSuccessSend = jest.fn((successSend) => successSend)

  test('Long ILS radio Buttons can be checked', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={true} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton4.checked).toBe(true)
  })

  test('Long ILS next button is enabled, when all radioButtons are selected', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={true} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton4.checked).toBe(true)
    expect(nextButton).toBeEnabled()
  })

  test('Long ILS next button is enabled, when all radioButtons are selected (2 Pages)', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={true} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe('components.TableILSQuestions.answer-1-1')
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe('components.TableILSQuestions.answer-2-2')
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe('components.TableILSQuestions.answer-3-1')
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe('components.TableILSQuestions.answer-4-2')
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(nextButton).toBeDisabled()

    const RadioButton5 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton5)
    const RadioButton6 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton6)
    const RadioButton7 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton7)
    const RadioButton8 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton8)

    expect(RadioButton5.checked).toBe(true)
    expect(RadioButton5.value).toBe('components.TableILSQuestions.answer-5-1')
    expect(RadioButton6.checked).toBe(true)
    expect(RadioButton6.value).toBe('components.TableILSQuestions.answer-6-1')
    expect(RadioButton7.checked).toBe(true)
    expect(RadioButton7.value).toBe('components.TableILSQuestions.answer-7-1')
    expect(RadioButton8.checked).toBe(true)
    expect(RadioButton8.value).toBe('components.TableILSQuestions.answer-8-1')
    expect(nextButton).toBeEnabled()
  })

  test('Long ILS next button is disabled, when not all radioButtons are selected', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={true} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    expect(nextButton).toBeDisabled()

    const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton2)

    expect(nextButton).toBeDisabled()

    const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    expect(nextButton).toBeDisabled()

    const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe('components.TableILSQuestions.answer-1-1')
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe('components.TableILSQuestions.answer-2-2')
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe('components.TableILSQuestions.answer-3-1')
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe('components.TableILSQuestions.answer-4-2')
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
  })

  test('Long ILS values are stored', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={true} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const ValuePage1RadioButton1 = 'components.TableILSQuestions.answer-1-1'
    const ValuePage1RadioButton2 = 'components.TableILSQuestions.answer-2-1'
    const ValuePage1RadioButton3 = 'components.TableILSQuestions.answer-3-2'
    const ValuePage1RadioButton4 = 'components.TableILSQuestions.answer-4-2'

    const ValuePage2RadioButton1 = 'components.TableILSQuestions.answer-5-1'
    const ValuePage2RadioButton2 = 'components.TableILSQuestions.answer-6-1'
    const ValuePage2RadioButton3 = 'components.TableILSQuestions.answer-7-2'
    const ValuePage2RadioButton4 = 'components.TableILSQuestions.answer-8-2'

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe(ValuePage1RadioButton4)
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(backButton).toBeEnabled()

    const RadioButton5 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton5)
    const RadioButton6 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton6)
    const RadioButton7 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton7)
    const RadioButton8 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton8)

    expect(RadioButton5.checked).toBe(true)
    expect(RadioButton5.value).toBe(ValuePage2RadioButton1)
    expect(RadioButton6.checked).toBe(true)
    expect(RadioButton6.value).toBe(ValuePage2RadioButton2)
    expect(RadioButton7.checked).toBe(true)
    expect(RadioButton7.value).toBe(ValuePage2RadioButton3)
    expect(RadioButton8.checked).toBe(true)
    expect(RadioButton8.value).toBe(ValuePage2RadioButton4)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()

    fireEvent.click(backButton)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()
  })

  test('Long ILS values can be send', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={true} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    for (let i = 0; i < 11; i++) {
      const RadioButton1 = getByTestId('ilsLongQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsLongQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[1] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsLongQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsLongQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[1] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 10) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        fireEvent.click(sendButton)
        waitFor(async () => {
          expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()
        })
      }
    }
  })
})

describe('Table ILS Questionnaire Short', () => {
  const successSend = false
  const setSuccessSend = jest.fn((successSend) => successSend)

  test('Short ILS radio Buttons can be checked', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton4.checked).toBe(true)
  })

  test('Short ILS next button is enabled, when all radioButtons are selected', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton4.checked).toBe(true)
    expect(nextButton).toBeEnabled()
  })

  test('Short ILS next button is enabled, when all radioButtons are selected (2 Pages)', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe('components.TableILSQuestions.answer-9-1')
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe('components.TableILSQuestions.answer-2-2')
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe('components.TableILSQuestions.answer-7-1')
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe('components.TableILSQuestions.answer-4-2')
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)

    const RadioButton5 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton5)
    const RadioButton6 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton6)
    const RadioButton7 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton7)
    const RadioButton8 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton8)

    expect(RadioButton5.checked).toBe(true)
    expect(RadioButton5.value).toBe('components.TableILSQuestions.answer-13-1')
    expect(RadioButton6.checked).toBe(true)
    expect(RadioButton6.value).toBe('components.TableILSQuestions.answer-14-1')
    expect(RadioButton7.checked).toBe(true)
    expect(RadioButton7.value).toBe('components.TableILSQuestions.answer-19-1')
    expect(RadioButton8.checked).toBe(true)
    expect(RadioButton8.value).toBe('components.TableILSQuestions.answer-8-1')
    expect(nextButton).toBeEnabled()
  })

  test('Short ILS next button is disabled, when not all radioButtons are selected', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    expect(nextButton).toBeDisabled()

    const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton2)

    expect(nextButton).toBeDisabled()

    const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    expect(nextButton).toBeDisabled()

    const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe('components.TableILSQuestions.answer-9-1')
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe('components.TableILSQuestions.answer-2-2')
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe('components.TableILSQuestions.answer-7-1')
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe('components.TableILSQuestions.answer-4-2')
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
  })

  test('Short ILS values are stored', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const ValuePage1RadioButton1 = 'components.TableILSQuestions.answer-9-1'
    const ValuePage1RadioButton2 = 'components.TableILSQuestions.answer-2-1'
    const ValuePage1RadioButton3 = 'components.TableILSQuestions.answer-7-1'
    const ValuePage1RadioButton4 = 'components.TableILSQuestions.answer-4-1'

    const ValuePage2RadioButton1 = 'components.TableILSQuestions.answer-13-2'
    const ValuePage2RadioButton2 = 'components.TableILSQuestions.answer-14-2'
    const ValuePage2RadioButton3 = 'components.TableILSQuestions.answer-19-2'
    const ValuePage2RadioButton4 = 'components.TableILSQuestions.answer-8-2'

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe(ValuePage1RadioButton4)
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(backButton).toBeEnabled()

    const RadioButton5 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton5)
    const RadioButton6 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton6)
    const RadioButton7 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton7)
    const RadioButton8 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton8)

    expect(RadioButton5.checked).toBe(true)
    expect(RadioButton5.value).toBe(ValuePage2RadioButton1)
    expect(RadioButton6.checked).toBe(true)
    expect(RadioButton6.value).toBe(ValuePage2RadioButton2)
    expect(RadioButton7.checked).toBe(true)
    expect(RadioButton7.value).toBe(ValuePage2RadioButton3)
    expect(RadioButton8.checked).toBe(true)
    expect(RadioButton8.value).toBe(ValuePage2RadioButton4)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()

    fireEvent.click(backButton)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()

    const RadioButton1Back = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    const RadioButton2Back = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    const RadioButton3Back = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    const RadioButton4Back = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement

    expect(RadioButton1Back.checked).toBe(true)
    expect(RadioButton1Back.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2Back.checked).toBe(true)
    expect(RadioButton2Back.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3Back.checked).toBe(true)
    expect(RadioButton3Back.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4Back.checked).toBe(true)
    expect(RadioButton4Back.value).toBe(ValuePage1RadioButton4)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()
  })

  test('Short ILS values can be send', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()
    expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()

    for (let i = 0; i < 6; i++) {
      const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 5) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        act(() => {
          fireEvent.click(sendButton)
          waitFor(async () => {
            expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()
          })
        })
      }
    }
  })

  test('Short ILS postCalculateLearningPathILS fails', async () => {
    const mock = jest.fn(() => {
      return Promise.reject(new Error('calculating ils failed'))
    })
    mockServices.postCalculateLearningPathILS.mockImplementationOnce(mock)

    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()
    expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()

    for (let i = 0; i < 6; i++) {
      const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 5) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        act(() => {
          fireEvent.click(sendButton)
          waitFor(async () => {
            expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()
          })
        })
      }
    }
  })

  test('ILS Questionnaire useHandleSend returns error', async () => {
    const mock = jest.fn(() => {
      return Promise.reject(new Error('posting ils failed'))
    })
    mockServices.postILS.mockImplementationOnce(mock)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    for (let i = 0; i < 6; i++) {
      const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 5) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        act(() => {
          fireEvent.click(sendButton)
          waitFor(async () => {
            expect(getByTestId('sendButtonILSQuestionnaire')).toBeEnabled()
          })
        })
      }
    }
  })

  test('ILS unexpected next/prev value in ilsStep list', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions
          ilsLong={false}
          successSend={successSend}
          setSuccessSend={setSuccessSend}
          testEmptyStep={true}
        />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const ValuePage1RadioButton1 = 'components.TableILSQuestions.answer-9-1'
    const ValuePage1RadioButton2 = 'components.TableILSQuestions.answer-2-1'
    const ValuePage1RadioButton3 = 'components.TableILSQuestions.answer-7-1'
    const ValuePage1RadioButton4 = 'components.TableILSQuestions.answer-4-1'

    const ValuePage2RadioButton1 = 'components.TableILSQuestions.answer-13-2'
    const ValuePage2RadioButton2 = 'components.TableILSQuestions.answer-14-2'
    const ValuePage2RadioButton3 = 'components.TableILSQuestions.answer-19-2'
    const ValuePage2RadioButton4 = 'components.TableILSQuestions.answer-8-2'

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe(ValuePage1RadioButton4)
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(backButton).toBeEnabled()

    const RadioButton5 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton5)
    const RadioButton6 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton6)
    const RadioButton7 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton7)
    const RadioButton8 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton8)

    expect(RadioButton5.checked).toBe(true)
    expect(RadioButton5.value).toBe(ValuePage2RadioButton1)
    expect(RadioButton6.checked).toBe(true)
    expect(RadioButton6.value).toBe(ValuePage2RadioButton2)
    expect(RadioButton7.checked).toBe(true)
    expect(RadioButton7.value).toBe(ValuePage2RadioButton3)
    expect(RadioButton8.checked).toBe(true)
    expect(RadioButton8.value).toBe(ValuePage2RadioButton4)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()

    fireEvent.click(backButton)
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    const RadioButton1Back = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    const RadioButton2Back = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    const RadioButton3Back = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    const RadioButton4Back = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement

    expect(RadioButton1Back.checked).toBe(false)
    expect(RadioButton1Back.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2Back.checked).toBe(false)
    expect(RadioButton2Back.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3Back.checked).toBe(false)
    expect(RadioButton3Back.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4Back.checked).toBe(false)
    expect(RadioButton4Back.value).toBe(ValuePage1RadioButton4)
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()
  })

  test('Send question_id is not duplicated', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <TableILSQuestions ilsLong={false} successSend={successSend} setSuccessSend={setSuccessSend} />
      </MemoryRouter>
    )

    const startButton = getByTestId('StartButtonQuestionnaire')

    expect(startButton).toBeEnabled()
    expect(getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = getByTestId('nextButtonILSQuestionnaire')
    const backButton = getByTestId('backButtonILSQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()
    expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()

    for (let i = 0; i < 6; i++) {
      const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
        'input[type="radio"]'
      )[0] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 5) {
        fireEvent.click(nextButton)
      } else {
        fireEvent.click(backButton)
        fireEvent.click(nextButton)
        const RadioButton1 = getByTestId('ilsShortQuestionnaireILSButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[1] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ilsShortQuestionnaireILSButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[1] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ilsShortQuestionnaireILSButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[1] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ilsShortQuestionnaireILSButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[1] as HTMLInputElement
        fireEvent.click(RadioButton4)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)

        const sendButton = getByTestId('sendButtonILSQuestionnaire')
        expect(sendButton).toBeEnabled()
        act(() => {
          fireEvent.click(sendButton)
          waitFor(async () => {
            expect(getByTestId('sendButtonILSQuestionnaire')).toBeDisabled()
          })
        })
      }
    }
  })
})
