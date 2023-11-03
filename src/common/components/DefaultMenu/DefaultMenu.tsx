import { MenuProps as DefaultMenuProps } from '@common/components'
import DefaultMenu from '@mui/material/Menu'
import { memo } from 'react'
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
      onClose={(event, reason) => {
        sendStatement(xAPIVerb.closed)
        props.onClose?.(event, reason)
      }}
      {...props}>
      {props.children}
    </DefaultMenu>
  )
}

export default memo(Menu)
