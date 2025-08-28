import { memo, ReactNode } from 'react'
import { keyframes } from '@mui/system' // TODO -> Common
import { Paper, Tooltip, Typography } from '@common/components'

// todo document
type BorderedPaperProps = {
  children: ReactNode
  color: string
  isAnimated: boolean
}

// TODO DOCUMENT
const BorderedPaper = ({ children, color = 'transparent', isAnimated = false }: BorderedPaperProps) => {
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
    <Tooltip
      arrow
      title={
        isAnimated ? (
          <Typography variant="body2">{'This is the recommended next learning element for you!'}</Typography>
        ) : (
          ''
        )
      }>
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
