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

  return (
    <DefaultIconButton
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
          props.onClick?.(event)
        },
        [props.onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </DefaultIconButton>
  )
}

export default memo(IconButton)
