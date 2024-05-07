import DefaultButton from '@mui/material/Button'
import { MouseEvent, RefObject, forwardRef, memo, useCallback } from 'react'
import { ButtonProps as DefaultButtonProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultButtonProps - The props of a mui Button.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
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
const Button = (
  { useStatement = _useStatement, onClick, ...props }: ButtonProps,
  ref: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined
) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Button
  })
  //
  //ref={ref}
  return (
    <DefaultButton
      ref={ref}
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}>
      {props.children}
    </DefaultButton>
  )
}

export default memo(forwardRef(Button))
