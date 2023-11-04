import { BoxProps as DefaultBoxProps } from '@common/components'
import React, { MouseEvent, memo, useCallback, Component, ReactElement } from 'react'
import DefaultBox from '@mui/material/Box'
import {
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn,
  xAPIComponent,
  xAPIVerb
} from '@services'

type BoxProps = DefaultBoxProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Box = ({ useStatement = _useStatement, ...props }): ReactElement<BoxProps> => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Box
  })

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      sendStatement(xAPIVerb.clicked)

      if (props.onClick) {
        props.onClick(event)
      }
    },
    [props.onClick, sendStatement]
  )

  return (
    <DefaultBox onClick={handleClick} {...props}>
      {props.children}
    </DefaultBox>
  )
}

export default memo(Box)

// NodeWrapper
// ImageWrapper
// TextWrapper
