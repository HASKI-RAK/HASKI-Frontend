import { memo, ReactNode } from 'react'
import { Paper, Tooltip, Typography } from '@common/components'
import { keyframes } from '@common/theme'

// todo document
type BorderedPaperProps = {
  children?: ReactNode
  color?: string
  isAnimated?: boolean
  tooltip?: string
}

// TODO DOCUMENT
const BorderedPaper = ({ children, color = 'transparent', isAnimated = false, tooltip }: BorderedPaperProps) => {
  // TODO: DOCUMENT
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
    // Typography in tooltip
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

export default memo(BorderedPaper)
