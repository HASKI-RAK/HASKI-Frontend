import { StepButtonProps as DefaultStepButtonProps } from '@common/components'
import DefaultStepButton from '@mui/material/StepButton'
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
 * @prop DefaultStepButtonProps - The props of a mui StepButton.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 */
type StepButtonProps = DefaultStepButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * StepButton component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui StepButton.
 *
 * @category Common
 */
const StepButton = ({ useStatement = _useStatement, ...props }: StepButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.StepButton
  })

  return (
    <DefaultStepButton
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      {...props}>
      {props.children}
    </DefaultStepButton>
  )
}

export default memo(StepButton)
