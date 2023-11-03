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

  return (
    <DefaultSelect
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      onChange={(event, child) => {
        sendStatement(xAPIVerb.changed)
        props.onChange?.(event, child)
      }}
      {...props}>
      {props.children}
    </DefaultSelect>
  )
}

export default memo(Select)
