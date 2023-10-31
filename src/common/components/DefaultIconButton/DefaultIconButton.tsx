import { IconButtonProps as DefaultIconButtonProps } from '@common/components'
import DefaultIconButton from '@mui/material/IconButton'
import { MouseEvent, memo, useCallback } from 'react'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type IconButtonProps = DefaultIconButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const IconButton = ({ useStatement = _useStatement, ...props }: IconButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.IconButton
  })

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      // Send statement on every icon button click
      sendStatement(xAPIVerb.clicked)

      if (props.onClick) {
        props.onClick(event)
      }
    },
    [props.onClick, sendStatement]
  )

  return (
    <DefaultIconButton onClick={handleClick} {...props}>
      {props.children}
    </DefaultIconButton>
  )
}

export default memo(IconButton)
