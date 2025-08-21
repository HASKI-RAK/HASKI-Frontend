import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { Typography } from '@common/components'

/**
 * DefaultGroup component.
 *
 * @param props - Props containing the data of the node aswell as an isConnectable boolean.
 *
 * @remarks
 * DefaultGroup presents a component that displays a label text for a group of nodes.
 * DefaultGroup can't be used as a standalone component and must be rendered via ReactFlow.
 *
 * @category Components
 */
const DefaultGroup = ({ data, isConnectable }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
      <Typography variant="h5" align="center">
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
    </>
  )
}

// https://stackoverflow.com/questions/41581130/what-is-react-component-displayname-used-for
// DefaultGroup.displayName = 'DefaultGroup'

export default memo(DefaultGroup)
