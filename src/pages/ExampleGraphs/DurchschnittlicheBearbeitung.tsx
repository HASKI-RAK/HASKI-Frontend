import { memo, useMemo } from 'react'
import { BoxPlot } from '@nivo/boxplot'

export type RawBoxPlotDatum = {
  group: string
  subgroup: string
  value: number
}

export type PrecomputedMinMaxBoxPlotDatum = {
  group: string
  subgroup: string
  min: number
  q1: number
  median: number
  q3: number
  max: number
}

export const toNivoFromMinMax = (d: PrecomputedMinMaxBoxPlotDatum): RawBoxPlotDatum[] => {
  // Keep values sorted: [min, q1, median, q3, max]
  const values = [d.min, d.q1, d.median, d.q3, d.max]
  return values.map((value) => ({ group: d.group, subgroup: d.subgroup, value }))
}

type BaseProps = {
  width: number
  height: number
  axisLeftText?: string
  axisBottomText?: string
  minValue?: number | 'auto'
  maxValue?: number | 'auto'
}

export type DurchschnittlicheBearbeitungProps = BaseProps & { data: PrecomputedMinMaxBoxPlotDatum[] }

const DurchschnittlicheBearbeitung = (props: DurchschnittlicheBearbeitungProps) => {
  const {
    width,
    height,
    axisLeftText = 'value',
    axisBottomText = 'group',
    minValue = 'auto',
    maxValue = 'auto'
  } = props

  return (
    <BoxPlot
      width={width}
      height={height}
      data={props.data.flatMap(toNivoFromMinMax)}
      margin={{ top: 40, right: 20, bottom: 110, left: 60 }}
      padding={0.35}
      innerPadding={6}
      colorBy={'group'}
      minValue={minValue}
      maxValue={maxValue}
      groupBy={(d) => `${d.group} ${d.subgroup}`}
      value="value"
      quantiles={[0, 0.25, 0.5, 0.75, 1]}
      axisBottom={{
        legend: axisBottomText,
        legendOffset: 32,
        legendPosition: 'middle'
      }}
      axisLeft={{
        legend: axisLeftText,
        legendOffset: -40
      }}
      borderRadius={2}
      medianColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      whiskerColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateY: 90, // place it under the axis legend
          itemWidth: 80,
          itemHeight: 18,
          itemsSpacing: 12,
          symbolSize: 12,
          symbolShape: 'circle'
        }
      ]}
      animate={false}
    />
  )
}

export default memo(DurchschnittlicheBearbeitung)
