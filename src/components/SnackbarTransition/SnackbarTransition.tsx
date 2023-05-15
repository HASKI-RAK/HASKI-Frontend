import { DefaultSlide as Slide, DefaultGrow as Grow } from '@common/components'
import { SeverityType } from '@components'

/**
 * @typedef {Object} SnackbarTransitionProps
 * @property {React.ReactElement} children - The child element to be transitioned.
 * @property {boolean} in - The condition for the transition to be triggered.
 * @property {SeverityType} severity - The severity that determines the transition type.
 * @property {number} timeout - The duration of the transition.
 */
export type SnackbarTransitionProps = {
  children?: React.ReactElement
  in?: boolean
  severity?: SeverityType
  timeout?: number
}

/**
 * SnackbarTransition presents a transition for snackbars by wrapping them as a child component.
 * It can be used as a standalone component on a page.
 * @param props - Props containing condition, type and timeout of a transition.
 * @returns {JSX.Element} - The transition component for snackbars
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

export default SnackbarTransition
