import { usePageName } from 'src/services/PageName/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { memo } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import { Box } from './DefaultBox'

// TODO: DOKU
type NodeWrapperProps = DefaultBoxProps & EventHandlers

// TODO: DOKU
const WrappedNodeWrapper = withXAPI(Box, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'Node',
})

// TODO: DOKU
const NodeWrapper = ({ ...props }: NodeWrapperProps) => {
  const { pageName } = usePageName()
  return <WrappedNodeWrapper pageName={pageName} {...props} />
}

export default memo(NodeWrapper)
