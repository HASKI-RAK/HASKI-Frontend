import { BoxProps as DefaultBoxProps } from '@common/components'
import { MouseEvent, memo, useCallback } from 'react'
import { Box } from './DefaultBox'
import {
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn,
  xAPIComponent,
  xAPIVerb
} from '@services'

type NodeWrapperProps = DefaultBoxProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const NodeWrapper = ({ useStatement = _useStatement, ...props }: NodeWrapperProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Node
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

export default memo(NodeWrapper)
