import { ToggleButtonGroupProps as DefaultToggleButtonGroupProps } from '@common/components'
import DefaultToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { memo, useCallback, MouseEvent } from 'react'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

/**
 * @prop DefaultToggleButtonGroupProps - The props of a mui ToggleButtonGroup.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 */
type ToggleButtonGroupProps = DefaultToggleButtonGroupProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * ToggleButtonGroup component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui ToggleButtonGroup.
 *
 * @category Common
 */
const ToggleButtonGroup = ({ useStatement = _useStatement, onChange, ...props }: ToggleButtonGroupProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.ToggleButtonGroup
  })

  return (
    <DefaultToggleButtonGroup
      onChange={useCallback(
        <T, K extends T>(event: MouseEvent<HTMLElement, globalThis.MouseEvent>, value: K) => {
          sendStatement(xAPIVerb.changed, new URL(import.meta.url).pathname).catch((reason) => log.error(reason))
          onChange?.(event, value)
        },
        [sendStatement, onChange]
      )}
      {...props}>
      {props.children}
    </DefaultToggleButtonGroup>
  )
}

export default memo(ToggleButtonGroup)
