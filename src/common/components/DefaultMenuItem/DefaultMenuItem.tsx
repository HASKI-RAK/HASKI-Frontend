import { MenuItemProps as DefaultMenuItemProps } from '@common/components'
import DefaultMenuItem from '@mui/material/MenuItem'
import { memo } from 'react'
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
      onClick={(event) => {
        sendStatement(xAPIVerb.clicked)
        props.onClick?.(event)
      }}
      {...props}>
      {props.children}
    </DefaultMenuItem>
  )
}

export default memo(MenuItem)
