import { memo } from 'react'
import { Tree } from '@nivo/tree'

export type TreeDatum = {
  name: string
  children?: TreeDatum[]
}

export type MyTreeProps = {
  width: number
  height: number
  data: TreeDatum
  margin?: { top: number; right: number; bottom: number; left: number }
}

const NächsteEmpfehlungGraph = ({
  width,
  height,
  data,
  margin = { top: 60, right: 60, bottom: 60, left: 60 }
}: MyTreeProps) => {
  return (
    <Tree
      width={width}
      height={height}
      nodeComponent={({ node }) => (
        <g transform={`translate(${node.x},${node.y})`}>
          <circle r={24} fill={node.color} />
          <text y={24 + 14} textAnchor="middle" dominantBaseline="hanging" style={{ fontSize: 12 }}>
            {node.data.name}
          </text>
        </g>
      )}
      layout="left-to-right"
      enableLabel={false}
      data={data}
      identity="name"
      margin={margin}
      inactiveNodeSize={24}
      nodeSize={24}
      nodeColor={{ scheme: 'tableau10' }}
      linkThickness={2}
      activeLinkThickness={8}
      inactiveLinkThickness={2}
      linkColor={{ from: 'target.color', modifiers: [['opacity', 0.4]] }}
      meshDetectionRadius={80}
    />
  )
}

export default memo(NächsteEmpfehlungGraph)
