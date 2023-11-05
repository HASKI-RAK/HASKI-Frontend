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

type RadioGroupProps = DefaultRadioGroupProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const RadioGroup = ({ useStatement = _useStatement, ...props }: RadioGroupProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.RadioGroup
  })

  return (
    <DefaultRadioGroup
      onChange={useCallback(
        (event: ChangeEvent<HTMLInputElement>, value: string) => {
          sendStatement(xAPIVerb.changed).catch((reason) => log.error(reason))
          props.onChange?.(event, value)
        },
        [sendStatement, props.onChange]
      )}
      {...props}>
      {props.children}
    </DefaultRadioGroup>
  )
}

export default memo(RadioGroup)
