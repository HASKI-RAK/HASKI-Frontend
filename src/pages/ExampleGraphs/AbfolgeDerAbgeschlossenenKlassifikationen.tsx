import { memo, useMemo } from 'react'
import { DefaultHeatMapDatum, HeatMap, HeatMapSvgProps } from '@nivo/heatmap'

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
      // dark text for low values, white text for values > 4
      labelTextColor={(cell) => {
        const v =
          typeof cell.value === 'number'
            ? cell.value
            : typeof (cell as any)?.data?.y === 'number'
            ? (cell as any).data.y
            : Number((cell as any)?.value ?? (cell as any)?.data?.y ?? 0)

        return v > 5 ? '#ffffff' : '#111111'
      }}
      valueFormat=">-.1f"
      legends={[
        {
          anchor: 'bottom',
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: 'row',
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: '>-.2s',
          title: 'Value →',
          titleAlign: 'start',
          titleOffset: 4
        }
      ]}
    />
  )
}

export default memo(AbfolgeDerAbgeschlossenenKlassifikationen)
