import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { LearningPathLearningElementNode } from '@components'
import { Tree } from '@nivo/tree'
import { Box, Stack, Typography } from '@common/components'
import { useTheme } from '@common/hooks'
import { getNodeIcon } from '@components'

export type TreeDatum = {
  name: string
  classification?: string
  date?: string
  children?: TreeDatum[]
}

export type MyTreeProps = {
  data: TreeDatum
  margin?: { top: number; right: number; bottom: number; left: number }
  maxHeight?: number
  aspectRatio?: `${number} / ${number}` | string
}

type NivoPoint = { x: number; y: number }
type NivoNodeDatum = TreeDatum & Partial<LearningPathLearningElementNode>
type NivoNodeLike = { id: string; x: number; y: number; color: string; data: NivoNodeDatum }
type NivoLinkLike = { source: NivoNodeLike; target: NivoNodeLike }
type LinkComponentProps = { link: NivoLinkLike; style?: { strokeWidth?: number } }

const DONE_COLOR = '#61cdbb'
const FIRST_NODE_OPACITY = 0.35
const BASE_LINK_OPACITY = 0.4
const DEFAULT_MARGIN = { top: 60, right: 60, bottom: 60, left: 60 }

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const countNodes = (root: TreeDatum): number => 1 + (root.children?.reduce((acc, ch) => acc + countNodes(ch), 0) ?? 0)

// Keep only the first N nodes along a single path (root -> first child -> first child ...).
const pruneToFirstNNodes = (root: TreeDatum, n: number): TreeDatum => {
  if (n <= 1) return { ...root, children: undefined }
  const child = root.children?.[0]
  if (!child) return { ...root, children: undefined }
  return { ...root, children: [pruneToFirstNNodes(child, n - 1)] }
}

const shiftPoint = (from: NivoPoint, to: NivoPoint, distance: number): NivoPoint => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  return { x: from.x + (dx / len) * distance, y: from.y + (dy / len) * distance }
}

// ✅ hard break every N chars and add "-" only if there isn't already one at the break
const splitEveryN = (text: string, n: number): string[] => {
  if (!text) return []
  const chunks: string[] = []

  for (let i = 0; i < text.length; i += n) {
    const part = text.slice(i, i + n)
    const nextIndex = i + n
    const isLast = nextIndex >= text.length

    // if the chunk already ends with "-" OR the next character is "-", don't add another
    const hasDashAtBoundary = part.endsWith('-') || (!isLast && text.charAt(nextIndex) === '-')

    chunks.push(isLast || hasDashAtBoundary ? part : `${part}-`)
  }

  return chunks
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

const useElementSize = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setSize({ width: Math.floor(width), height: Math.floor(height) })
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, size }
}

const NächsteEmpfehlungGraph = ({
  data,
  margin = DEFAULT_MARGIN,
  maxHeight = 500,
  aspectRatio = '16 / 9'
}: MyTreeProps) => {
  // ✅ only 3 nodes
  const prunedData = useMemo(() => pruneToFirstNNodes(data, 3), [data])
  const { t } = useTranslation()

  const firstNodeName = prunedData.name
  const isSingleNode = useMemo(() => countNodes(prunedData) === 1, [prunedData])

  const theme = useTheme()

  // Measure the aspect-ratio wrapper
  const { ref, size } = useElementSize()
  const w = size.width
  const h = size.height
  const canRender = w > 0 && h > 0

  // Responsive sizing from measured pixels
  const s = useMemo(() => {
    const minDim = Math.max(1, Math.min(w, h))

    const nodeR = clamp(minDim * 0.07, 24, 44)
    const iconSize = Math.round(nodeR * 1.05)

    const dateFontSize = clamp(minDim * 0.024, 14, 16)
    const noteFontSize = clamp(minDim * 0.03, 14, 18)
    const lineHeight = Math.round(noteFontSize * 1.3)

    const notePaddingX = clamp(minDim * 0.03, 10, 18)
    const notePaddingY = clamp(minDim * 0.02, 8, 14)
    const noteFold = clamp(minDim * 0.03, 12, 18)

    const approxCharWidthPx = noteFontSize * 0.56
    const minNoteWidth = clamp(minDim * 0.34, 160, 280)
    const maxNoteWidthPx = clamp(w * 0.38, 200, 420)

    return {
      nodeR,
      iconSize,
      dateFontSize,
      noteFontSize,
      lineHeight,
      notePaddingX,
      notePaddingY,
      noteFold,
      approxCharWidthPx,
      minNoteWidth,
      maxNoteWidthPx
    }
  }, [w, h])

  // Estimate max note width using ONLY name lines (18-char chunks)
  const maxNoteWidthNeeded = useMemo(() => {
    const allNodes: TreeDatum[] = []
    const collect = (n: TreeDatum) => {
      allNodes.push(n)
      n.children?.forEach(collect)
    }
    collect(prunedData)

    return allNodes.reduce((maxPx, n) => {
      const lines = splitEveryN(n.name ?? '', 20)
      const maxLen = lines.reduce((m, t) => Math.max(m, t.length), 0)

      const noteWidth = Math.max(
        s.minNoteWidth,
        Math.min(s.maxNoteWidthPx, Math.round(maxLen * s.approxCharWidthPx + s.notePaddingX * 2))
      )

      return Math.max(maxPx, noteWidth)
    }, s.minNoteWidth)
  }, [prunedData, s])

  const effectiveMargin = useMemo(() => {
    const side = Math.ceil(maxNoteWidthNeeded / 2 + s.nodeR + 12)
    return {
      top: Math.max(margin.top, Math.ceil(s.nodeR + 24)),
      bottom: Math.max(margin.bottom, Math.ceil(s.nodeR + 90)),
      left: Math.max(margin.left, side),
      right: Math.max(margin.right, side)
    }
  }, [maxNoteWidthNeeded, margin, s.nodeR])

  const linkComponent = useMemo(() => {
    const pad = 2

    const LinkAtCircleBorder = ({ link, style }: LinkComponentProps) => {
      const start = shiftPoint(
        { x: link.source.x, y: link.source.y },
        { x: link.target.x, y: link.target.y },
        s.nodeR + pad
      )
      const end = shiftPoint(
        { x: link.target.x, y: link.target.y },
        { x: link.source.x, y: link.source.y },
        s.nodeR + pad
      )

      const midX = (start.x + end.x) / 2
      const d = `M${start.x},${start.y} C${midX},${start.y} ${midX},${end.y} ${end.x},${end.y}`

      const isFromFirst = !isSingleNode && link.source.id === firstNodeName
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
    };

    return LinkAtCircleBorder
  }, [firstNodeName, isSingleNode, s.nodeR])

  return (
    <Box sx={{ width: '100%', aspectRatio, maxHeight }}>
      <Box ref={ref} sx={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Legend */}
        <Box
          sx={{
            position: 'absolute',
            top: -24,
            right: 30,
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
              <Typography variant="caption">{t('pages.exampleGraphs.LastElementLegend')}</Typography>
            </Stack>
          </Stack>
        </Box>

        {canRender ? (
          <Tree
            width={w}
            height={h}
            margin={effectiveMargin}
            linkComponent={linkComponent}
            linkThickness={2}
            linkColor={(link: { target: { color?: string } }) => link.target.color ?? DONE_COLOR}
            meshDetectionRadius={80}
            enableLabel={false}
            layout="left-to-right"
            data={prunedData}
            identity="name"
            inactiveNodeSize={s.nodeR}
            nodeSize={() => s.nodeR}
            nodeColor={() => DONE_COLOR}
            nodeComponent={({ node }: { node: NivoNodeLike }) => {
              const nd = node.data
              const isFirst = node.id === firstNodeName
              const fadeOpacity = !isSingleNode && isFirst ? FIRST_NODE_OPACITY : 1

              // ✅ Only name, hard-broken every 18 chars
              const displayLines = splitEveryN(nd.name ?? '', 20)

              const maxLen = displayLines.reduce((m, t) => Math.max(m, t.length), 0)
              const noteWidth = Math.max(
                s.minNoteWidth,
                Math.min(s.maxNoteWidthPx, Math.round(maxLen * s.approxCharWidthPx + s.notePaddingX * 2))
              )
              const noteHeight = Math.max(
                Math.round(s.noteFontSize * 2.6),
                Math.round(displayLines.length * s.lineHeight + s.notePaddingY * 2)
              )

              const noteTopY = s.nodeR + 12
              const noteLeftX = -noteWidth / 2
              const noteRightX = noteWidth / 2
              const noteBottomY = noteTopY + noteHeight

              const notePath = makeNotePath(noteLeftX, noteTopY, noteRightX, noteBottomY, s.noteFold)
              const foldPath = makeFoldPath(noteRightX, noteTopY, s.noteFold)
              const dateY = -(s.nodeR + 12)

              return (
                <g transform={`translate(${node.x},${node.y})`} opacity={fadeOpacity}>
                  {nd.date?.trim() ? (
                    <text
                      y={dateY}
                      textAnchor="middle"
                      style={{ fontSize: s.dateFontSize, opacity: 0.85 }}
                      fill={theme.palette.text.primary}
                      xmlSpace="preserve">
                      {nd.date}
                    </text>
                  ) : null}

                  <circle r={s.nodeR} fill={node.color} />

                  <foreignObject
                    x={-s.iconSize / 2}
                    y={-s.iconSize / 2}
                    width={s.iconSize}
                    height={s.iconSize}
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
                      {getNodeIcon(nd.classification ?? '', s.iconSize)}
                    </div>
                  </foreignObject>

                  <line x1={0} y1={s.nodeR} x2={0} y2={noteTopY} stroke="#999" strokeWidth={1} strokeDasharray="3 3" />

                  <path d={notePath} fill="#fff" opacity={0.96} stroke="#999" strokeWidth={1} />
                  <path d={foldPath} fill="none" stroke="#999" strokeWidth={1} />

                  <text
                    x={0}
                    y={noteTopY + s.notePaddingY + (s.noteFontSize + 1)}
                    textAnchor="middle"
                    dominantBaseline="alphabetic"
                    style={{ fontSize: s.noteFontSize, fill: '#111' }}
                    xmlSpace="preserve">
                    {displayLines.map((line, i) => (
                      <tspan key={`${node.id}-${i}`} x={0} dy={i === 0 ? 0 : s.lineHeight}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )
            }}
          />
        ) : null}
      </Box>
    </Box>
  )
}

NächsteEmpfehlungGraph.displayName = 'NächsteEmpfehlungGraph'
export default memo(NächsteEmpfehlungGraph)
