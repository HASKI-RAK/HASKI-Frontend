import { LinkProps as DefaultLinkProps } from '@common/components'
import { MouseEvent, memo, useCallback } from 'react'
import DefaultLink from '@mui/material/Link'
import {
  xAPIVerb,
  xAPIComponent,
  StatementHookReturn,
  useStatementHookParams,
  useStatement as _useStatement
} from '@services'

type LinkProps = DefaultLinkProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const Link = ({ useStatement = _useStatement, ...props }: LinkProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Link
  })

  const handleClick = useCallback(
    (event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
      // Send statement on every link click
      sendStatement(xAPIVerb.clicked)

      if (props.onClick) {
        props.onClick(event)
      }
    },
    [props.onClick, sendStatement]
  )

  return (
    <DefaultLink onClick={handleClick} {...props}>
      {props.children}
    </DefaultLink>
  )
}

export default memo(Link)
