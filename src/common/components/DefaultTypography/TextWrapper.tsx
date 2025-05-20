import { ElementType, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { usePageName } from 'src/services/PageName/PageName.hooks'

import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { Typography } from './DefaultTypography'

/**
 * @prop {@link DefaultTypographyProps} - The props of the default Typography component.
 * @prop {@link EventHandlers} - The props containing the event handlers.
 * @interface
 */
type TextWrapperProps<C extends ElementType, P = object> = DefaultTypographyProps<C, P> & EventHandlers

/**
 * WrappedTextWrapper component.
 *
 * @remarks
 * The WrappedTextWrapper component is a wrapper around the MUI Typography component.
 * It is enhanced with xAPI functionality to track user interactions.
 * WrappedTextWrapper can be used as a standalone component on a page.
 *
 * @category Components
 */
const WrappedTextWrapper = withXAPI(Typography, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'TextWrapper'
})

/**
 * TextWrapper component.
 *
 * @param props - Props containing the default Typography props and event handlers.
 *
 * @remarks
 * The TextWrapper component is a wrapper around the WrappedTextWrapper component.
 * It retrieves the page name from a hook and passes it to the WrappedTextWrapper component.
 * TextWrapper can be used as a standalone component on a page.
 *
 * @category Components
 */
const TextWrapper = <C extends ElementType>({ ...props }: TextWrapperProps<C, { component?: C }>) => {
  const { pageName } = usePageName()
  return <WrappedTextWrapper pageName={pageName} {...props} />
}

export default memo(TextWrapper)
