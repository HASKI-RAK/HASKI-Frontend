import { ToggleButtonGroupProps as DefaultToggleButtonGroupProps } from '@common/components'
import DefaultToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { memo, useCallback, MouseEvent } from 'react'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type ToggleButtonGroupProps = DefaultToggleButtonGroupProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const ToggleButtonGroup = ({ useStatement = _useStatement, ...props }: ToggleButtonGroupProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.ToggleButtonGroup
  })

  const handle = useCallback(
    <T, K extends T>(event: MouseEvent<HTMLElement, globalThis.MouseEvent>, value: K) => {
      // typeof props.value
      sendStatement(xAPIVerb.changed)
      props.onChange?.(event, value)
    },
    [sendStatement, props.onChange]
  )

  return (
    <DefaultToggleButtonGroup
      onChange={useCallback(
        <T, K extends T>(event: MouseEvent<HTMLElement, globalThis.MouseEvent>, value: K) => {
          // typeof props.value
          sendStatement(xAPIVerb.changed)
          props.onChange?.(event, value)
        },
        [sendStatement, props.onChange]
      )}
      {...props}>
      {props.children}
    </DefaultToggleButtonGroup>
  )
}

export default memo(ToggleButtonGroup)
