import { Bar } from '@common/components'
import { useTheme } from '@common/hooks'
import { ILS } from '@core'
import { useTranslation } from 'react-i18next'

// The Key "Dimension" is used in the Graph, therefore the name matters
// The naming of the Key "possibleDimensions" is not important, as it is not used in the Graph, just for indexing
export const useData = (data: ILS): { possibleDimensions: string; [Dimension: string]: string }[] => {
  const { t } = useTranslation()

  return [
    {
      possibleDimensions: t('components.TableILS.global') + ' / ' + t('components.TableILS.sequential'),
      [t('components.TableILS.dimension')]: data.understanding_value.toString()
    },
    {
      possibleDimensions: t('components.TableILS.verbal') + ' / ' + t('components.TableILS.visual'),
      [t('components.TableILS.dimension')]: data.input_value.toString()
    },
    {
      possibleDimensions: t('components.TableILS.intuitive') + ' / ' + t('components.TableILS.sensory'),
      [t('components.TableILS.dimension')]: data.perception_value.toString()
    },
    {
      possibleDimensions: t('components.TableILS.reflective') + ' / ' + t('components.TableILS.active'),
      [t('components.TableILS.dimension')]: data.processing_value.toString()
    }
  ]
}

type GraphILSProps = {
  data: ILS
}

const GraphILS = ({ data }: GraphILSProps) => {
  const { t } = useTranslation()

  const theme = useTheme()
  const graphILSdata = useData(data)

  return (
    <Bar
      width={750}
      height={300}
      data={graphILSdata}
      keys={[t('components.TableILS.dimension')]}
      indexBy={'possibleDimensions'}
      margin={{ top: 0, right: 100, bottom: 50, left: 80 }}
      padding={0.3}
      axisBottom={{
        tickSize: 5,
        tickValues: [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11],
        tickPadding: 5,
        tickRotation: 0,
        legend: t('components.TableILS.score'),
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value: string) => {
          return value.substring(0, value.indexOf(' / '))
        }
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value: string) => {
          return value.substring(value.indexOf(' / ') + 2, value.length)
        }
      }}
      minValue={-11}
      maxValue={11}
      layout="horizontal"
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'red_yellow_blue' }}
      colorBy="indexValue"
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#b62867',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      borderRadius={10}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 2]]
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={theme.palette.common.white}
    />
  )
}

export default GraphILS
