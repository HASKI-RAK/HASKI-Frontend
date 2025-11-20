import { memo } from 'react'
import { Pie } from '@common/components'

type PieChartRequiredProps = {
  label: string
  value: number
  color: string
}

type PieChartProps<T extends PieChartRequiredProps = PieChartRequiredProps> = {
  width: number
  height: number
  totalHours: number
  data: T[]
}

const PieChart = ({ height, width, data }: PieChartProps) => {
  const totalHours = data.reduce((sum, d) => sum + d.value, 0)
  return (
    <Pie
      height={height}
      width={width}
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.6}
      cornerRadius={2}
      activeOuterRadiusOffset={8}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      animate={false}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabel={(d) => `${((d.value / totalHours) * 100).toFixed(1)}%`}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          symbolShape: 'circle',
          data: data.map((item) => ({
            id: item.label,
            label: `${item.label}: ${item.value}h`,
            color: item.color
          }))
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
              style={{ fontSize: 24, fontWeight: 700, fill: '#333' }}>
              {totalHours}
            </text>
            <text
              x={centerX}
              y={centerY + 16}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontSize: 14, fill: '#666' }}>
              Total Hours
            </text>
          </g>
        )
      ]}
    />
  )
}

export default memo(PieChart)
