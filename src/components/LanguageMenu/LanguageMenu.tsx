import LanguageIcon from '@mui/icons-material/Language'
import log from 'loglevel'
import { ForwardedRef, MouseEvent, forwardRef, memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@common/components'

/**
 * LanguageMenu component.
 *
 * @param props - Props containing a ref and other passed props.
 *
 * @remarks
 * The LanguageMenu component is a Button that opens a menu.
 * It allows users to change the language of the application.
 * The language currently set is stored in the local storage and will be shown next to the globe icon of the button.
 * LanguageMenu can be used as a standalone component on a page.
 *
 * @category Components
 */
export const LanguageMenu = forwardRef((props, ref: ForwardedRef<HTMLDivElement | null>) => {
  // Translation
  const { t, i18n } = useTranslation()

  // State
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('i18nextLng')?.toUpperCase())
  const [anchorElement, setAnchorElement] = useState<null | Element>(null)

  // Changes the language of the application by setting the i18next language and the local storage.
  const changeLanguage = useCallback(
    (key: string) => {
      try {
        i18n.changeLanguage(key)
        log.trace('The language was changed to: ' + key)
        localStorage.setItem('i18nextLng', key)
        setCurrentLanguage(localStorage.getItem('i18nextLng')?.toUpperCase())
      } catch (error: unknown) {
        log.error('The language could not be changed. Error Message: ' + error)
      }
    },
    [setCurrentLanguage]
  )

  // Handles opening the menu by setting the anchor element.
  const handleClick = useCallback((event: MouseEvent) => {
    setAnchorElement(event.currentTarget)
  }, [])

  // Handles closing the menu by setting the anchor element to null.
  const handleClose = useCallback(() => {
    setAnchorElement(null)
  }, [])

  return (
    <div {...props} ref={ref}>
      <Tooltip arrow title={t('tooltip.languageSettings')}>
        <IconButton id="language-menu-icon-button" onClick={handleClick}>
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
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!!anchorElement}
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

export default memo(LanguageMenu)

// eslint-disable-next-line immutable/no-mutation
LanguageMenu.displayName = 'LanguageMenu'
