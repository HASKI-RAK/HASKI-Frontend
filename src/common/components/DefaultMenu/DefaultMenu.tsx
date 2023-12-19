import { MenuProps as DefaultMenuProps } from '@common/components'
import DefaultMenu from '@mui/material/Menu'
import { memo, useCallback } from 'react'
import log from 'loglevel'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
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
