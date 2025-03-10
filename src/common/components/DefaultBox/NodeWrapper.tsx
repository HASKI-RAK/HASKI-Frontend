import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { memo,  useMemo } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import { Box } from './DefaultBox'

// TODO: DOKU
type NodeWrapperProps = DefaultBoxProps & EventHandlers

// TODO: DOKU
const NodeWrapper = ({ ...props }: NodeWrapperProps) => {
  const { pageName } = usePageName()

  const WrappedNodeWrapper = useMemo(
    () =>
      withXAPI(Box, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Node',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedNodeWrapper {...props} />
}

export default memo(NodeWrapper)
