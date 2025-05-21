import { ElementType, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'

import { BoxProps as DefaultBoxProps } from '@common/components'
import { usePageName } from '@services'

import { Box } from './DefaultBox'


/**
 * @prop {@link DefaultBoxProps} - The props of the default Box component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type ImageWrapperProps<C extends ElementType, P = object> = DefaultBoxProps<C, P> & EventHandlers

/**
 * WrappedImageWrapper component.
 *
 * @remarks
 * The WrappedImageWrapper component is a wrapper around the MUI Box component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedImageWrapper can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedImageWrapper = withXAPI(Box, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'ImageWrapper'
})

/**
 * ImageWrapper component.
 *
 * @param props - Props containing the default Box props and event handlers.
 *
 * @remarks
 * The ImageWrapper component is a wrapper around the WrappedImageWrapper component.
 * It retrieves the page name from a hook and passes it to the WrappedImageWrapper component.
 * ImageWrapper can be used as a standalone component on a page.
 *
 * @category Components
 */
const ImageWrapper = <C extends ElementType>({ ...props }: ImageWrapperProps<C, { alt?: string }>) => {
  const { pageName } = usePageName()
  return <WrappedImageWrapper pageName={pageName} {...props} />
}

export default memo(ImageWrapper)
