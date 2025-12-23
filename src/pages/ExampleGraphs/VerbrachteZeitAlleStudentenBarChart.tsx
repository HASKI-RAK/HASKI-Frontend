import { memo } from 'react'
import { Bar } from '@common/components'
import { BarCustomLayerProps } from '@nivo/bar'
import { line, curveMonotoneX } from 'd3-shape'

type BarChartProps = {
  width: number
  height: number
  keys: string[]
  indexBy: string
  color: string[]
  axisLeftText: string
  axisBottomText: string
  data: Array<Record<string, string | number>>
}

type BarDatum = Record<string, string | number>

const TrendLineLayer = ({ bars }: BarCustomLayerProps<BarDatum>) => {
  const points = bars.map((bar) => ({
    x: bar.x + bar.width / 2,
    y: bar.y
  }))

  const lineGenerator = line<{ x: number; y: number }>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveMonotoneX)

  return <path d={lineGenerator(points) ?? undefined} fill="none" stroke="#000" strokeWidth={2} />
}

const VerbrachteZeitAlleStudentenBarChart = ({
  width,
  height,
  keys,
  indexBy,
  color,
  axisLeftText,
  axisBottomText,
  data
}: BarChartProps) => {
  return (
    <Bar
      width={width}
      height={height}
      data={data}
      keys={keys}
      indexBy={indexBy}
      labelSkipWidth={12}
      labelSkipHeight={12}
      colors={color}
      layers={['grid', 'axes', 'bars', 'markers', 'legends', TrendLineLayer]}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          translateX: 120,
          itemsSpacing: 3,
          itemWidth: 100,
          itemHeight: 16
        }
      ]}
      axisBottom={{ legend: axisBottomText, legendOffset: 40, legendPosition: 'middle' }}
      axisLeft={{ legend: axisLeftText, legendOffset: -40, legendPosition: 'middle' }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    />
  )
}

export default memo(VerbrachteZeitAlleStudentenBarChart)
