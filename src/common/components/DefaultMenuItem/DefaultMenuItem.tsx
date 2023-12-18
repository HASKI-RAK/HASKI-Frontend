import { MenuItemProps as DefaultMenuItemProps } from '@common/components'
import { memo, MouseEvent, useCallback } from 'react'
import DefaultMenuItem from '@mui/material/MenuItem'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

/**
 * @prop DefaultMenuItemProps - The props of a mui MenuItem.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type MenuItemProps = DefaultMenuItemProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * MenuItem component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui MenuItem.
 *
 * @category Common
 */
const MenuItem = ({ useStatement = _useStatement, onClick, ...props }: MenuItemProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.MenuItem
  })

  return (
    <DefaultMenuItem
      onClick={useCallback(
        (event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname).catch((reason) => log.error(reason))
          onClick?.(event)
        },
        [sendStatement, onClick]
      )}
      {...props}>
      {props.children}
    </DefaultMenuItem>
  )
}

export default memo(MenuItem)
