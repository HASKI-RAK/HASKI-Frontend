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

/**
 * @prop DefaultTypographyProps - The props of a mui Typography.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 */
type TextWrapperProps<C extends ElementType, P = object> = DefaultTypographyProps<C, P> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * TextWrapper component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Typography.
 *
 * @category Common
 */
const TextWrapper = <C extends ElementType>({
  useStatement = _useStatement,
  onClick,
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
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname).catch((reason) => log.error(reason))
          onClick?.(event)
        },
        [onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </Typography>
  )
}

export default memo(TextWrapper)
