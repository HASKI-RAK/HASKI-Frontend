import '@testing-library/jest-dom'
import { fireEvent, render, act, renderHook } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import Newsbanner from './Newsbanner'
import { MemoryRouter } from 'react-router-dom'
import { UniversityCheck } from '@common/utils'
import { LanguageMenu } from '@components'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import { useNewsbanner, NewsbannerHookReturn } from './Newsbanner.hooks'
import React from 'react'
import { SnackbarContextType } from '@services'

describe('Newsbanner tests', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  test('Newsbanner is open', async () => {
    mockServices.fetchNews = jest.fn().mockImplementation(() =>
      Promise.resolve({
        news: [
          {
            date: 'Thu, 13 Jul 2023 16:00:00 GMT',
            expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
            id: 1,
            language_id: 'en',
            news_content: 'We are currently testing the site',
            university: 'TH-AB'
          }
        ]
      })
    )

    const { getByTestId, rerender } = render(
        
      <MemoryRouter>
        <Newsbanner />
      </MemoryRouter>
    )

    await new Promise(process.nextTick)

    rerender(
      <MemoryRouter>
        <Newsbanner />
      </MemoryRouter>
    )

    await new Promise(process.nextTick)

    rerender(
      <MemoryRouter>
        <Newsbanner />
      </MemoryRouter>
    )
    await act(async () => {
      const closeButton = getByTestId('IconButton')
      expect(closeButton).toBeInTheDocument()
    })
  })

  test('Close the open Newsbanner', async () => {
    mockServices.fetchNews = jest.fn().mockImplementation(() =>
      Promise.resolve({
        news: [
          {
            date: 'Thu, 13 Jul 2023 16:00:00 GMT',
            expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
            id: 1,
            language_id: 'en',
            news_content: 'We are currently testing the site',
            university: 'TH-AB'
          }
        ]
      })
    )

    const { container, getByTestId, rerender } = render(
      <MemoryRouter>
        <Newsbanner />
      </MemoryRouter>
    )

    await new Promise(process.nextTick)

    rerender(
      <MemoryRouter>
        <Newsbanner />
      </MemoryRouter>
    )

    await new Promise(process.nextTick)

    rerender(
      <MemoryRouter>
        <Newsbanner />
      </MemoryRouter>
    )

    await act(async () => {
      const closeButton = getByTestId('IconButton')
      fireEvent.click(closeButton)
    })
  })

  test('Newsbanner has an error when fetching the News', () => {
    mockServices.fetchNews = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error')
    })
    const form = render(<Newsbanner />)
  })

  test('Newsbanner has an error when fetching the University', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error')
    })

    const { result } = renderHook(() => UniversityCheck(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })
    expect(await result.current.checkUniversity()).toBe('')
  })

  test('Newsbanner doesnt open because no news', () => {
    mockServices.fetchNews = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        news: [{}]
      })
    )
    const form = render(<Newsbanner />)
  })
})
