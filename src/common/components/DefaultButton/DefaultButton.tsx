import { ButtonProps as DefaultButtonProps } from '@common/components'
import { memo, useCallback, MouseEvent } from 'react'
import DefaultButton from '@mui/material/Button'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

/**
 * @prop DefaultButtonProps - The props of a mui Button.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 */
type ButtonProps = DefaultButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Button component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Button.
 *
 * @category Common
 */
const Button = ({ useStatement = _useStatement, onClick, ...props }: ButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Button
  })

  return (
    <DefaultButton
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname).catch((reason) => log.error(reason))
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}>
      {props.children}
    </DefaultButton>
  )
}

export default memo(Button)
