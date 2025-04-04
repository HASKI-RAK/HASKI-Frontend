import { usePageName } from 'src/services/PageName/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import {ElementType, memo } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import { Box } from './DefaultBox'

// TODO: DOKU
type ImageWrapperProps<C extends ElementType, P = object> = DefaultBoxProps<C, P> & EventHandlers

// TODO: DOKU
const WrappedImageWrapper = withXAPI(Box, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'ImageWrapper'
})

// TODO: DOKU
const ImageWrapper = <C extends ElementType>({ ...props }: ImageWrapperProps<C, {alt?: string}>) => {
  const { pageName } = usePageName()
  return <WrappedImageWrapper pageName={pageName} {...props} />
}

export default memo(ImageWrapper)
