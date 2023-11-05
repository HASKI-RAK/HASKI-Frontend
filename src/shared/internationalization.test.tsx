//Local Storage should be changed before importing i18n config file.
//That way we can access the else statement in the i18n config file.
import { act, render } from '@testing-library/react'
import { Select, MenuItem } from '@common/components'
import i18next from './internationalization' // your i18n config file
import { I18nextProvider, useTranslation } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'

describe('i18n test', () => {
  localStorage.setItem('i18nextLng', 'en')
  const ArrangeElement = () => {
    const { i18n } = useTranslation()
    const startingLanguage = localStorage.getItem('i18nextLng') as string

    const onClickLanguageChange = (e: { target: { value: string } }) => {
      i18n.changeLanguage(e.target.value)
      localStorage.setItem('i18nextLng', e.target.value)
    }

    return (
      <Select
        className="LanguageDropdown"
        autoWidth={true}
        defaultValue={startingLanguage}
        onChange={onClickLanguageChange}>
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    )
  }

  test('local storage null', () => {
    localStorage.removeItem('i18nextLng')
    // actually give translation to your component
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          {' '}
          <ArrangeElement />
        </I18nextProvider>
      </MemoryRouter>
    )
    // example if you have a key called example
    expect(i18next.language).toBe('de')
  })

  test('language can be changed', () => {
    // actually give translation to your component
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          {' '}
          <ArrangeElement />
        </I18nextProvider>
      </MemoryRouter>
    )
    // example if you have a key called example
    act(() => {
      i18next.changeLanguage('de')
    })
    expect(i18next.language).toBe('de')

    act(() => {
      i18next.changeLanguage('en')
    })

    expect(i18next.language).toBe('en')
  })

  test('language can be changed', () => {
    localStorage.setItem('i18nextLng', 'en')
    // actually give translation to your component
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18next}>
          <ArrangeElement />
        </I18nextProvider>
      </MemoryRouter>
    )
    // example if you have a key called example

    expect(i18next.language).toBe('en')
  })
})
