import { TextFieldProps as DefaultTextFieldProps } from '@common/components'
import DefaultTextField from '@mui/material/TextField'
import { memo, useCallback, ChangeEvent } from 'react'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
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
