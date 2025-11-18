import { memo } from 'react'
import { ResponsiveBar } from '@nivo/bar'

const dataBarChart = [
  {
    calendarWeek: '32',
    Versuche: 141
  },
  {
    calendarWeek: '33',
    Versuche: 140
  },
  {
    calendarWeek: '34',
    Versuche: 84
  },
  {
    calendarWeek: '35',
    Versuche: 109
  },
  {
    calendarWeek: '36',
    Versuche: 141
  },
  {
    calendarWeek: '37',
    Versuche: 12
  },
  {
    calendarWeek: '38',
    Versuche: 24
  }
]

const AnzahlVersucheBarChart = () => {
  return (
    <ResponsiveBar
      data={dataBarChart}
      keys={['Versuche']}
      indexBy="calendarWeek"
      labelSkipWidth={12}
      labelSkipHeight={12}
      colors={['#6EC6FF']}
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
      axisBottom={{ legend: 'calendarWeek', legendOffset: 40, legendPosition: 'middle' }}
      axisLeft={{ legend: 'Anzahl Versuche', legendOffset: -40, legendPosition: 'middle' }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    />
  )
}

export default memo(AnzahlVersucheBarChart)
