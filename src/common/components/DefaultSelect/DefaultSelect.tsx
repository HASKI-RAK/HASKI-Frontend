import { SelectProps as DefaultSelectProps, SelectChangeEvent } from '@common/components'
import { useCallback, MouseEvent, ReactNode } from 'react'
import DefaultSelect from '@mui/material/Select'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type SelectProps<T> = DefaultSelectProps<T> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Select = <T, K extends T>({ useStatement = _useStatement, ...props }: SelectProps<K>) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Select
  })

  return (
    <DefaultSelect
      {...props}
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      onChange={useCallback(
        (event: SelectChangeEvent<K>, child: ReactNode) => {
          sendStatement(xAPIVerb.changed).catch((reason) => log.error(reason))
          props.onChange?.(event, child)
        },
        [sendStatement, props.onChange]
      )}>
      {props.children}
    </DefaultSelect>
  )
}

// No memo, because Select cannot be wrapped
export default Select
