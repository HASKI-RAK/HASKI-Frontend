import { MouseEvent, memo, useCallback } from 'react'
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
type NodeWrapperProps = DefaultBoxProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * NodeWrapper component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Box.
 *
 * @category Common
 */
const NodeWrapper = ({ useStatement = _useStatement, onClick, ...props }: NodeWrapperProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Node
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

export default memo(NodeWrapper)
