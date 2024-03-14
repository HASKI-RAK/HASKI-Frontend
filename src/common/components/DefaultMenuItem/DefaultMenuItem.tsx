import DefaultMenuItem from '@mui/material/MenuItem'
import { MouseEvent, memo, useCallback } from 'react'
import { MenuItemProps as DefaultMenuItemProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
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
          sendStatement(xAPIVerb.clicked, new URL(import.meta.url).pathname)
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
