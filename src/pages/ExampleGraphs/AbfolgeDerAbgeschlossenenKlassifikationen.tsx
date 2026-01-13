import { memo, useMemo, ComponentType, ReactNode } from 'react'
import { HeatMap, DefaultHeatMapDatum, HeatMapSvgProps } from '@nivo/heatmap'

type HeatMapInputRow = Record<string, string | number>

type HeatMapProps = {
  width: number
  height: number
  keys: string[]
  indexBy: string
  axisLeftText: string
  axisTopText: string
  data: HeatMapInputRow[]
  colors?: HeatMapSvgProps<DefaultHeatMapDatum, Record<string, unknown>>['colors']
}

const AbfolgeDerAbgeschlossenenKlassifikationen = ({
  width,
  height,
  keys,
  indexBy,
  axisLeftText,
  axisTopText,
  data,
  colors
}: HeatMapProps) => {
  const transformedData = useMemo<HeatMapSvgProps<DefaultHeatMapDatum, Record<string, unknown>>['data']>(
    () =>
      data.map((row, rowIndex) => {
        const idSource = row[indexBy]
        const id =
          typeof idSource === 'string' ? idSource : typeof idSource === 'number' ? String(idSource) : `row-${rowIndex}`

        return {
          id,
          data: keys.map((key) => {
            const rawValue = row[key]
            const numericValue =
              typeof rawValue === 'number' ? rawValue : Number.isNaN(Number(rawValue)) ? 0 : Number(rawValue)

            return { x: key, y: numericValue }
          })
        }
      }),
    [data, indexBy, keys]
  )

  return (
    <HeatMap<DefaultHeatMapDatum, Record<string, unknown>>
      width={width}
      height={height}
      data={transformedData}
      margin={{ top: 80, right: 60, bottom: 60, left: 100 }}
      colors={
        colors ?? {
          type: 'diverging',
          scheme: 'red_yellow_blue',
          divergeAt: 0.5
        }
      }
      emptyColor="#f5f5f5"
      axisTop={{
        legend: axisTopText,
        legendOffset: -40,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45
      }}
      axisLeft={{
        legend: axisLeftText,
        legendOffset: -60,
        legendPosition: 'middle',
        tickSize: 5,
        tickPadding: 5
      }}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.4]]
      }}
      valueFormat=">-.1f"
    />
  )
}

export default memo(AbfolgeDerAbgeschlossenenKlassifikationen)
