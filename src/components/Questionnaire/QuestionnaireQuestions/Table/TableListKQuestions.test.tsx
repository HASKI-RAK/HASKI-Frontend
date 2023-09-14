import '@testing-library/jest-dom'
import { TableListKQuestions } from './TableListKQuestions'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { mockServices } from '../../../../../jest.setup'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
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

describe('TableListKQuestions', () => {
  test('ListK RadioButtons can be checked', () => {
    const { getByTestId } = render(<TableListKQuestions />)

    const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton5)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton5.checked).toBe(true)
  })

  test('ListK next Button is enabled, when all radioButtons are selected', () => {
    const { getByTestId } = render(<TableListKQuestions />)

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton5)

    expect(nextButton).toBeEnabled()
  })

  test('ListK next Button is enabled, when all radioButtons are selected (2 Pages)', () => {
    const { getByTestId } = render(<TableListKQuestions />)

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    const backButton = getByTestId('backButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)

    const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton5)

    expect(nextButton).toBeEnabled()
    fireEvent.click(nextButton)

    const RadioButton6 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton6)

    const RadioButton7 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton7)

    const RadioButton8 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton8)

    const RadioButton9 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton9)

    const RadioButton10 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton10)

    expect(nextButton).toBeEnabled()
    expect(backButton).toBeEnabled()
  })

  test('ListK next Button is disabled, when not all radioButtons are selected', () => {
    const { getByTestId } = render(<TableListKQuestions />)

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()

    const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)
    expect(nextButton).toBeDisabled()

    const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton2)
    expect(nextButton).toBeDisabled()

    const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton3)
    expect(nextButton).toBeDisabled()

    const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton4)
    expect(nextButton).toBeDisabled()
  })

  test('ListK values are stored', () => {
    const { getByTestId } = render(<TableListKQuestions />)

    const ValuePage1RadioButton1 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1'
    const ValuePage1RadioButton2 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2'
    const ValuePage1RadioButton3 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3'
    const ValuePage1RadioButton4 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4'
    const ValuePage1RadioButton5 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'

    const ValuePage2RadioButton1 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1'
    const ValuePage2RadioButton2 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1'
    const ValuePage2RadioButton3 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1'
    const ValuePage2RadioButton4 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1'
    const ValuePage2RadioButton5 = 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1'

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    const backButton = getByTestId('backButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeDisabled()

    const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton1)

    const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    fireEvent.click(RadioButton2)

    const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[2] as HTMLInputElement
    fireEvent.click(RadioButton3)

    const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[3] as HTMLInputElement
    fireEvent.click(RadioButton4)

    const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[4] as HTMLInputElement
    fireEvent.click(RadioButton5)

    expect(RadioButton1.checked).toBe(true)
    expect(RadioButton1.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2.checked).toBe(true)
    expect(RadioButton2.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3.checked).toBe(true)
    expect(RadioButton3.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4.checked).toBe(true)
    expect(RadioButton4.value).toBe(ValuePage1RadioButton4)
    expect(RadioButton5.checked).toBe(true)
    expect(RadioButton5.value).toBe(ValuePage1RadioButton5)
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(backButton).toBeEnabled()

    const RadioButton6 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton6)

    const RadioButton7 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton7)

    const RadioButton8 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton8)

    const RadioButton9 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton9)

    const RadioButton10 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    fireEvent.click(RadioButton10)

    expect(RadioButton6.checked).toBe(true)
    expect(RadioButton6.value).toBe(ValuePage2RadioButton1)
    expect(RadioButton7.checked).toBe(true)
    expect(RadioButton7.value).toBe(ValuePage2RadioButton2)
    expect(RadioButton8.checked).toBe(true)
    expect(RadioButton8.value).toBe(ValuePage2RadioButton3)
    expect(RadioButton9.checked).toBe(true)
    expect(RadioButton9.value).toBe(ValuePage2RadioButton4)
    expect(RadioButton10.checked).toBe(true)
    expect(RadioButton10.value).toBe(ValuePage2RadioButton5)
    expect(nextButton).toBeEnabled()

    fireEvent.click(backButton)

    const RadioButton1Back = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
      'input[type="radio"]'
    )[0] as HTMLInputElement
    const RadioButton2Back = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
      'input[type="radio"]'
    )[1] as HTMLInputElement
    const RadioButton3Back = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
      'input[type="radio"]'
    )[2] as HTMLInputElement
    const RadioButton4Back = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
      'input[type="radio"]'
    )[3] as HTMLInputElement
    const RadioButton5Back = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
      'input[type="radio"]'
    )[4] as HTMLInputElement

    expect(RadioButton1Back.checked).toBe(true)
    expect(RadioButton1Back.value).toBe(ValuePage1RadioButton1)
    expect(RadioButton2Back.checked).toBe(true)
    expect(RadioButton2Back.value).toBe(ValuePage1RadioButton2)
    expect(RadioButton3Back.checked).toBe(true)
    expect(RadioButton3Back.value).toBe(ValuePage1RadioButton3)
    expect(RadioButton4Back.checked).toBe(true)
    expect(RadioButton4Back.value).toBe(ValuePage1RadioButton4)
    expect(RadioButton5Back.checked).toBe(true)
    expect(RadioButton5Back.value).toBe(ValuePage1RadioButton5)
    expect(nextButton).toBeEnabled()
    expect(backButton).toBeDisabled()
  })

  test('ListK values can be send', async () => {
    const { getByTestId } = render(<TableListKQuestions />)

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    const backButton = getByTestId('backButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeDisabled()

    for (let i = 0; i < 8; i++) {
      if (i < 7) {
        const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton4)

        const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton5)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)
        expect(RadioButton5.checked).toBe(true)
        fireEvent.click(nextButton)
      }
      //Last step only has 4 radio buttongroups
      else {
        const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton4)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)

        const sendButton = getByTestId('sendButtonListKQuestionnaire')
        expect(sendButton).toBeEnabled()
        fireEvent.click(sendButton)
        act(() => {
          fireEvent.click(sendButton)
          waitFor(async () => {
            expect(getByTestId('sendButtonListKQuestionnaire')).toBeDisabled()
          })
        })
      }
    }
  })

  test('ListK Questionnaire reload confirm needed', () => {
    const mockConfirm = jest.spyOn(window, 'addEventListener')
    mockConfirm.mockImplementation(() => true)

    render(<TableListKQuestions />)

    window.dispatchEvent(new Event('beforeunload'))

    expect(mockConfirm).toHaveBeenCalled()
  })

  test('useHandleSend returns error', async () => {
    const mock = jest.fn(() => {
      return Promise.reject(new Error('posting listk failed'))
    })
    mockServices.postListK.mockImplementationOnce(mock)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const { getByTestId } = render(<TableListKQuestions />)

    const nextButton = getByTestId('nextButtonListKQuestionnaire')
    const backButton = getByTestId('backButtonListKQuestionnaire')
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeDisabled()

    for (let i = 0; i < 8; i++) {
      if (i < 7) {
        const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton4)

        const RadioButton5 = getByTestId('ListKQuestionnaireButtonGroup5').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton5)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)
        expect(RadioButton5.checked).toBe(true)
        fireEvent.click(nextButton)
      }
      //Last step only has 4 radio buttongroups
      else {
        const RadioButton1 = getByTestId('ListKQuestionnaireButtonGroup1').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton1)

        const RadioButton2 = getByTestId('ListKQuestionnaireButtonGroup2').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton2)

        const RadioButton3 = getByTestId('ListKQuestionnaireButtonGroup3').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton3)

        const RadioButton4 = getByTestId('ListKQuestionnaireButtonGroup4').querySelectorAll(
          'input[type="radio"]'
        )[0] as HTMLInputElement
        fireEvent.click(RadioButton4)

        expect(RadioButton1.checked).toBe(true)
        expect(RadioButton2.checked).toBe(true)
        expect(RadioButton3.checked).toBe(true)
        expect(RadioButton4.checked).toBe(true)

        const sendButton = getByTestId('sendButtonListKQuestionnaire')
        expect(sendButton).toBeEnabled()
        fireEvent.click(sendButton)
        act(() => {
          fireEvent.click(sendButton)
          waitFor(async () => {
            expect(getByTestId('sendButtonListKQuestionnaire')).toBeEnabled()
          })
        })
      }
    }
  })
})
