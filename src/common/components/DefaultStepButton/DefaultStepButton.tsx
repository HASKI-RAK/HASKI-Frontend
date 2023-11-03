import { StepButtonProps as DefaultStepButtonProps } from '@common/components'
import DefaultStepButton from '@mui/material/StepButton'
import { memo } from 'react'
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
      onClick={(event) => {
        sendStatement(xAPIVerb.clicked)
        props.onClick?.(event)
      }}
      {...props}>
      {props.children}
    </DefaultStepButton>
  )
}

export default memo(StepButton)
