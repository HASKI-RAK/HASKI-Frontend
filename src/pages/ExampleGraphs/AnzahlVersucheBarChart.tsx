import { memo, useMemo } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import type { Theme as NivoTheme } from '@nivo/core'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@common/theme'

type BarChartProps = {
  keys: string[]
  indexBy: string
  color: string[]
  axisLeftText: string
  axisBottomText: string
  data: Array<Record<string, string | number>>
  maxHeight?: number
}

const AnzahlVersucheBarChart = ({
  keys,
  indexBy,
  color,
  axisLeftText,
  axisBottomText,
  data,
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
          stroke: theme.palette.text.primary,
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

  return (
    <div style={{ width: '100%', aspectRatio: '16 / 9', maxHeight }}>
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        colors={color}
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
        axisBottom={{ legend: axisBottomText, legendOffset: 40, legendPosition: 'middle' }}
        axisLeft={{ legend: axisLeftText, legendOffset: -40, legendPosition: 'middle' }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        groupMode="stacked"
      />
    </div>
  )
}

export default memo(AnzahlVersucheBarChart)
