import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import {memo,  useMemo } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import { Box } from './DefaultBox'

// TODO: DOKU
type ImageWrapperProps = DefaultBoxProps & EventHandlers

// TODO: DOKU
const ImageWrapper = ({ ...props }: ImageWrapperProps) => {
  const { pageName } = usePageName()
  const WrappedImageWrapper = useMemo(
    () =>
      withXAPI<ImageWrapperProps>(Box, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'ImageWrapper',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedImageWrapper {...props} />
}

export default memo(ImageWrapper)
