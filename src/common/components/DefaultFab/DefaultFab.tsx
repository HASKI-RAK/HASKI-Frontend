import { FabProps as DefaultFabProps } from '@common/components'
import { memo, useCallback, MouseEvent } from 'react'
import DefaultFab from '@mui/material/Fab'
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
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      {...props}>
      {props.children}
    </DefaultFab>
  )
}

export default memo(Fab)
