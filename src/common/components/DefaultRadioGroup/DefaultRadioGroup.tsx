import { RadioGroupProps as DefaultRadioGroupProps } from '@common/components'
import DefaultRadioGroup from '@mui/material/RadioGroup'
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
 * @prop DefaultRadioGroupProps - The props of a mui RadioGroup.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type RadioGroupProps = DefaultRadioGroupProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * RadioGroup component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui RadioGroup.
 *
 * @category Common
 */
const RadioGroup = ({ useStatement = _useStatement, onChange, ...props }: RadioGroupProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.RadioGroup
  })

  return (
    <DefaultRadioGroup
      onChange={useCallback(
        (event: ChangeEvent<HTMLInputElement>, value: string) => {
          sendStatement(xAPIVerb.changed, new URL(import.meta.url).pathname)
          onChange?.(event, value)
        },
        [sendStatement, onChange]
      )}
      {...props}>
      {props.children}
    </DefaultRadioGroup>
  )
}

export default memo(RadioGroup)
