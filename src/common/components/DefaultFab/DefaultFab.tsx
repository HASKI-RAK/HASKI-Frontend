import DefaultFab from '@mui/material/Fab'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { memo, useMemo } from 'react'
import { FabProps as DefaultFabProps } from '@common/components'

// TODO: DOKU
type FabProps = DefaultFabProps & EventHandlers

// TODO: DOKU
const Fab = ({ ...props }: FabProps) => {
  const { pageName } = usePageName()
  const WrappedComponent = useMemo(
    () =>
      withXAPI(DefaultFab, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Fab',
        pageName: pageName
      }),
    [pageName]
  )
  return <WrappedComponent {...props} />
}

export default memo(Fab)
