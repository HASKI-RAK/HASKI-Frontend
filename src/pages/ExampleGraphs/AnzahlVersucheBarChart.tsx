import { memo } from 'react'
import { ResponsiveBar } from '@nivo/bar'

type BarChartProps = {
  keys: string[] // multiple keys supported
  indexBy: string
  color: string[] // array of colors matching keys
  axisLeftText: string
  axisBottomText: string
  data: Array<Record<string, string | number>>
  maxHeight?: number // ✅ added
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
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        maxHeight
      }}>
      <ResponsiveBar
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
        groupMode="stacked"
      />
    </div>
  )
}

export default memo(AnzahlVersucheBarChart)
