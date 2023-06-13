import { DefaultTypography as Typography } from '@common/components'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'

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

// https://stackoverflow.com/questions/41581130/what-is-react-component-displayname-used-for
DefaultGroup.displayName = 'DefaultGroup'

export default memo(DefaultGroup)
