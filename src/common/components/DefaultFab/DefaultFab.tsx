import { FabProps as DefaultFabProps } from '@common/components'
import { memo, useCallback, MouseEvent } from 'react'
import DefaultFab from '@mui/material/Fab'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

/**
 * @prop DefaultFabProps - The props of a mui Fab.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 */
type FabProps = DefaultFabProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Fab component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Fab.
 *
 * @category Common
 */
const Fab = ({ useStatement = _useStatement, ...props }: FabProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Fab
  })

  return (
    <DefaultFab
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
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
