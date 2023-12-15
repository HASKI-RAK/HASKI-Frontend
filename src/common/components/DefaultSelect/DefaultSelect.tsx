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

/**
 * @prop DefaultSelectProps - The props of a mui Select.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type SelectProps<T> = DefaultSelectProps<T> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Select component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Select.
 *
 * @category Common
 */
const Select = <T, K extends T>({ useStatement = _useStatement, onClick, onChange, ...props }: SelectProps<K>) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Select
  })

  return (
    <DefaultSelect
      {...props}
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname).catch((reason) => log.error(reason))
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      onChange={useCallback(
        (event: SelectChangeEvent<K>, child: ReactNode) => {
          sendStatement(xAPIVerb.changed, new URL(import.meta.url).pathname).catch((reason) => log.error(reason))
          onChange?.(event, child)
        },
        [sendStatement, onChange]
      )}>
      {props.children}
    </DefaultSelect>
  )
}

// No memo, because Select cannot be wrapped
export default Select
