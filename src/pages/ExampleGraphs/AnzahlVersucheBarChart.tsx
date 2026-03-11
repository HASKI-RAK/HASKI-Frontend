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

  const bottomMargin = useMemo(() => {
    // For -90° labels, label length mostly translates into needed vertical space.
    const estimated = 90 + longestLabelLength * 7
    return clamp(estimated, 120, 260)
  }, [longestLabelLength])

  const bottomLegendOffset = useMemo(() => clamp(bottomMargin - 45, 60, 220), [bottomMargin])

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
          tickRotation: -90,
          tickPadding: 10,
          tickSize: 5
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
