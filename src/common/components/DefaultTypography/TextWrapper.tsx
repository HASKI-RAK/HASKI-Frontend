import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  ElementType, memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { Typography } from './DefaultTypography'

// TODO: DOKU
type TextWrapperProps<C extends ElementType, P = object> = DefaultTypographyProps<C, P> & EventHandlers

// TODO: DOKU
const TextWrapper = <C extends ElementType>({ ...props }: TextWrapperProps<C, { component?: C}>) => {
  const { pageName } = usePageName()

  const WrappedComponent = withXAPI(Typography, {
    componentFilePath: new URL(import.meta.url).pathname,
    pageName,
    componentType: 'TextWrapper'
  })

  return <WrappedComponent {...props} />
}

export default memo(TextWrapper)
