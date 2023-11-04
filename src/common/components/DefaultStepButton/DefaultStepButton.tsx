import { StepButtonProps as DefaultStepButtonProps } from '@common/components'
import DefaultStepButton from '@mui/material/StepButton'
import { memo, useCallback, MouseEvent } from 'react'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type StepButtonProps = DefaultStepButtonProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const StepButton = ({ useStatement = _useStatement, ...props }: StepButtonProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.StepButton
  })

  return (
    <DefaultStepButton
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
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
