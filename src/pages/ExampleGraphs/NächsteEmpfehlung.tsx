import { memo, useMemo } from 'react'
import { Tree } from '@nivo/tree'
import type { ReactElement } from 'react'
import { Box, Stack, Typography } from '@common/components'

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

const wrapText = (text: string, maxCharsPerLine: number) => {
  // simple char-based wrapping (works without measuring)
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const w of words) {
    const next = current ? `${current} ${w}` : w
    if (next.length <= maxCharsPerLine) {
      current = next
    } else {
      if (current) lines.push(current)
      current = w
    }
  }
  if (current) lines.push(current)
  return lines
}

const NächsteEmpfehlungGraph = ({
  width,
  height,
  data,
  margin = { top: 60, right: 60, bottom: 60, left: 60 }
}: MyTreeProps) => {
  const DONE_COLOR = '#61cdbb'
  const NEXT_COLOR = '#FFAA46'
  const lastLeafName = useMemo(() => getLastLeafName(data), [data])

  return (
    <Box sx={{ position: 'relative', width, height }}>
      {/* Legend */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          px: 1.5,
          py: 1,
          boxShadow: 1,
          zIndex: 1
        }}>
        <Stack spacing={0.75}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: DONE_COLOR }} />
            <Typography variant="caption">Done element</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: NEXT_COLOR }} />
            <Typography variant="caption">Next recommendation</Typography>
          </Stack>
        </Stack>
      </Box>

      <Tree
        width={width}
        height={height}
        nodeComponent={({ node }) => {
          const isLast = node.id === lastLeafName
          const r = isLast ? 50 : 24
          const iconSize = Math.round(r * 1.05)

          const classification = (node.data as TreeDatum).classification
          const course = (node.data as TreeDatum).course
          const topic = (node.data as TreeDatum).topic
          const name = (node.data as TreeDatum).name

          const baseLines = [course, topic, name].filter((v): v is string => Boolean(v?.trim()))

          const maxWidthPx = isLast ? 220 : 150
          const approxCharWidthPx = 6.5
          const maxCharsPerLine = Math.max(10, Math.floor(maxWidthPx / approxCharWidthPx))

          const wrapped: Array<{ isFirstOfBullet: boolean; text: string }> = []
          for (const line of baseLines) {
            const parts = wrapText(line, maxCharsPerLine)
            parts.forEach((p, idx) => wrapped.push({ isFirstOfBullet: idx === 0, text: p }))
          }

          const lineHeight = 14
          const labelTopY = r + 12

          return (
            <g transform={`translate(${node.x},${node.y})`}>
              <circle r={r} fill={node.color} />

              {/* icon */}
              <g transform={`translate(${-iconSize / 2},${-iconSize / 2})`}>
                {getNodeIconSvg(classification, iconSize)}
              </g>

              {/* label */}
              <text
                y={labelTopY}
                textAnchor="middle"
                dominantBaseline="hanging"
                style={{ fontSize: 12 }}
                xmlSpace="preserve">
                {wrapped.map((l, i) => (
                  <tspan key={i} x={0} dy={i === 0 ? 0 : lineHeight}>
                    {l.isFirstOfBullet ? `${l.text}` : `  ${l.text}`}
                  </tspan>
                ))}
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
        nodeColor={(node) => (node.id === lastLeafName ? NEXT_COLOR : DONE_COLOR)}
        linkThickness={2}
        linkColor={{ from: 'target.color', modifiers: [['opacity', 0.4]] }}
        meshDetectionRadius={80}
      />
    </Box>
  )
}

export default memo(NächsteEmpfehlungGraph)
