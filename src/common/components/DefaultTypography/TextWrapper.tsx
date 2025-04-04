import { usePageName } from 'src/services/PageName/PageName.hooks'
import {  ElementType, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { Typography } from './DefaultTypography'

// TODO: DOKU
type TextWrapperProps<C extends ElementType, P = object> = DefaultTypographyProps<C, P> & EventHandlers

// TODO: DOKU
const WrappedTextWrapper = withXAPI(Typography, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'TextWrapper'
})

// TODO: DOKU
const TextWrapper = <C extends ElementType>({ ...props }: TextWrapperProps<C, { component?: C}>) => {
  const { pageName } = usePageName()
  return <WrappedTextWrapper pageName={pageName} {...props} />
}

export default memo(TextWrapper)
