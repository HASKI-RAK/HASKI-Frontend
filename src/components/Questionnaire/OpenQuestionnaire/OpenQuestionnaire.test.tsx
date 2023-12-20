import { fireEvent, render, waitFor } from '@testing-library/react'
import { OpenQuestionnaire } from '@components'
import { AuthContext } from '@services'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-test-renderer'
import '@testing-library/jest-dom'

describe('OpenQuestionnaire', () => {
  test('Standard OpenQuestionnaire functionality', () => {
    render(<OpenQuestionnaire />)
  })

  test('Questionnaire gets closed and reloads', async () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'privacy_accept_token=true; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;'
    window.confirm = jest.fn(() => true) // always click 'yes'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))

    mockServices.fetchILS.mockImplementationOnce(() =>
      Promise.resolve({
        characteristic_id: 1,
        id: 1,
        input_dimension: 'test',
        input_value: 0,
        perception_dimension: 'sns',
        perception_value: 0,
        processing_dimension: 'test',
        processing_value: 0,
        understanding_dimension: 'test',
        understanding_value: 0
      })
    )

    const { getByTestId, getAllByRole, rerender } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <OpenQuestionnaire />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await new Promise(process.nextTick)
    rerender(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <OpenQuestionnaire />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await act(async () => {
      const closeButton = getAllByRole('button')[0]
      fireEvent.click(closeButton)

      await waitFor(() => {
        new Promise(process.nextTick)
        rerender(
          <MemoryRouter>
            <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
              <OpenQuestionnaire />
            </AuthContext.Provider>
          </MemoryRouter>
        )
        expect(getByTestId('Questions Modal')).toBeInTheDocument()
      })
    })
  })

  test('Questionnaire close get denied and stays open', async () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'privacy_accept_token=true; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;'
    window.confirm = jest.fn(() => false) // always click 'no'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))

    mockServices.fetchILS.mockImplementationOnce(() =>
      Promise.resolve({
        characteristic_id: 1,
        id: 1,
        input_dimension: 'test',
        input_value: 0,
        perception_dimension: 'sns',
        perception_value: 0,
        processing_dimension: 'test',
        processing_value: 0,
        understanding_dimension: 'test',
        understanding_value: 0
      })
    )

    const { getByTestId, rerender, getAllByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <OpenQuestionnaire />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await new Promise(process.nextTick)
    rerender(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <OpenQuestionnaire />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await act(async () => {
      const closeButton = getAllByRole('button')[0]
      fireEvent.click(closeButton)
    })
    await waitFor(() => {
      new Promise(process.nextTick)
      rerender(
        <MemoryRouter>
          <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
            <OpenQuestionnaire />
          </AuthContext.Provider>
        </MemoryRouter>
      )
      expect(getByTestId('Questions Modal')).toBeInTheDocument()
    })
  })

  test('PrivacyModal cookie is not set, but there is already ils data', () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))
    render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <OpenQuestionnaire />
      </AuthContext.Provider>
    )
    expect(document.cookie).toBeDefined()
  })

  test('PrivacyModal cookie is not set and there is no ils data', async () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))

    mockServices.fetchILS.mockImplementationOnce(() =>
      Promise.resolve({
        characteristic_id: 1,
        id: 1,
        input_dimension: 'test',
        input_value: 0,
        perception_dimension: 'sns',
        perception_value: 0,
        processing_dimension: 'test',
        processing_value: 0,
        understanding_dimension: 'test',
        understanding_value: 0
      })
    )

    const form = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <OpenQuestionnaire />
      </AuthContext.Provider>
    )
    expect(form).toBeDefined()
  })

  test('Questionnaire cookie is not set, but the fetchILS throws an error', async () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))

    mockServices.fetchILS.mockImplementationOnce(() => Promise.reject(new Error('error')))
    const form = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <OpenQuestionnaire />
      </AuthContext.Provider>
    )

    expect(form).toBeDefined()
  })

  test('Questionnaire closing after answering all Questions', async () => {
    document.cookie = 'privacy_accept_token=true; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;'
    window.confirm = jest.fn(() => true) // always click 'yes>'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))

    mockServices.fetchILS.mockImplementationOnce(() =>
      Promise.resolve({
        characteristic_id: 1,
        id: 1,
        input_dimension: 'test',
        input_value: 0,
        perception_dimension: 'sns',
        perception_value: 0,
        processing_dimension: 'test',
        processing_value: 0,
        understanding_dimension: 'test',
        understanding_value: 0
      })
    )

    const form = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <OpenQuestionnaire />
        </MemoryRouter>
      </AuthContext.Provider>
    )
    await new Promise(process.nextTick)
    form.rerender(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <OpenQuestionnaire />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const startButton = form.getByTestId('StartButtonQuestionnaire')

    expect(form.getByText('components.TableILSQuestions.introduction'))
    fireEvent.click(startButton)

    const nextButton = form.getByTestId('nextButtonILSQuestionnaire')
    const backButton = form.getByTestId('backButtonILSQuestionnaire')

    for (let i = 0; i < 11; i++) {
      const RadioButton1 = form
        .getByTestId('ilsLongQuestionnaireILSButtonGroup1')
        .querySelectorAll('input[type="radio"]')[0] as HTMLInputElement
      fireEvent.click(RadioButton1)

      const RadioButton2 = form
        .getByTestId('ilsLongQuestionnaireILSButtonGroup2')
        .querySelectorAll('input[type="radio"]')[1] as HTMLInputElement
      fireEvent.click(RadioButton2)

      const RadioButton3 = form
        .getByTestId('ilsLongQuestionnaireILSButtonGroup3')
        .querySelectorAll('input[type="radio"]')[0] as HTMLInputElement
      fireEvent.click(RadioButton3)

      const RadioButton4 = form
        .getByTestId('ilsLongQuestionnaireILSButtonGroup4')
        .querySelectorAll('input[type="radio"]')[1] as HTMLInputElement
      fireEvent.click(RadioButton4)

      expect(RadioButton1.checked).toBe(true)
      expect(RadioButton2.checked).toBe(true)
      expect(RadioButton3.checked).toBe(true)
      expect(RadioButton4.checked).toBe(true)

      if (i < 10) {
        fireEvent.click(nextButton)
      } else {
        const sendButton = form.getByTestId('sendButtonILSQuestionnaire')
        await act(async () => {
          fireEvent.click(sendButton)
        })
        fireEvent.click(form.getByTestId('QuestionnaireQuestionsModal-Close-Button'))
        await waitFor(() => {
          expect(form.queryByTestId('Questions Modal')).toBeNull()
        })
      }
    }
  }, 20000)
})
