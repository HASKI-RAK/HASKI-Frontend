import DefaultTextField from '@mui/material/TextField'
import { ChangeEvent, memo, useCallback } from 'react'
import { TextFieldProps as DefaultTextFieldProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultTextFieldProps - The props of a mui TextField.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type TextFieldProps = DefaultTextFieldProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * TextField component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui TextField.
 *
 * @category Common
 */
const TextField = ({ useStatement = _useStatement, onChange, ...props }: TextFieldProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.TextField
  })

  return (
    <DefaultTextField
      onChange={useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          sendStatement(xAPIVerb.changed, new URL(import.meta.url).pathname)
          onChange?.(event)
        },
        [sendStatement, onChange]
      )}
      {...props}>
      {props.children}
    </DefaultTextField>
  )
}

export default memo(TextField)
