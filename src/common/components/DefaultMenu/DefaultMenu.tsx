import { MenuProps as DefaultMenuProps } from '@common/components'
import DefaultMenu from '@mui/material/Menu'
import { memo, useCallback } from 'react'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type MenuProps = DefaultMenuProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Menu = ({ useStatement = _useStatement, ...props }: MenuProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Menu
  })

  return (
    <DefaultMenu
      onClose={useCallback(
        (event: object, reason: 'backdropClick' | 'escapeKeyDown') => {
          sendStatement(xAPIVerb.closed)
          props.onClose?.(event, reason)
        },
        [sendStatement, props.onClose]
      )}
      {...props}>
      {props.children}
    </DefaultMenu>
  )
}

export default memo(Menu)
