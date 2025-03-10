import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  memo } from 'react'
import { EventHandlers, withXAPI } from 'react-xapi-wrapper'
import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { Typography } from './DefaultTypography'

// TODO: DOKU
type TextWrapperProps = DefaultTypographyProps & EventHandlers

// TODO: DOKU
const TextWrapper = ({ ...props }: TextWrapperProps) => {
  const { pageName } = usePageName()

  const WrappedComponent = withXAPI(Typography, {
    componentFilePath: new URL(import.meta.url).pathname,
    pageName,
    componentType: 'TextWrapper'
  })

  return <WrappedComponent {...props} />
}

export default memo(TextWrapper)
