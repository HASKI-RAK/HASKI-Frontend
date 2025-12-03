import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { usePageName } from './PageName.hooks'

beforeEach(() => {
  jest.resetModules()
  jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      i18n: {
        getFixedT: () => (key: string) => key.replace('pages.', '')
      }
    })
  }))
})

describe('Test usePageName [HASKI-REQ-0086]', () => {
  test('Retrieve the page name with empty location', async () => {
    const { result } = renderHook(() => usePageName(), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['']}>{children}</MemoryRouter>
    })
    expect(result.current.pageName).toEqual('')
  })

  test('Retrieve the page name with course as location', async () => {
    const { result } = renderHook(() => usePageName(), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/course']}>{children}</MemoryRouter>
    })

    waitFor(() => {
      expect(result.current.pageName).toEqual('course')
    })
  })

  test('Retrieve the page name with course 1 as location', async () => {
    const { result } = renderHook(() => usePageName(), {
      wrapper: ({ children }) => <MemoryRouter initialEntries={['/course/1']}>{children}</MemoryRouter>
    })

    waitFor(() => {
      expect(result.current.pageName).toEqual('course')
    })
  })
})
