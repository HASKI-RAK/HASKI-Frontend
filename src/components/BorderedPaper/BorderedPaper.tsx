import { memo, ReactNode } from 'react'
import { Paper, Tooltip, Typography } from '@common/components'
import { keyframes } from '@common/theme'

/**
 * Props for the {@link BorderedPaper} component.
 */
type BorderedPaperProps = {
  /**
   * The children of the component.
   */
  children?: ReactNode
  /**
   * The color of the component's border.
   */
  color?: string
  /**
   * Whether the component's border is animated or not.
   */
  isAnimated?: boolean
  /**
   * The tooltip text displayed while hovering over the component.
   */
  tooltip?: string
}

const BorderedPaper = ({ children, color = 'transparent', isAnimated = false, tooltip }: BorderedPaperProps) => {
  /**
   * The animation for the border.
   */
  const animation =
    keyframes`
      0% {
        border-color: ${color}
      }
      50% {
        border-color: transparent
      }
      100% {
        border-color: ${color}
      }` + ` 1s ease-in-out 3`

  return (
    <Tooltip arrow title={isAnimated ? <Typography variant="body2">{tooltip}</Typography> : ''}>
      <Paper
        sx={{
          alignItems: 'center',
          animation: isAnimated ? animation : 'none',
          border: `5px solid ${isAnimated ? color : 'transparent'}`,
          display: 'flex',
          height: '60px',
          justifyContent: 'center',
          width: '60px'
        }}>
        {children}
      </Paper>
    </Tooltip>
  )
}

/**
 * Paper component for displaying a paper with colored border.
 *
 * Renders a paper with colored border, optionally with animation and tooltip on hover.
 *
 * @param props - See {@link BorderedPaperProps}.
 * @returns A paper with colored and optionally animated border.
 *
 * @example
 * ```tsx
 * <BorderedPaper color="blue" isAnimated={true} tooltip="tooltip">
 *  {children}
 * </BorderedPaper>
 * ```
 */
export default memo(BorderedPaper)
