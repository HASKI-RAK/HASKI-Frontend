import { Bar } from '@nivo/bar'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material'
import { ILS } from '@core'

// The Key "Dimension" is used in the Graph, therefore the name matters
// The naming of the Key "possibleDimensions" is not important, as it is not used in the Graph, just for indexing
export const useData = (
  dimensionOneScore: number,
  dimensionTwoScore: number,
  dimensionThreeScore: number,
  dimensionFourScore: number
): { possibleDimensions: string; [Dimension: string]: string }[] => {
  const { t } = useTranslation()

  return [
    {
      possibleDimensions:
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Global') +
        ' / ' +
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sequential'),
      [t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension')]: [dimensionFourScore].toString()
    },
    {
      possibleDimensions:
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Verbal') +
        ' / ' +
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Visual'),
      [t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension')]: dimensionThreeScore.toString()
    },
    {
      possibleDimensions:
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Intuitive') +
        ' / ' +
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Sensory'),
      [t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension')]: dimensionTwoScore.toString()
    },
    {
      possibleDimensions:
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Reflective') +
        ' / ' +
        t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Active'),
      [t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension')]: dimensionOneScore.toString()
    }
  ]
}

type GraphILSProps = {
  data: ILS
}

export const GraphILS = ({ data }: GraphILSProps) => {
  const { t } = useTranslation()

  const dimensionOneScore = data.input_value
  const dimensionTwoScore = data.perception_value
  const dimensionThreeScore = data.processing_value
  const dimensionFourScore = data.understanding_value

  const theme = useTheme()
  const graphILSdata = useData(dimensionOneScore, dimensionTwoScore, dimensionThreeScore, dimensionFourScore)

  return (
    <div>
      <Bar
        width={750}
        height={300}
        data={graphILSdata}
        keys={[t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Dimension')]}
        indexBy={'possibleDimensions'}
        margin={{ top: 0, right: 100, bottom: 50, left: 80 }}
        padding={0.3}
        axisBottom={{
          tickSize: 5,
          tickValues: [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11],
          tickPadding: 5,
          tickRotation: 0,
          legend: t('components.Questionnaire.QuestionnaireResults.Table.TableILS.Score'),
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
    </div>
  )
}
