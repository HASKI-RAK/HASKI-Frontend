import { memo, useMemo } from 'react'
import { Tree } from '@nivo/tree'
import { Box, Stack, Typography } from '@common/components'
import { getNodeIcon } from '@components'
import type { LearningPathLearningElementNode } from '@components'

export type TreeDatum = {
  name: string
  classification?: string
  course?: string
  topic?: string
  date?: string
  children?: TreeDatum[]
}

export type MyTreeProps = {
  width: number
  height: number
  data: TreeDatum
  margin?: { top: number; right: number; bottom: number; left: number }
}

type NivoPoint = { x: number; y: number }
type NivoNodeDatum = TreeDatum & Partial<LearningPathLearningElementNode>
type NivoNodeLike = { id: string; x: number; y: number; color: string; data: NivoNodeDatum }
type NivoLinkLike = { source: NivoNodeLike; target: NivoNodeLike }
type LinkComponentProps = { link: NivoLinkLike; style?: { strokeWidth?: number } }

const DONE_COLOR = '#61cdbb'
const NEXT_COLOR = '#FFAA46'

const FIRST_NODE_OPACITY = 0.35
const BASE_LINK_OPACITY = 0.4

const APPROX_CHAR_WIDTH_PX = 6.5
const NOTE_PADDING_X = 10
const NOTE_PADDING_Y = 8
const NOTE_FOLD = 12

const DEFAULT_MARGIN = { top: 60, right: 60, bottom: 60, left: 60 }
const MIN_NOTE_WIDTH = 140

const getLastLeafName = (root: TreeDatum): string => {
  let n: TreeDatum = root
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const children = n.children
    if (!children?.length) return n.name
    n = children[children.length - 1]
  }
}

const countNodes = (root: TreeDatum): number => 1 + (root.children?.reduce((acc, ch) => acc + countNodes(ch), 0) ?? 0)

const wrapText = (text: string, maxCharsPerLine: number): string[] => {
  const words = text.split(/\s+/).filter(Boolean)
  return words.reduce<string[]>((lines, word) => {
    const current = lines[lines.length - 1] ?? ''
    const next = current ? `${current} ${word}` : word
    if (!current || next.length <= maxCharsPerLine) {
      if (lines.length === 0) return [next]
      return [...lines.slice(0, -1), next]
    }
    return [...lines, word]
  }, [])
}

const estimateMaxNoteWidthPx = (root: TreeDatum): number => {
  const maxWidthPx = Math.max(170, 240)
  const maxCharsPerLine = Math.max(10, Math.floor(maxWidthPx / APPROX_CHAR_WIDTH_PX))

  const allNodes: TreeDatum[] = []
  const collect = (n: TreeDatum) => {
    allNodes.push(n)
    n.children?.forEach(collect)
  }
  collect(root)

  return allNodes.reduce((maxPx, n) => {
    const baseLines = [n.course, n.topic, n.name].filter((v): v is string => Boolean(v?.trim()))
    if (!baseLines.length) return maxPx

    const wrappedLines = baseLines.flatMap((line) => wrapText(line, maxCharsPerLine))
    const displayLines = wrappedLines.map((s, i) => (i === 0 ? s : `  ${s}`))
    const maxLineLen = displayLines.reduce((m, s) => Math.max(m, s.length), 0)

    const noteWidth = Math.max(
      MIN_NOTE_WIDTH,
      Math.min(maxWidthPx, Math.round(maxLineLen * APPROX_CHAR_WIDTH_PX + NOTE_PADDING_X * 2))
    )
    return Math.max(maxPx, noteWidth)
  }, MIN_NOTE_WIDTH)
}

const shiftPoint = (from: NivoPoint, to: NivoPoint, distance: number): NivoPoint => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  return { x: from.x + (dx / len) * distance, y: from.y + (dy / len) * distance }
}

const makeNotePath = (leftX: number, topY: number, rightX: number, bottomY: number, fold: number) =>
  [
    `M ${leftX} ${topY}`,
    `L ${rightX - fold} ${topY}`,
    `L ${rightX} ${topY + fold}`,
    `L ${rightX} ${bottomY}`,
    `L ${leftX} ${bottomY}`,
    'Z'
  ].join(' ')

const makeFoldPath = (rightX: number, topY: number, fold: number) =>
  [`M ${rightX - fold} ${topY}`, `L ${rightX - fold} ${topY + fold}`, `L ${rightX} ${topY + fold}`].join(' ')

const NächsteEmpfehlungGraph = ({ width, height, data, margin = DEFAULT_MARGIN }: MyTreeProps) => {
  const lastLeafName = useMemo(() => getLastLeafName(data), [data])
  const firstNodeName = data.name
  const isSingleNode = useMemo(() => countNodes(data) === 1, [data])

  const effectiveMargin = useMemo(() => {
    const maxNoteWidth = estimateMaxNoteWidthPx(data)
    const side = Math.ceil(maxNoteWidth / 2 + 24)
    return {
      top: Math.max(margin.top, 70),
      bottom: Math.max(margin.bottom, 120),
      left: Math.max(margin.left, side),
      right: Math.max(margin.right, side)
    }
  }, [data, margin])

  const linkComponent = useMemo(() => {
    const getNodeRadiusById = (id: string) => {
      const recommended = isSingleNode ? true : id === lastLeafName
      return recommended ? 50 : 24
    }

    return ({ link, style }: LinkComponentProps) => {
      const sourceId = link.source.id
      const targetId = link.target.id

      const rS = getNodeRadiusById(sourceId)
      const rT = getNodeRadiusById(targetId)
      const pad = 2

      const start = shiftPoint({ x: link.source.x, y: link.source.y }, { x: link.target.x, y: link.target.y }, rS + pad)
      const end = shiftPoint({ x: link.target.x, y: link.target.y }, { x: link.source.x, y: link.source.y }, rT + pad)

      const midX = (start.x + end.x) / 2
      const d = `M${start.x},${start.y} C${midX},${start.y} ${midX},${end.y} ${end.x},${end.y}`

      const isFromFirst = !isSingleNode && sourceId === firstNodeName
      const strokeOpacity = BASE_LINK_OPACITY * (isFromFirst ? FIRST_NODE_OPACITY : 1)
      const strokeWidth = style?.strokeWidth ?? 2

      return (
        <path
          d={d}
          fill="none"
          stroke={link.target.color ?? DONE_COLOR}
          strokeWidth={strokeWidth}
          strokeOpacity={strokeOpacity}
        />
      )
    }
  }, [firstNodeName, isSingleNode, lastLeafName])

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
        margin={effectiveMargin}
        linkComponent={linkComponent}
        linkThickness={2}
        linkColor={(link: { target: { color?: string } }) => link.target.color ?? DONE_COLOR}
        meshDetectionRadius={80}
        enableLabel={false}
        layout="left-to-right"
        data={data}
        identity="name"
        inactiveNodeSize={24}
        nodeSize={(n: { id: string }) => {
          const recommended = isSingleNode ? true : n.id === lastLeafName
          return recommended ? 50 : 24
        }}
        nodeColor={(n: { id: string }) => {
          const recommended = isSingleNode ? true : n.id === lastLeafName
          return recommended ? NEXT_COLOR : DONE_COLOR
        }}
        nodeComponent={({ node }: { node: NivoNodeLike }) => {
          const nd = node.data
          const isRecommended = isSingleNode ? true : node.id === lastLeafName
          const isFirst = node.id === firstNodeName
          const fadeOpacity = !isSingleNode && isFirst ? FIRST_NODE_OPACITY : 1

          const r = isRecommended ? 50 : 24
          const iconSize = Math.round(r * 1.05)

          const baseLines = [nd.course, nd.topic, nd.name].filter((v): v is string => Boolean(v?.trim()))
          const maxWidthPx = isRecommended ? 240 : 120
          const maxCharsPerLine = Math.max(10, Math.floor(maxWidthPx / APPROX_CHAR_WIDTH_PX))

          const wrapped = baseLines.flatMap((line) => {
            const parts = wrapText(line, maxCharsPerLine)
            return parts.map((p, idx) => ({ isFirstOfBullet: idx === 0, text: p }))
          })

          const displayLines = wrapped.map((l) => (l.isFirstOfBullet ? l.text : `  ${l.text}`))

          const maxLineLen = displayLines.reduce((m, s) => Math.max(m, s.length), 0)
          const noteWidth = Math.max(
            MIN_NOTE_WIDTH,
            Math.min(maxWidthPx, Math.round(maxLineLen * APPROX_CHAR_WIDTH_PX + NOTE_PADDING_X * 2))
          )
          const lineHeight = 14
          const noteHeight = Math.max(34, Math.round(displayLines.length * lineHeight + NOTE_PADDING_Y * 2))

          const noteTopY = r + 10
          const noteLeftX = -noteWidth / 2
          const noteRightX = noteWidth / 2
          const noteBottomY = noteTopY + noteHeight

          const notePath = makeNotePath(noteLeftX, noteTopY, noteRightX, noteBottomY, NOTE_FOLD)
          const foldPath = makeFoldPath(noteRightX, noteTopY, NOTE_FOLD)

          const dateY = -(r + 10)

          return (
            <g transform={`translate(${node.x},${node.y})`} opacity={fadeOpacity}>
              {/* date above */}
              {nd.date?.trim() ? (
                <text y={dateY} textAnchor="middle" style={{ fontSize: 11, opacity: 0.8 }} xmlSpace="preserve">
                  {nd.date}
                </text>
              ) : null}

              {/* node */}
              <circle r={r} fill={isRecommended ? NEXT_COLOR : node.color} />

              {/* icon (MUI) via foreignObject */}
              <foreignObject
                x={-iconSize / 2}
                y={-iconSize / 2}
                width={iconSize}
                height={iconSize}
                style={{ pointerEvents: 'none' }}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff'
                  }}>
                  {getNodeIcon(nd.classification ?? '', iconSize)}
                </div>
              </foreignObject>

              {/* dotted connector from node to note (UML style) */}
              <line x1={0} y1={r} x2={0} y2={noteTopY} stroke="#999" strokeWidth={1} strokeDasharray="3 3" />

              {/* UML note */}
              <path d={notePath} fill="#fff" opacity={0.96} stroke="#999" strokeWidth={1} />
              <path d={foldPath} fill="none" stroke="#999" strokeWidth={1} />

              {/* centered text in note */}
              <text
                x={0}
                y={noteTopY + NOTE_PADDING_Y + 11}
                textAnchor="middle"
                dominantBaseline="alphabetic"
                style={{ fontSize: 12, fill: '#111' }}
                xmlSpace="preserve">
                {displayLines.map((line, i) => (
                  <tspan key={`${node.id}-${i}`} x={0} dy={i === 0 ? 0 : lineHeight}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          )
        }}
      />
    </Box>
  )
}

NächsteEmpfehlungGraph.displayName = 'NächsteEmpfehlungGraph'
export default memo(NächsteEmpfehlungGraph)
