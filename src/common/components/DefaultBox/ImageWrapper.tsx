import { MouseEvent, memo, useCallback, ReactElement, ElementType } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import { Box } from './DefaultBox'
import {
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn,
  xAPIComponent,
  xAPIVerb
} from '@services'

type ImageWrapperProps<C extends ElementType, P = object> = DefaultBoxProps<C, P> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const ImageWrapper = <C extends ElementType>({
  useStatement = _useStatement,
  ...props
}: ImageWrapperProps<C, { alt?: string }>): ReactElement => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Image
  })

  return (
    <Box
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
          props.onClick?.(event)
        },
        [props.onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </Box>
  )
}

export default memo(ImageWrapper)
