import DefaultStepButton from '@mui/material/StepButton'
import { MouseEvent, memo, useCallback } from 'react'
import { StepButtonProps as DefaultStepButtonProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultStepButtonProps - The props of a mui StepButton.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
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
const StepButton = ({ useStatement = _useStatement, onClick, ...props }: StepButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.StepButton
  })

  return (
    <DefaultStepButton
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}>
      {props.children}
    </DefaultStepButton>
  )
}

export default memo(StepButton)
