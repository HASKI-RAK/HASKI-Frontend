import '@testing-library/jest-dom'
import { fireEvent, render, act, renderHook } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import Newsbanner from './Newsbanner'
import { MemoryRouter } from 'react-router-dom'
import { useUniversity } from '@common/hooks'

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
            language_id: 'de',
            news_content: 'Wir testen die Seite',
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
      expect(rerender).toContain('Wir testen die Seite')
      const closeButton = getByTestId('NewsBannerCloseButton')
      expect(closeButton).toBeInTheDocument()
    })
  })

  test('Close the open Newsbanner', async () => {
    mockServices.fetchNews.mockImplementation(() =>
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
      const closeButton = getByTestId('NewsBannerCloseButton')
      fireEvent.click(closeButton)
    })

    expect(container).toBeEmptyDOMElement()
  })

  test('Newsbanner has an error when fetching the News', () => {
    mockServices.fetchNews.mockImplementationOnce(() => {
      throw new Error('Error')
    })
    const { container } = render(<Newsbanner />)
    expect(container).toBeEmptyDOMElement()
  })

  test('Newsbanner has an error when fetching the University', async () => {
    mockServices.fetchUser.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    const { result } = renderHook(() => useUniversity(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })
    expect(await result.current.university).toBe('')
  })

  test('Newsbanner doesnt open because no news', () => {
    mockServices.fetchNews.mockImplementationOnce(() =>
      Promise.resolve({
        news: [{}]
      })
    )
    const { container } = render(<Newsbanner />)
    expect(container).toBeEmptyDOMElement()
  })
})
