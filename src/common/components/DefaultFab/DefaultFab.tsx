import { FabProps as DefaultFabProps } from '@common/components'
import DefaultFab from '@mui/material/Fab'
import { memo } from 'react'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type FabProps = DefaultFabProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Fab = ({ useStatement = _useStatement, ...props }: FabProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Fab
  })

  return (
    <DefaultFab
      onClick={(event) => {
        sendStatement(xAPIVerb.clicked)
        props.onClick?.(event)
      }}
      {...props}>
      {props.children}
    </DefaultFab>
  )
}

export default memo(Fab)
