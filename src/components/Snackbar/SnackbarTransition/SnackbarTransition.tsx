import { Slide, Grow } from '@common/components'
import { SeverityType } from '@components'
import { memo } from 'react'

/**
 * @props children - The child element to be transitioned.
 * @props in - The condition for the transition to be triggered.
 * @props severity - The severity that determines the transition type.
 * @props timeout - The duration of the transition.
 * @interface
 */
export type SnackbarTransitionProps = {
  children?: React.ReactElement
  in?: boolean
  severity?: SeverityType
  timeout?: number
}

/**
 * SnackbarTransition component.
 *
 * @param props - Props containing condition, type and timeout of a transition.
 *
 * @remarks
 * SnackbarTransition presents a transition for snackbars by wrapping them as a child component.
 * It can be used as a standalone component on a page.
 *
 * @category Components
 */
const SnackbarTransition = (props: SnackbarTransitionProps) => {
  if (props.children === undefined) {
    return <div data-testid="snackbarTransition" />
  }

  switch (props.severity) {
    case 'error':
    case 'warning':
      return (
        <Slide in={props.in} data-testid="snackbarTransition" timeout={props.timeout}>
          {props.children}
        </Slide>
      )
    case 'success':
    case 'info':
    default:
      return (
        <Grow in={props.in} data-testid="snackbarTransition" timeout={props.timeout}>
          {props.children}
        </Grow>
      )
  }
}

export default memo(SnackbarTransition)
