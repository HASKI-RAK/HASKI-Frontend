import DefaultMenu from '@mui/material/Menu'
import xAPIWrapper2 from 'src/services/xAPI/xAPIWrapper'
import { memo, useCallback } from 'react'
import { MenuProps as DefaultMenuProps } from '@common/components'
import {
  StatementHookReturn,
  useStatement as _useStatement,
  useStatementHookParams,
  xAPIComponent,
  xAPIVerb
} from '@services'

/**
 * @prop DefaultMenuProps - The props of a mui Menu.
 * @prop useStatement - Custom hook to send xAPI statements
 * @category Common
 * @interface
 */
type MenuProps = DefaultMenuProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

/**
 * Menu component.
 *
 * @param props - Props containing the useStatement hook and the props of a mui Menu.
 *
 * @category Common
 */
const Menu = ({ useStatement = _useStatement, onClose, ...props }: MenuProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Menu
  })

  return (
    <DefaultMenu
      onClose={useCallback(
        (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
          sendStatement(xAPIVerb.closed, new URL(import.meta.url).pathname)
          onClose?.(event, reason)
        },
        [sendStatement, onClose]
      )}
      {...props}>
      {props.children}
    </DefaultMenu>
  )
}

export default memo(Menu)

/// export default xAPIWrapper2(DefaultMenu, 'Menu', new URL(import.meta.url).pathname, DefaultMenu)
