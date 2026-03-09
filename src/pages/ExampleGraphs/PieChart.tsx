import { memo } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useTheme } from '@mui/material/styles'
import type { Theme } from '@common/theme'

type PieChartRequiredProps = {
  label: string
  value: number
  color: string
}

type PieChartProps<T extends PieChartRequiredProps = PieChartRequiredProps> = {
  totalHours?: number
  data: T[]
  maxHeight?: number
}

const PieChart = ({ data, maxHeight = 500 }: PieChartProps) => {
  const theme = useTheme<Theme>()

  const totalHours = data.reduce((sum, d) => sum + d.value, 0)
  const enhancedData = data.map((d) => ({
    ...d,
    label: `${d.label} (${d.value}h)`
  }))

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        maxHeight
      }}>
      <ResponsivePie
        data={enhancedData}
        theme={{
          labels: {
            text: {
              fontSize: 16
            }
          },
          legends: {
            text: {
              fill: theme.palette.text.primary
            }
          }
        }}
        margin={{ top: 40, right: 70, bottom: 50, left: 70 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        animate={false}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabel={(d) => `${((d.value / totalHours) * 100).toFixed(1)}%`}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateY: 35,
            itemWidth: 50,
            itemHeight: 18,
            symbolShape: 'circle'
          }
        ]}
        layers={[
          'arcs',
          'arcLabels',
          'arcLinkLabels',
          'legends',
          ({ centerX, centerY }) => (
            <g key="center-text">
              <text
                x={centerX}
                y={centerY - 8}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: 24, fontWeight: 700 }}
                fill={theme.palette.text.primary}>
                {totalHours}
              </text>
              <text
                x={centerX}
                y={centerY + 16}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: 14 }}
                fill={theme.palette.text.primary}>
                Total Hours
              </text>
            </g>
          )
        ]}
      />
    </div>
  )
}

export default memo(PieChart)
