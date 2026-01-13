import { memo, useState } from 'react'
import { Box } from '@common/components'
import PieChart from './PieChart'
import DatePickerForChart from './DatePickerForChart'
import AnzahlVersucheBarChart from './AnzahlVersucheBarChart'
import VerbrachteZeitAlleStudentenBarChart from './VerbrachteZeitAlleStudentenBarChart'
import { DateRange } from '../../components/DateRangePicker'
import dayjs from 'dayjs'
import DurchschnittlicheBearbeitung, { PrecomputedMinMaxBoxPlotDatum } from './DurchschnittlicheBearbeitung'
import NächsteEmpfehlungGraph from './NächsteEmpfehlung'
import AbfolgeDerAbgeschlossenenKlassifikationen from './AbfolgeDerAbgeschlossenenKlassifikationen'

const exampleData: Record<string, string | number>[] = [
  { student: '1', KÜ: 5, EK: 7, SE: 3, LZ: 8 },
  { student: '2', KÜ: 2, EK: 6, SE: 4, LZ: 5 },
  { student: '3', KÜ: 8, EK: 3, SE: 7, LZ: 6 },
  { student: '4', KÜ: 1, EK: 4, SE: 5, LZ: 2 }
]

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

const dataBarChart_1 = [
  { calendarWeek: '32', Versuche: 141, Versuche_1: 80 },
  { calendarWeek: '33', Versuche: 140, Versuche_1: 50 },
  { calendarWeek: '34', Versuche: 84, Versuche_1: 90 },
  { calendarWeek: '35', Versuche: 109, Versuche_1: 70 },
  { calendarWeek: '36', Versuche: 141, Versuche_1: 60 },
  { calendarWeek: '37', Versuche: 12, Versuche_1: 20 },
  { calendarWeek: '38', Versuche: 24, Versuche_1: 10 }
]

const dataPieChart: { id: string; label: string; value: number; color: string }[] = [
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

const precomputed: PrecomputedMinMaxBoxPlotDatum[] = [
  { group: 'Alpha', subgroup: 'A', min: 3.2, q1: 4.1, median: 5.0, q3: 5.9, max: 6.8 },
  { group: 'Beta', subgroup: 'B', min: 2.1, q1: 3.1, median: 6.0, q3: 4.9, max: 7.8 },
  { group: 'Gamma', subgroup: 'C', min: 3.2, q1: 4.1, median: 5.0, q3: 5.9, max: 6.8 },
  { group: 'Delta', subgroup: 'D', min: 2.1, q1: 3.1, median: 6.0, q3: 4.9, max: 7.8 }
]

const treeData = {
  name: 'Lines of Code Übung - 1',
  course: 'Kurs-1',
  topic: 'Topic-1',
  date: '2024-05-15',
  classification: 'ÜB',
  children: [
    {
      name: 'Lines of Code Übung - 2',
      course: 'Kurs-1',
      topic: 'Topic-1',
      date: '2024-05-15',
      classification: 'ÜB',
      children: [
        {
          name: 'Lines of Code Selbsteinschätzungstest - 1',
          course: 'Kurs-1',
          topic: 'Topic-1',
          date: '2024-05-20',
          classification: 'SE',
          children: [{ name: 'Markov - Erklärung', course: 'Kurs-1', topic: 'Topic-2', classification: 'EK' }]
        }
      ]
    }
  ]
}

const totalHours = dataPieChart.reduce((sum, d) => sum + d.value, 0)

const ExampleGraphs = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: dayjs().subtract(30, 'day'),
    endDate: dayjs()
  })

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange)
    // Filter your chart data based on the new date range here
    console.log('Date range changed:', newDateRange)
  }

  return (
    <Box sx={{ ml: 10, mr: 10, mt: 5 }}>
      <Box sx={{ height: '500px', width: '50%', position: 'relative' }}>
        <PieChart width={500} height={500} data={dataPieChart} totalHours={totalHours} />
        <DatePickerForChart
          width={800}
          onDateRangeChange={handleDateRangeChange}
          initialStartDate={dateRange.startDate}
          initialEndDate={dateRange.endDate}
          position={{ top: 10, right: 10 }}
          showPresets={true}
        />
        <AnzahlVersucheBarChart
          width={750}
          height={300}
          keys={['Versuche']}
          indexBy={'calendarWeek'}
          color={['#6EC6FF']}
          axisLeftText={'Anzahl Versuche'}
          axisBottomText={'Kalenderwoche'}
          data={dataBarChart}
        />
        <AnzahlVersucheBarChart
          width={750}
          height={300}
          keys={['Versuche', 'Versuche_1']}
          indexBy={'calendarWeek'}
          color={['#6EC6FF', '#fd6ed4']}
          axisLeftText={'Anzahl Versuche'}
          axisBottomText={'Kalenderwoche'}
          data={dataBarChart_1}
        />
        <VerbrachteZeitAlleStudentenBarChart
          width={750}
          height={300}
          keys={['Versuche']}
          indexBy={'calendarWeek'}
          color={['#FFAA46']}
          axisLeftText={'Verbrachte Zeit (Stunden)'}
          axisBottomText={'Kalenderwoche'}
          data={dataBarChart}
        />
        <DurchschnittlicheBearbeitung
          width={750}
          height={400}
          data={precomputed}
          axisLeftText="Bearbeitungszeit (Tage)"
          axisBottomText="Studentengruppen"
        />
        <NächsteEmpfehlungGraph width={700} height={400} data={treeData} />
        <AbfolgeDerAbgeschlossenenKlassifikationen
          width={700}
          height={400}
          data={exampleData} // flat array
          keys={['KÜ', 'EK', 'SE', 'LZ']} // columns
          indexBy="student" // row identifier
          axisLeftText="Position"
          axisTopText="Position"
        />
      </Box>
    </Box>
  )
}

export default memo(ExampleGraphs)
