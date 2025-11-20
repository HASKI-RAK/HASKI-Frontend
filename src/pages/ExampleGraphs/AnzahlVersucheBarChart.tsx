import { memo } from 'react'
import { Bar } from '@common/components'

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

const AnzahlVersucheBarChart = ({
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

export default memo(AnzahlVersucheBarChart)
