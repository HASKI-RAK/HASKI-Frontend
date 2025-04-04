import DefaultMenu from '@mui/material/Menu'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { memo } from 'react'
import { MenuProps as DefaultMenuProps } from '@common/components'

// TODO: Dokuq
type MenuProps = DefaultMenuProps & EventHandlers

// TODO: Doku
const WrappedMenu = withXAPI(DefaultMenu, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'Menu'
})

// TODO: Doku
const Menu = ({ ...props }: MenuProps) => {
  const { pageName } = usePageName()
  return <WrappedMenu pageName={pageName} {...props} />
}

export default memo(Menu)
