import { SelectProps as DefaultSelectProps, SelectChangeEvent } from '@common/components'
import { memo, useCallback, MouseEvent, ReactNode, ChangeEvent, ReactElement } from 'react'
import DefaultSelect from '@mui/material/Select'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type SelectProps = DefaultSelectProps<any> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Select = ({ useStatement = _useStatement, ...props }: SelectProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Select
  })

  const handle = useCallback(
    <T, K extends T>(event: SelectChangeEvent<K>, child: ReactNode) => {
      sendStatement(xAPIVerb.changed)
      props.onChange?.(event, child)
    },
    [sendStatement, props.onClick]
  )

  return (
    <DefaultSelect
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      onChange={useCallback(
        <T, K extends T>(event: SelectChangeEvent<K>, child: ReactNode) => {
          sendStatement(xAPIVerb.changed)
          props.onChange?.(event, child)
        },
        [sendStatement, props.onClick]
      )}
      {...props}>
      {props.children}
    </DefaultSelect>
  )
}

export default memo(Select)
