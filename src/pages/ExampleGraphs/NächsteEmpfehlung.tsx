import { memo, useMemo } from 'react'
import { Tree } from '@nivo/tree'
import type { ReactElement } from 'react'

import {
  Article,
  Assignment,
  AssignmentInd,
  AssignmentLate,
  Description,
  Feedback,
  Flag,
  Forum,
  QuestionMark,
  SettingsApplications,
  ShortText,
  TipsAndUpdates,
  Videocam
} from '@common/icons'

export type TreeDatum = {
  name: string
  classification?: string
  course?: string
  topic?: string
  children?: TreeDatum[]
}

export type MyTreeProps = {
  width: number
  height: number
  data: TreeDatum
  margin?: { top: number; right: number; bottom: number; left: number }
}

const getLastLeafName = (root: TreeDatum): string => {
  let n: TreeDatum = root
  while (n.children?.length) n = n.children[n.children.length - 1]
  return n.name
}

const getNodeIconSvg = (key: string | undefined, size: number): ReactElement => {
  const common = {
    width: size,
    height: size,
    style: { color: '#fff' },
    pointerEvents: 'none' as const
  }

  const mapping: Record<string, ReactElement> = {
    AB: <SettingsApplications {...common} />,
    AN: <Videocam {...common} />,
    BE: <Assignment {...common} />,
    EK: <TipsAndUpdates {...common} />,
    EF: <QuestionMark {...common} />,
    FO: <Forum {...common} />,
    KÜ: <ShortText {...common} />,
    LZ: <Flag {...common} />,
    RQ: <Feedback {...common} />,
    SE: <AssignmentInd {...common} />,
    ÜB: <AssignmentLate {...common} />,
    ZF: <Description {...common} />,
    ZL: <Article {...common} />
  }

  return mapping[key ?? ''] ?? <QuestionMark {...common} />
}

const NächsteEmpfehlungGraph = ({
  width,
  height,
  data,
  margin = { top: 60, right: 60, bottom: 60, left: 60 }
}: MyTreeProps) => {
  const lastLeafName = useMemo(() => getLastLeafName(data), [data])

  return (
    <Tree
      width={width}
      height={height}
      nodeComponent={({ node }) => {
        const isLast = node.id === lastLeafName
        const r = isLast ? 50 : 24
        const iconSize = Math.round(r * 1.05)

        // ✅ use classification for icons, name for label
        const classification = (node.data as TreeDatum).classification

        return (
          <g transform={`translate(${node.x},${node.y})`}>
            <circle r={r} fill={node.color} />

            {/* icon */}
            <g transform={`translate(${-iconSize / 2},${-iconSize / 2})`}>{getNodeIconSvg(classification, iconSize)}</g>

            {/* label */}
            <text y={r + 14} textAnchor="middle" dominantBaseline="hanging" style={{ fontSize: 12 }}>
              {(node.data as TreeDatum).name}
            </text>
          </g>
        )
      }}
      enableLabel={false}
      layout="left-to-right"
      data={data}
      identity="name"
      margin={margin}
      inactiveNodeSize={24}
      nodeSize={(node) => (node.id === lastLeafName ? 50 : 24)}
      nodeColor={(node) => (node.id === lastLeafName ? '#FFAA46' : '#61cdbb')}
      linkThickness={2}
      linkColor={{ from: 'target.color', modifiers: [['opacity', 0.4]] }}
      meshDetectionRadius={80}
    />
  )
}

export default memo(NächsteEmpfehlungGraph)
