import {Typography } from '@common/components'
import { Handle, NodeProps, Position } from 'reactflow'
import { memo } from 'react'

/**
 * DefaultGroup presents a component that displays a label text for a group of nodes.
 * DefaultGroup can't be used as a standalone component and must be rendered via ReactFlow.
 * @param props - Props containing the data of the node aswell as a isConnectable boolean.
 * @returns {JSX.Element} - The DefaultGroup component.
 * @category Components
 */
const DefaultGroup = ({ data, isConnectable }: NodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
      <Typography variant="h6" align="center">
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} style={{ visibility: 'hidden' }} />
    </>
  )
}

// https://stackoverflow.com/questions/41581130/what-is-react-component-displayname-used-for
DefaultGroup.displayName = 'DefaultGroup'

export default memo(DefaultGroup)
