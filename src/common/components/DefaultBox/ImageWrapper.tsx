import { ElementType, MouseEvent, ReactElement, memo, useCallback } from 'react'
import { BoxProps as DefaultBoxProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'
import { Box } from './DefaultBox'

/**
 * @prop DefaultBoxProps - The props of a mui Box.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type ImageWrapperProps<C extends ElementType, P = object> = DefaultBoxProps<C, P> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * ImageWrapper component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Box.
 *
 * @category Common
 */
const ImageWrapper = <C extends ElementType>({
  useStatement = _useStatement,
  onClick,
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
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
          onClick?.(event)
        },
        [onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </Box>
  )
}

export default memo(ImageWrapper)
