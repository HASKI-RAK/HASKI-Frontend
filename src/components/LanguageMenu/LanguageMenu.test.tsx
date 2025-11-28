import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { LanguageMenu } from '@components'

describe('[HASKI-REQ-0038] Language menu tests', () => {
  it('renders correctly', () => {
    const languageMenu = render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <LanguageMenu />
        </I18nextProvider>
      </MemoryRouter>
    )

    expect(languageMenu).toBeTruthy()
  })

  test('functionality', () => {
    const { getByRole, queryAllByRole } = render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <LanguageMenu />
        </I18nextProvider>
      </MemoryRouter>
    )
    expect(queryAllByRole('menuitem').length).toStrictEqual(0)

    fireEvent.click(getByRole('button'))
    expect(queryAllByRole('menuitem').length).toStrictEqual(2)
    expect(localStorage.getItem('i18nextLng')).toBeNull()

    fireEvent.click(queryAllByRole('menuitem')[1])
    expect(localStorage.getItem('i18nextLng')).toContain('en')

    fireEvent.click(queryAllByRole('menuitem')[0])
    expect(localStorage.getItem('i18nextLng')).toContain('de')

    fireEvent.click(getByRole('presentation').children[0])
    expect(queryAllByRole('menuitem').length).toStrictEqual(0)
  })

  test('Language change fails', () => {
    const localStorageMock = {
      getItem: jest.fn().mockImplementationOnce((key) => {
        if (key === 'i18nextLng') {
          return 'de'
        }
        return null
      }),
      setItem: jest.fn().mockImplementationOnce(() => {
        throw new Error('Error')
      })
    }

    // Replace the real localStorage object with our mock object
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock
    })

    const { getByRole, queryAllByRole } = render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <LanguageMenu />
        </I18nextProvider>
      </MemoryRouter>
    )

    expect(queryAllByRole('menuitem').length).toStrictEqual(0)

    fireEvent.click(getByRole('button'))
    expect(queryAllByRole('menuitem').length).toStrictEqual(2)

    fireEvent.click(queryAllByRole('menuitem')[1])
    expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en')
  })
})
