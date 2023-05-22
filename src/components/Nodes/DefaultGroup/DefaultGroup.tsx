import { Typography } from '@mui/material'
import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

const DefaultGroup = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
  return (
    <>
      <Handle type="target" position={targetPosition} isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
      <Typography variant="h6" align="center">
        {data.label}
      </Typography>
      <Handle type="source" position={sourcePosition} isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
    </>
  )
}

DefaultGroup.displayName = 'DefaultGroup'

export default memo(DefaultGroup)
