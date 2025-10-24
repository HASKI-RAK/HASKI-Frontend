import { memo } from 'react'
import { ResponsivePie } from '@nivo/pie'

const dataPie: { id: string; label: string; value: number; color: string }[] = [
  {
    id: 'Course-1',
    label: 'Course-1',
    value: 429,
    color: 'hsl(49, 70%, 50%)'
  },
  {
    id: 'Course-2',
    label: 'Course-2',
    value: 104,
    color: 'hsl(307, 70%, 50%)'
  },
  {
    id: 'Course-3',
    label: 'Course-3',
    value: 364,
    color: 'hsl(223, 70%, 50%)'
  },
  {
    id: 'Course-4',
    label: 'Course-4',
    value: 482,
    color: 'hsl(9, 70%, 50%)'
  }
]

const totalHours = dataPie.reduce((sum, d) => sum + d.value, 0)

const PieChart = () => {
  return (
    <ResponsivePie
      data={dataPie}
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
          data: dataPie.map((item) => ({
            id: item.id,
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
