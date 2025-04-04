import DefaultMenuItem from '@mui/material/MenuItem'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import {  memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { MenuItemProps as DefaultMenuItemProps } from '@common/components'

// TODO: DOKU
type MenuItemProps = DefaultMenuItemProps & EventHandlers

// TODO : DOKU
const WrappedMenuItem = withXAPI(DefaultMenuItem, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'MenuItem'
})

// TODO: DOKU
const MenuItem = ({ ...props }: MenuItemProps) => {
  const { pageName } = usePageName()
  return <WrappedMenuItem pageName={pageName} {...props} />
}

export default memo(MenuItem)
