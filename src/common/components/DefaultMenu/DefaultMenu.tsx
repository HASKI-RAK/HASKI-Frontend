import DefaultMenu from '@mui/material/Menu'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { memo, useMemo } from 'react'
import { MenuProps as DefaultMenuProps } from '@common/components'

type MenuProps = DefaultMenuProps & EventHandlers

const Menu = ({ ...props }: MenuProps) => {
  const { pageName } = usePageName()

  const WrappedMenu = useMemo(
    () =>
      withXAPI(DefaultMenu, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Menu',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedMenu {...props} />
}

export default memo(Menu)
