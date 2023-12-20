import { IconButtonProps as DefaultIconButtonProps } from '@common/components'
import DefaultIconButton from '@mui/material/IconButton'
import { MouseEvent, memo, useCallback } from 'react'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

/**
 * @prop DefaultIconButtonProps - The props of a mui IconButton.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type IconButtonProps = DefaultIconButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * IconButton component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui IconButton.
 *
 * @category Common
 */
const IconButton = ({ useStatement = _useStatement, onClick, ...props }: IconButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.IconButton
  })

  return (
    <DefaultIconButton
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
          onClick?.(event)
        },
        [onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </DefaultIconButton>
  )
}

export default memo(IconButton)
