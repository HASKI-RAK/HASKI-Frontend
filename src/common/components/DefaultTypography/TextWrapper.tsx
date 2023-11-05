import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { memo, useCallback, MouseEvent, ElementType, ReactElement } from 'react'
import { Typography } from './DefaultTypography'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type TextWrapperProps<C extends ElementType, P = object> = DefaultTypographyProps<C, P> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const TextWrapper = <C extends ElementType>({
  useStatement = _useStatement,
  ...props
}: TextWrapperProps<C, { component?: C }>): ReactElement => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Text
  })

  return (
    <Typography
      onClick={useCallback(
        (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          props.onClick?.(event)
        },
        [props.onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </Typography>
  )
}

export default memo(TextWrapper)
