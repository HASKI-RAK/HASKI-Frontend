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

type TextFieldProps = DefaultTextFieldProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const TextField = ({ useStatement = _useStatement, ...props }: TextFieldProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.TextField
  })

  return (
    <DefaultTextField
      onChange={useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          sendStatement(xAPIVerb.changed).catch((reason) => log.error(reason))
          props.onChange?.(event)
        },
        [sendStatement, props.onChange]
      )}
      {...props}>
      {props.children}
    </DefaultTextField>
  )
}

export default memo(TextField)
