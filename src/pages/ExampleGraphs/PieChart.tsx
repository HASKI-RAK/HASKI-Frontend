import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { ResponsivePie } from '@nivo/pie'
import type { Theme } from '@common/theme'

type PieChartRequiredProps = {
  label: string
  value: number
}

type PieChartProps<T extends PieChartRequiredProps = PieChartRequiredProps> = {
  totalHours?: number
  data: T[]
  maxHeight?: number
}

const PieChart = ({ data, maxHeight = 500 }: PieChartProps) => {
  const theme = useTheme<Theme>()
  const { t } = useTranslation()

  const totalHours = data.reduce((sum, d) => sum + d.value, 0)

  // ✅ if total is 0, show one placeholder segment
  const safeData: PieChartRequiredProps[] =
    totalHours > 0 ? data : [{ label: t('pages.exampleGraphs.PieChartNoData'), value: 1 }]

  const enhancedData = useMemo(
    () =>
      safeData.map((d) => ({
        // ✅ provide a stable id for nivo
        id: d.label,
        label: totalHours > 0 ? `${d.label} (${d.value}h)` : d.label,
        value: d.value
      })),
    [safeData, totalHours]
  )

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        maxHeight
      }}>
      <ResponsivePie
        data={enhancedData}
        // ✅ gray slice for "no data", otherwise use normal scheme
        colors={totalHours > 0 ? { scheme: 'nivo' } : ['#e0e0e0']}
        theme={{
          labels: {
            text: {
              fontSize: 16,
              fill: theme.palette.text.primary
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
        animate={false}
        arcLinkLabelsTextColor={theme.palette.text.primary}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabel={(d) => {
          if (totalHours <= 0) return ''
          return `${((Number(d.value) / totalHours) * 100).toFixed(1)}%`
        }}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: -80,
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
                {t('pages.exampleGraphs.PieChartTotalHours')}
              </text>
            </g>
          )
        ]}
      />
    </div>
  )
}

export default memo(PieChart)
