import { ElementType, MouseEvent, ReactElement, memo, useCallback } from 'react'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'
import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { Typography } from './DefaultTypography'

/**
 * @prop DefaultTypographyProps - The props of a mui Typography.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
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
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
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
