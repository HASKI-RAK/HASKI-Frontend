import LanguageIcon from '@mui/icons-material/Language'
import log from 'loglevel'
import { ForwardedRef, forwardRef, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@common/components'

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
 * @returns - The DropdownLanguage component.
 */
export const LanguageMenu = forwardRef((props, ref: ForwardedRef<HTMLDivElement | null>) => {
  // Translation
  const { t, i18n } = useTranslation()

  // State
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('i18nextLng')?.toUpperCase())

  // TODO: Comment
  const changeLanguage = (key: string) => {
    try {
      i18n.changeLanguage(key)
      log.trace('The language was changed to: ' + key)
      localStorage.setItem('i18nextLng', key)
      setCurrentLanguage(localStorage.getItem('i18nextLng')?.toUpperCase())
    } catch (error: unknown) {
      log.error('The language could not be changed. Error Message: ' + error)
    }
  }

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  //
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  //
  const handleClose = () => {
    setAnchorElUser(null)
  }

  return (
    <div {...props} ref={ref}>
      <Tooltip arrow title={t('tooltip.languageSettings')}>
        <IconButton id="language-menu-icon-button" onClick={handleOpen}>
          <Typography
            sx={{
              fontWeight: 'bold',
              position: 'absolute',
              padding: { left: '1.7rem', bottom: '1.25rem' }
            }}
            variant="body1"
            textAlign="center">
            {currentLanguage}
          </Typography>
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="language-menu"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!!anchorElUser}
        onClose={handleClose}>
        <MenuItem id="de-menu-item" onClick={() => changeLanguage('de')}>
          <Typography textAlign="center">Deutsch</Typography>
        </MenuItem>
        <MenuItem id="en-menu-item" onClick={() => changeLanguage('en')}>
          <Typography textAlign="center">English</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
})

// eslint-disable-next-line immutable/no-mutation
LanguageMenu.displayName = 'LanguageMenu'

export default memo(LanguageMenu)
