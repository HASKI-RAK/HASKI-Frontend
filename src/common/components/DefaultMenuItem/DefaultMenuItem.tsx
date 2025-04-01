import DefaultMenuItem from '@mui/material/MenuItem'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  memo, useMemo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { MenuItemProps as DefaultMenuItemProps } from '@common/components'

// TODO: DOKU
type MenuItemProps = DefaultMenuItemProps & EventHandlers

// TODO: DOKU
const MenuItem = ({ ...props }: MenuItemProps) => {
  const { pageName } = usePageName()

  const WrappedMenuItem = useMemo(() => withXAPI(DefaultMenuItem, {
    componentFilePath: new URL(import.meta.url).pathname,
    componentType: 'MenuItem',
    pageName
  }), [pageName])

  return <WrappedMenuItem {...props} />
}

export default memo(MenuItem)
