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

type MenuItemProps = DefaultMenuItemProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const MenuItem = ({ useStatement = _useStatement, ...props }: MenuItemProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.MenuItem
  })

  return (
    <DefaultMenuItem
      onClick={useCallback(
        (event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked).catch((reason) => log.error(reason))
          props.onClick?.(event)
        },
        [sendStatement, props.onClick]
      )}
      {...props}>
      {props.children}
    </DefaultMenuItem>
  )
}

export default memo(MenuItem)
