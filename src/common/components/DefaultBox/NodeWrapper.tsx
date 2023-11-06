import { BoxProps as DefaultBoxProps } from '@common/components'
import { MouseEvent, memo, useCallback } from 'react'
import { Box } from './DefaultBox'
import log from 'loglevel'
import {
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn,
  xAPIComponent,
  xAPIVerb
} from '@services'

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
const NodeWrapper = ({ useStatement = _useStatement, ...props }: NodeWrapperProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Node
  })

  return (
    <Box
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          props.onClick?.(event)
        },
        [props.onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </Box>
  )
}

export default memo(NodeWrapper)
