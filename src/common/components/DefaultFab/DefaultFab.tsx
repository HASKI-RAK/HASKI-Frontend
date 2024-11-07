import DefaultFab from '@mui/material/Fab'
import { MouseEvent, RefObject, forwardRef, memo, useCallback } from 'react'
import { FabProps as DefaultFabProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultFabProps - The props of a mui Fab.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
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
const Fab = (
  { useStatement = _useStatement, onClick, ...props }: FabProps,
  ref: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined
) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Fab
  })

  return (
    <DefaultFab
      ref={ref}
      onClick={useCallback(
        (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}>
      {props.children}
    </DefaultFab>
  )
}

export default memo(forwardRef(Fab))
