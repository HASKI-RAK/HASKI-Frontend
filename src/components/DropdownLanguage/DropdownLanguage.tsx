﻿import { useTranslation } from 'react-i18next'
import { DefaultSelect as Select } from '@common/components'
import { MenuItem } from '@mui/material'
import log from 'loglevel'
import {useContext} from "react";
import {SnackbarContext} from "@services";

/**
 * DropdownLanguage is a dropdown menu that allows the user to change the language of the application.
 * 
 * @remarks
 * The language is stored in the local storage and is used to set the language of the application.
 * ```ts 
import {useTranslation} from "react-i18next";
                                             
export const Text = () => {
    const {t, i18n} = useTranslation();
    return(
        <div>
            <div>
                Current Language: {i18n.language} <br/>
                {(t("previousText"))} <br/>
                {(t("nextText"))} <br/>
                {(t("spellcheckText"))} <br/>
           </div>
        </div>
    )
};
```
| Language: German | Language: English |
|--|--|
| <img src="https://user-images.githubusercontent.com/92084464/207361066-d8aafa32-7506-4fdd-9242-f2356a4f6d0c.png" width="150"/> | <img src="https://user-images.githubusercontent.com/92084464/207364081-736c6f37-db9a-4db5-9ca7-5432788e072e.png" width="150"/> |
If a component uses i18n or useTranslation(), then i18n must be mocked in the corresponding Jest test. The mock is placed above the describe statement.
```ts
jest.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key:string) => key})
}));
```
 * @returns {JSX.Element} - The DropdownLanguage component.
 */
export const DropdownLanguage = () => {
    //snackbar
    const { addSnackbar } = useContext(SnackbarContext)
    const { t } = useTranslation()

  log.setLevel('error')
  const { i18n } = useTranslation()
  const startingLanguage = localStorage.getItem('i18nextLng') as string
  const onClickLanguageChange = (e: { target: { value: string } }) => {
    try {
      i18n.changeLanguage(e.target.value)
      log.trace('The language was changed to: ' + e.target.value)
      localStorage.setItem('i18nextLng', e.target.value)
        addSnackbar({severity: 'success', message: t('components.DropdownLanguage.ChangeSuccess'), autoHideDuration: 3000})
    } catch (e: unknown) {
      log.error('The language could not be changed. Error Message: ' + e)
        addSnackbar({severity: 'error', message: t('components.DropdownLanguage.ChangeFailure'), autoHideDuration: 5000})
    }
  }

  return (
    <div>
      <Select
        className="LanguageDropdown"
        autoWidth={true}
        value={startingLanguage}
        inputProps={{ 'data-testid': 'LanguageDropdown' }}
        onChange={onClickLanguageChange}>
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </div>
  )
}
