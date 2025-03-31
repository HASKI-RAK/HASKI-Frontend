import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import {ElementType, memo,  useMemo } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import { Box } from './DefaultBox'

// TODO: DOKU
type ImageWrapperProps<C extends ElementType, P = object> = DefaultBoxProps<C, P> & EventHandlers

// TODO: DOKU
const ImageWrapper = <C extends ElementType>({ ...props }: ImageWrapperProps<C, {alt?: string}>) => {
  const { pageName } = usePageName()
  const WrappedImageWrapper = useMemo(
    () =>
      withXAPI(Box, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'ImageWrapper',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedImageWrapper {...props} />
}

export default memo(ImageWrapper)
