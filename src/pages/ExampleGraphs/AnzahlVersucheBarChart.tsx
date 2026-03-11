import { memo, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { ResponsiveBar } from '@nivo/bar'
import type { Theme as NivoTheme } from '@nivo/core'
import type { Theme } from '@common/theme'

export type BarDatum = {
  label: string
  value: number
}

type BarChartProps = {
  data: BarDatum[]
  color?: string
  axisLeftText: string
  axisBottomText: string
  maxHeight?: number
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const wrapLabel = (text: string, maxLineLength = 12, maxLines = 3): string[] => {
  if (!text) return ['']

  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    if (!current) {
      current = word
      continue
    }

    if (`${current} ${word}`.length <= maxLineLength) {
      current = `${current} ${word}`
    } else {
      lines.push(current)
      current = word

      if (lines.length >= maxLines - 1) break
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current)
  }

  const consumedWords = lines.join(' ').split(' ').filter(Boolean).length
  if (consumedWords < words.length && lines.length > 0) {
    const last = lines[lines.length - 1]
    lines[lines.length - 1] = last.length > maxLineLength - 1 ? `${last.slice(0, maxLineLength - 1)}…` : `${last}…`
  }

  return lines
}

type CustomTickProps = {
  x: number
  y: number
  value: string | number
}

const BottomTick = ({ x, y, value }: CustomTickProps) => {
  const theme = useTheme<Theme>()
  const lines = wrapLabel(String(value), 12, 3)

  return (
    <g transform={`translate(${x},${y + 10})`}>
      <text
        textAnchor="middle"
        dominantBaseline="hanging"
        style={{
          fill: theme.palette.text.primary,
          fontSize: 11
        }}>
        {lines.map((line, i) => (
          <tspan key={`${value}-${i}`} x={0} dy={i === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

const AnzahlVersucheBarChart = ({
  data,
  color = '#6EC6FF',
  axisLeftText,
  axisBottomText,
  maxHeight = 500
}: BarChartProps) => {
  const theme = useTheme<Theme>()

  const nivoTheme: NivoTheme = useMemo(
    () => ({
      text: {
        fill: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily
      },
      axis: {
        ticks: {
          text: { fill: theme.palette.text.primary }
        },
        legend: {
          text: { fill: theme.palette.text.primary }
        }
      },
      legends: {
        text: { fill: theme.palette.text.primary }
      },
      labels: {
        text: { fill: theme.palette.text.primary }
      },
      grid: {
        line: {
          stroke: theme.palette.divider,
          strokeWidth: 1
        }
      },
      tooltip: {
        container: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[3],
          borderRadius: 8
        }
      }
    }),
    [theme]
  )

  const longestLabelLength = useMemo(() => data.reduce((max, item) => Math.max(max, item.label.length), 0), [data])

  const estimatedLineCount = useMemo(() => {
    const wrappedLongest = wrapLabel(
      data.reduce((longest, item) => (item.label.length > longest.length ? item.label : longest), ''),
      12,
      3
    )
    return wrappedLongest.length
  }, [data])

  const bottomMargin = useMemo(() => {
    const estimated = 70 + estimatedLineCount * 18 + Math.min(longestLabelLength, 20)
    return clamp(estimated, 110, 180)
  }, [estimatedLineCount, longestLabelLength])

  const bottomLegendOffset = useMemo(() => clamp(bottomMargin - 20, 70, 160), [bottomMargin])

  return (
    <div style={{ width: '100%', aspectRatio: '16 / 9', maxHeight }}>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="label"
        colors={[color]}
        theme={nivoTheme}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemsSpacing: 3,
            itemWidth: 100,
            itemHeight: 16,
            effects: [
              {
                on: 'hover',
                style: { itemTextColor: theme.palette.text.primary }
              }
            ]
          }
        ]}
        axisBottom={{
          legend: axisBottomText,
          legendOffset: bottomLegendOffset,
          legendPosition: 'middle',
          tickSize: 5,
          tickPadding: 8,
          renderTick: BottomTick
        }}
        axisLeft={{
          legend: axisLeftText,
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        margin={{ top: 50, right: 130, bottom: bottomMargin, left: 60 }}
        groupMode="stacked"
      />
    </div>
  )
}

export default memo(AnzahlVersucheBarChart)
