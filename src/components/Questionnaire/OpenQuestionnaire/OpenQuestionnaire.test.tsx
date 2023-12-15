import { fireEvent, render } from '@testing-library/react'
import { OpenQuestionnaire } from '@components'
import { AuthContext } from '@services'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'

describe('OpenQuestionnaire', () => {
  test('Standard OpenQuestionnaire functionality', () => {
    render(<OpenQuestionnaire />)
  })

  test('Questionnaire gets closed and reloads', async () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'privacy_accept_token=true; expires=Thu, 01 Jan 2070 00:00:00 UTC; path=/;'

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
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <OpenQuestionnaire />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    await new Promise(process.nextTick)
    form.rerender(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <OpenQuestionnaire />
        </AuthContext.Provider>
      </MemoryRouter>
    )
    const closeButton = form.getAllByRole('button')[0]
    fireEvent.click(closeButton)
  })

  test('PrivacyModal cookie is not set, but there is already ils data', () => {
    document.cookie = 'questionnaire_sent_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    jest.mock('react-cookie', () => ({
      useCookies: () => [jest.fn(), jest.fn()]
    }))
    const form = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <OpenQuestionnaire />
      </AuthContext.Provider>
    )
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
  })

  test('PrivacyModal cookie is not set, but the fetcILS throws an error', async () => {
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
  })
})
