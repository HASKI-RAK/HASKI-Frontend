import DefaultMenuItem from '@mui/material/MenuItem'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { MenuItemProps as DefaultMenuItemProps } from '@common/components'

// TODO: DOKU
type MenuItemProps2 = DefaultMenuItemProps & EventHandlers

// TODO: DOKU
const MenuItem2 = ({ ...props }: MenuItemProps2) => {
  const { pageName } = usePageName()

  const WrappedMenuItem = withXAPI(DefaultMenuItem, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'MenuItem',
    pageName
  })

  return <WrappedMenuItem {...props} />
}

export default memo(MenuItem2)
