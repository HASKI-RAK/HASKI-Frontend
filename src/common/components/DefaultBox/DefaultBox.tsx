import { BoxProps as DefaultBoxProps } from '@common/components'
import { MouseEvent, memo, useCallback, ReactElement, ElementType } from 'react'
import DefaultBox from '@mui/material/Box'
import {
  useStatement as _useStatement,
  useStatementHookParams,
  StatementHookReturn,
  xAPIComponent,
  xAPIVerb
} from '@services'

type BoxProps = DefaultBoxProps & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const NodeWrapper = memo(({ useStatement = _useStatement, ...props }: BoxProps) => {
  const { sendStatement } = useStatement({
    defaultComponentID: props.id,
    defaultComponent: xAPIComponent.Node
  })

  return (
    <DefaultBox
      onClick={useCallback(
        (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
          sendStatement(xAPIVerb.clicked)
          props.onClick?.(event)
        },
        [props.onClick, sendStatement]
      )}
      {...props}>
      {props.children}
    </DefaultBox>
  )
})

type ImageWrapperProps<C extends ElementType, P = object> = DefaultBoxProps<C, P> & {
  useStatement?: (params?: useStatementHookParams) => StatementHookReturn
}

const ImageWrapper = memo(
  <C extends ElementType>({
    useStatement = _useStatement,
    ...props
  }: ImageWrapperProps<C, { alt?: string }>): ReactElement => {
    const { sendStatement } = useStatement({
      defaultComponentID: props.id,
      defaultComponent: xAPIComponent.Image
    })

    return (
      <DefaultBox
        onClick={useCallback(
          (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
            sendStatement(xAPIVerb.clicked)
            props.onClick?.(event)
          },
          [props.onClick, sendStatement]
        )}
        {...props}>
        {props.children}
      </DefaultBox>
    )
  }
)

NodeWrapper.displayName = 'NodeWrapper'
ImageWrapper.displayName = 'ImageWrapper'
export { DefaultBox as Box, NodeWrapper, ImageWrapper }
