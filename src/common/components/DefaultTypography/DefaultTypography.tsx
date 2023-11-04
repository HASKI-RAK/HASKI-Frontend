import { TypographyProps as DefaultTypographyProps } from '../DefaultTypographyProps/DefaultTypographyProps'
import { memo, useCallback, MouseEvent, ElementType, ReactElement } from 'react'
import DefaultTypography from '@mui/material/Typography'
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

const TextWrapper = memo(
  <C extends ElementType>({
    useStatement = _useStatement,
    ...props
  }: TextWrapperProps<C, { component?: C }>): ReactElement => {
    const { sendStatement } = useStatement({
      defaultComponentID: props.id,
      defaultComponent: xAPIComponent.Text
    })

    return (
      <DefaultTypography
        onClick={useCallback(
          (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
            sendStatement(xAPIVerb.clicked)
            props.onClick?.(event)
          },
          [props.onClick, sendStatement]
        )}
        {...props}>
        {props.children}
      </DefaultTypography>
    )
  }
)

TextWrapper.displayName = 'TextWrapper'
export { DefaultTypography as Typography, TextWrapper }
