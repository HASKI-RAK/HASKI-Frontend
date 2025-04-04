import DefaultFab from '@mui/material/Fab'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { memo } from 'react'
import { FabProps as DefaultFabProps } from '@common/components'

// TODO: DOKU
type FabProps = DefaultFabProps & EventHandlers

// TODO: Doku
const WrappedFab = withXAPI(DefaultFab, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'Fab'
    })

// TODO: DOKU
const Fab = ({ ...props }: FabProps) => {
  const { pageName } = usePageName()
  return <WrappedFab pageName={pageName} {...props} />
}

export default memo(Fab)
