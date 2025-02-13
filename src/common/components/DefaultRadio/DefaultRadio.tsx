import DefaultRadio from '@mui/material/Radio'
import { MouseEvent, memo, useCallback } from 'react'
import { RadioProps as DefaultRadioProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultRadioProps - The props of a mui Radio.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type RadioProps = DefaultRadioProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Radio component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Radio.
 *
 * @category Common
 */
const Radio = ({ useStatement = _useStatement, onClick, ...props }: RadioProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Radio
  })
  return (
    <DefaultRadio
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}
    />
  )
}

export default memo(Radio)
