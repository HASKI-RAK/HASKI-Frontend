import { memo, useMemo } from 'react'
import { Tree } from '@nivo/tree'
import { Box, Stack, Typography } from '@common/components'
import { getNodeIcon, type LearningPathLearningElementNode } from '@components'

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

const DONE_COLOR = '#61cdbb'
const NEXT_COLOR = '#FFAA46'

// fade factor for the oldest (first) node and its outgoing link(s)
const FIRST_NODE_OPACITY = 0.35

// base opacity for links
const BASE_LINK_OPACITY = 0.4

const getLastLeafName = (root: TreeDatum): string => {
  let n: TreeDatum = root
  while (n.children?.length) n = n.children[n.children.length - 1]
  return n.name
}

const countNodes = (root: TreeDatum): number => {
  let c = 1
  root.children?.forEach((ch) => {
    c += countNodes(ch)
  })
  return c
}

const wrapText = (text: string, maxCharsPerLine: number) => {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const w of words) {
    const next = current ? `${current} ${w}` : w
    if (next.length <= maxCharsPerLine) current = next
    else {
      if (current) lines.push(current)
      current = w
    }
  }
  if (current) lines.push(current)
  return lines
}

// estimate how wide the widest note could be (px), using the same heuristics as your renderer
const estimateMaxNoteWidthPx = (root: TreeDatum) => {
  const approxCharWidthPx = 6.5
  const notePaddingX = 10
  const maxWidthPxDefault = 170
  const maxWidthPxLast = 240

  let maxPx = 140

  const visit = (n: TreeDatum) => {
    const baseLines = [n.course, n.topic, n.name].filter((v): v is string => Boolean(v?.trim()))
    if (baseLines.length) {
      const maxWidthPx = Math.max(maxWidthPxDefault, maxWidthPxLast)
      const maxCharsPerLine = Math.max(10, Math.floor(maxWidthPx / approxCharWidthPx))

      const wrappedLines: string[] = []
      for (const line of baseLines) wrappedLines.push(...wrapText(line, maxCharsPerLine))

      const displayLines = wrappedLines.map((s, i) => (i === 0 ? `${s}` : `  ${s}`))
      const maxLineLen = displayLines.reduce((m, s) => Math.max(m, s.length), 0)

      const noteWidth = Math.max(
        140,
        Math.min(maxWidthPx, Math.round(maxLineLen * approxCharWidthPx + notePaddingX * 2))
      )

      maxPx = Math.max(maxPx, noteWidth)
    }

    n.children?.forEach(visit)
  }

  visit(root)
  return maxPx
}

const NächsteEmpfehlungGraph = ({
  width,
  height,
  data,
  margin = { top: 60, right: 60, bottom: 60, left: 60 }
}: MyTreeProps) => {
  const lastLeafName = useMemo(() => getLastLeafName(data), [data])
  const firstNodeName = data.name
  const isSingleNode = useMemo(() => countNodes(data) === 1, [data])

  // derive a margin that guarantees notes fit
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

  // Link renderer that starts/ends at circle borders (prevents seeing links "through" transparent nodes)
  const LinkAtCircleBorder = useMemo(() => {
    const getNodeRadiusById = (id: string) => {
      const isRecommended = isSingleNode ? true : id === lastLeafName
      return isRecommended ? 50 : 24
    }

    return (props: any) => {
      const link = props.link ?? props

      const sx = link.source?.x
      const sy = link.source?.y
      const tx = link.target?.x
      const ty = link.target?.y
      if ([sx, sy, tx, ty].some((v) => typeof v !== 'number')) return null

      const sourceId = String(link.source?.id ?? link.source?.data?.name ?? '')
      const targetId = String(link.target?.id ?? link.target?.data?.name ?? '')

      const rS = getNodeRadiusById(sourceId)
      const rT = getNodeRadiusById(targetId)
      const pad = 2

      const dx = tx - sx
      const dy = ty - sy
      const len = Math.hypot(dx, dy) || 1
      const ux = dx / len
      const uy = dy / len

      // shift endpoints to circle borders
      const sx2 = sx + ux * (rS + pad)
      const sy2 = sy + uy * (rS + pad)
      const tx2 = tx - ux * (rT + pad)
      const ty2 = ty - uy * (rT + pad)

      // smooth left-to-right curve
      const midX = (sx2 + tx2) / 2
      const d = `M${sx2},${sy2} C${midX},${sy2} ${midX},${ty2} ${tx2},${ty2}`

      // opacity: base link opacity, and if it starts at the oldest node, apply the same fade factor
      const isFromFirst = !isSingleNode && sourceId === firstNodeName
      const strokeOpacity = BASE_LINK_OPACITY * (isFromFirst ? FIRST_NODE_OPACITY : 1)

      const stroke = link?.target?.color ?? DONE_COLOR
      const strokeWidth = props.style?.strokeWidth ?? 2

      return <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeOpacity={strokeOpacity} />
    }
  }, [isSingleNode, lastLeafName, firstNodeName])

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
        linkComponent={LinkAtCircleBorder}
        nodeComponent={({ node }) => {
          // NOTE: if you want, you can switch TreeDatum -> LearningPathLearningElementNode everywhere
          const nd = node.data as unknown as TreeDatum & Partial<LearningPathLearningElementNode>

          const nodeName = nd.name

          // recommended: if single node => that node; else => last leaf
          const isRecommended = isSingleNode ? true : node.id === lastLeafName

          // oldest: the root node, faded if there is more than one node
          const isFirst = node.id === firstNodeName
          const fadeOpacity = !isSingleNode && isFirst ? FIRST_NODE_OPACITY : 1

          const r = isRecommended ? 50 : 24
          const iconSize = Math.round(r * 1.05)

          const classification = nd.classification
          const course = nd.course
          const topic = nd.topic
          const date = nd.date

          const baseLines = [course, topic, nodeName].filter((v): v is string => Boolean(v?.trim()))

          const maxWidthPx = isRecommended ? 240 : 120
          const approxCharWidthPx = 6.5
          const maxCharsPerLine = Math.max(10, Math.floor(maxWidthPx / approxCharWidthPx))

          const wrapped: Array<{ isFirstOfBullet: boolean; text: string }> = []
          for (const line of baseLines) {
            const parts = wrapText(line, maxCharsPerLine)
            parts.forEach((p, idx) => wrapped.push({ isFirstOfBullet: idx === 0, text: p }))
          }

          const lineHeight = 14

          // UML note sizing/position
          const notePaddingX = 10
          const notePaddingY = 8
          const noteFold = 12

          const displayLines = wrapped.map((l) => (l.isFirstOfBullet ? `${l.text}` : `  ${l.text}`))
          const maxLineLen = displayLines.reduce((m, s) => Math.max(m, s.length), 0)

          const noteWidth = Math.max(
            140,
            Math.min(maxWidthPx, Math.round(maxLineLen * approxCharWidthPx + notePaddingX * 2))
          )
          const noteHeight = Math.max(34, Math.round(displayLines.length * lineHeight + notePaddingY * 2))

          const noteTopY = r + 10
          const noteLeftX = -noteWidth / 2
          const noteRightX = noteWidth / 2
          const noteBottomY = noteTopY + noteHeight

          const notePath = [
            `M ${noteLeftX} ${noteTopY}`,
            `L ${noteRightX - noteFold} ${noteTopY}`,
            `L ${noteRightX} ${noteTopY + noteFold}`,
            `L ${noteRightX} ${noteBottomY}`,
            `L ${noteLeftX} ${noteBottomY}`,
            'Z'
          ].join(' ')

          const foldPath = [
            `M ${noteRightX - noteFold} ${noteTopY}`,
            `L ${noteRightX - noteFold} ${noteTopY + noteFold}`,
            `L ${noteRightX} ${noteTopY + noteFold}`
          ].join(' ')

          const dateY = -(r + 10)

          const connectorStartY = r
          const connectorEndY = noteTopY
          const connectorX = 0

          return (
            <g transform={`translate(${node.x},${node.y})`} opacity={fadeOpacity}>
              {/* date above */}
              {date?.trim() ? (
                <text y={dateY} textAnchor="middle" style={{ fontSize: 11, opacity: 0.8 }} xmlSpace="preserve">
                  {date}
                </text>
              ) : null}

              {/* node */}
              <circle r={r} fill={isRecommended ? NEXT_COLOR : node.color} />

              {/* icon (uses your getNodeIcon mapping) */}
              <g transform={`translate(0,0)`} style={{ color: '#fff', pointerEvents: 'none' }}>
                {/* center the icon by translating half its size */}
                {/* icon (MUI) via foreignObject so it always renders inside SVG */}
                <foreignObject
                  x={-iconSize / 2}
                  y={-iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  style={{ pointerEvents: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    {getNodeIcon(classification ?? '', iconSize)}
                  </div>
                </foreignObject>
              </g>

              {/* dotted connector from node to note (UML style) */}
              <line
                x1={connectorX}
                y1={connectorStartY}
                x2={connectorX}
                y2={connectorEndY}
                stroke="#999"
                strokeWidth={1}
                strokeDasharray="3 3"
              />

              {/* UML note */}
              <path d={notePath} fill="#fff" opacity={0.96} stroke="#999" strokeWidth={1} />
              <path d={foldPath} fill="none" stroke="#999" strokeWidth={1} />

              {/* centered text in note */}
              <text
                x={0}
                y={noteTopY + notePaddingY + 11}
                textAnchor="middle"
                dominantBaseline="alphabetic"
                style={{ fontSize: 12, fill: '#111' }}
                xmlSpace="preserve">
                {displayLines.map((line, i) => (
                  <tspan key={i} x={0} dy={i === 0 ? 0 : lineHeight}>
                    {line}
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
        inactiveNodeSize={24}
        nodeSize={(n) => {
          const recommended = isSingleNode ? true : n.id === lastLeafName
          return recommended ? 50 : 24
        }}
        nodeColor={(n) => {
          const recommended = isSingleNode ? true : n.id === lastLeafName
          return recommended ? NEXT_COLOR : DONE_COLOR
        }}
        linkThickness={2}
        // keep linkColor simple because linkComponent handles opacity itself
        linkColor={(link: any) => link?.target?.color ?? DONE_COLOR}
        meshDetectionRadius={80}
      />
    </Box>
  )
}

export default memo(NächsteEmpfehlungGraph)
