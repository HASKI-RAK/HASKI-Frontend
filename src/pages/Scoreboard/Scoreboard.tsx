import { memo, useCallback, useMemo, useState } from 'react'
import { CalendarMonthRounded, CancelRounded, CheckCircleRounded, StarRounded } from '@mui/icons-material'
import { useCourseProgress } from '@common/hooks'
import {
  DashboardLayout,
  DashboardList,
  DashboardListItemProps,
  DashboardListItemStat,
  DashboardNavHeader,
  getNodeIcon,
  LabeledProgressBar,
  useDashboardNavigation
} from '@components'
import { Course, LearningElement, Topic } from '@core'
import { useScoreboard } from './Scoreboard.hooks'
import PieChart from '../ExampleGraphs/PieChart'
import AnzahlVersucheBarChart from '../ExampleGraphs/AnzahlVersucheBarChart'
import NächsteEmpfehlungGraph from '../ExampleGraphs/NächsteEmpfehlung'
import DatePickerForChart from '../ExampleGraphs/DatePickerForChart'
import { DateRange } from '../../components/DateRangePicker'
import dayjs from 'dayjs'

/*const dataPieChart: { label: string; value: number }[] = [
  {
    label: 'Course-1',
    value: 429
  },
  {
    label: 'Course-2',
    value: 104
  },
  {
    label: 'Course-3',
    value: 364
  },
  {
    label: 'Course-4',
    value: 482
  }
]



const dataBarChart = [
  {
    label: 'RQ',
    value: 141
  },
  {
    label: 'ÜB',
    value: 140
  },
  {
    label: 'SE',
    value: 84
  },
  {
    label: 'BE',
    value: 109
  },
  {
    label: 'AB',
    value: 141
  },
  {
    label: 'KÜ',
    value: 12
  },
  {
    label: 'ZL',
    value: 24
  }
]*/

/*const treeData = {
  name: 'Lines of Code Übung - 1',
  date: '2024-05-15',
  classification: 'ÜB',
  children: [
    {
      name: 'Lines of Code Übung - 2',
      date: '2024-05-15',
      classification: 'ÜB',
      children: [
        {
          name: 'Lines of Code Selbsteinschätzungstest - 1',
          date: '2024-05-20',
          classification: 'SE',
          children: [{ name: 'Markov - Erklärung', course: 'Kurs-1', topic: 'Topic-2', classification: 'EK' }]
        }
      ]
    }
  ]
}*/

const toIsoDate = (s?: string): string | undefined => {
  if (!s) return undefined
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10)
}

type TreeDatum = {
  name: string
  date?: string
  classification?: string
  children?: TreeDatum[]
}

type LastElement = {
  completed_at: string
  learning_element: Partial<LearningElement>
}

export const treeDataFromLast = (lastElements: Record<string, LastElement>): TreeDatum | null => {
  const ordered = Object.values(lastElements)
    .filter((x) => Boolean(x?.learning_element?.name))
    .sort((a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime())
    .slice(-3) // ✅ always take last 3 (newest 3, still ordered oldest->newest)
    .map((x) => ({
      name: x.learning_element.name ?? 'Unknown',
      date: toIsoDate(x.completed_at),
      classification: x.learning_element.classification
    }))

  if (ordered.length === 0) return null

  const root: TreeDatum = { ...ordered[0] }
  let cursor = root

  for (let i = 1; i < ordered.length; i += 1) {
    const next: TreeDatum = { ...ordered[i] }
    cursor.children = [next]
    cursor = next
  }

  return root
}

const Scoreboard = () => {
  const { currentItems, select, level, back, selection } = useDashboardNavigation()
  const { topicProgress, getCourseProgress, isLoading } = useCourseProgress()
  const { scores, maxScores, timesSpent, lastElements, bestAttempts } = useScoreboard({
    courseId: selection.course?.id,
    topicId: selection.topic?.id
  })

  const labelById = useMemo(() => {
    const map: Record<string, string> = {}
    for (const item of currentItems) {
      map[String(item.id)] = item.name
    }
    return map
  }, [currentItems])

  const pieAndChartData = useMemo(() => {
    return Object.entries(timesSpent)
      .filter(([, v]) => Number.isFinite(v) && v > 0)
      .map(([key, value]) => ({
        label: labelById[key] ?? key, // fallback to key if not found
        value
      }))
  }, [timesSpent, labelById])

  const totalHours = pieAndChartData.reduce((sum, d) => sum + d.value, 0)

  const treeData = useMemo(() => treeDataFromLast(lastElements), [lastElements])

  const isLearningElementLevel = level === 'learningElements'
  const isLearningElement = (item: LearningElement | Course | Topic): item is LearningElement =>
    'classification' in item

  const selectedCourseId = selection.course?.id

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: dayjs().subtract(30, 'day'),
    endDate: dayjs()
  })

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange)
    // Filter your chart data based on the new date range here
    console.log('Date range changed:', newDateRange)
  }

  const getProgressBar = useCallback(
    // todo rename
    (itemId: number) => {
      if (isLoading) return { value: 0, current: '?', total: '?' }

      if (level === 'courses') {
        const courseProgress = getCourseProgress(itemId)
        return { value: courseProgress.percentage, current: courseProgress.current, total: courseProgress.total }
      }

      if (level === 'topics' && selectedCourseId != null) {
        const currentTopicProgress = topicProgress[selectedCourseId]?.[itemId]
        return {
          value: currentTopicProgress?.percentage ?? 0,
          current: currentTopicProgress?.current ?? '?',
          total: currentTopicProgress?.total ?? '?'
        }
      }

      return { value: 0, current: '?', total: '?' }
    },
    [level, selectedCourseId, getCourseProgress, topicProgress, isLoading]
  )

  const tableRows: DashboardListItemProps[] = useMemo(
    // todo test update on progress change
    () =>
      currentItems.map((item) => ({
        id: item.id,
        title: item.name,
        disabled: isLearningElementLevel,
        onClick: isLearningElementLevel ? undefined : () => select(item),
        slots: isLearningElementLevel
          ? {
              icon: isLearningElement(item) ? getNodeIcon(item.classification, 40) : undefined,
              headerRight: bestAttempts[item.id]?.completion_status ? (
                <DashboardListItemStat icon={<CheckCircleRounded color="success" />} />
              ) : (
                <DashboardListItemStat icon={<CancelRounded color="error" />} />
              ),
              // todo text not centered
              footerLeft: (
                <DashboardListItemStat
                  icon={<CalendarMonthRounded color="primary" />}
                  text={bestAttempts[item.id]?.completed_at ?? 'Not yet completed'}
                />
              ), // todo: translate + format date
              footerRight:
                bestAttempts[item.id]?.score == null && maxScores[item.id] == null ? null : (
                  <DashboardListItemStat
                    icon={<StarRounded color="warning" />}
                    text={`${bestAttempts[item.id]?.score ?? 0} / ${maxScores[item.id] ?? 0}`}
                  />
                )
            }
          : {
              headerRight: (
                <DashboardListItemStat
                  icon={<StarRounded color="warning" />}
                  text={`${scores[item.id] ?? 0} / ${maxScores[item.id] ?? 0}`}
                />
              ),
              footerLeft: <LabeledProgressBar {...getProgressBar(item.id)} />
            }
      })),
    [currentItems, isLearningElementLevel, select, getProgressBar, scores, maxScores]
  )

  return (
    <DashboardLayout
      left={
        <DashboardList
          header={
            level == 'courses' ? undefined : (
              <DashboardNavHeader
                title={selection.course?.name}
                subtitle={level == 'learningElements' ? selection.topic?.name : undefined}
                handleBack={back}
                backLabel="Zurück"
              />
            )
          }
          rows={tableRows}
        />
      }
      datePicker={
        <DatePickerForChart
          onDateRangeChange={handleDateRangeChange}
          initialStartDate={dateRange.startDate}
          initialEndDate={dateRange.endDate}
          showPresets={true}
        />
      }
      topRight={
        level == 'courses' ? (
          //course hours

          <PieChart data={pieAndChartData} maxHeight={500} totalHours={totalHours} />
        ) : level == 'topics' ? (
          //topic hours
          <PieChart data={pieAndChartData} maxHeight={500} totalHours={totalHours} />
        ) : level == 'learningElements' ? (
          //attempts per learning element
          <AnzahlVersucheBarChart
            maxHeight={500}
            color={'#6EC6FF'}
            axisLeftText={'Verbrachte Zeit'}
            axisBottomText={'Lernelement Name'}
            data={pieAndChartData}
          />
        ) : undefined
      } // todo: laaz + dimi branch
      bottomRight={
        level === 'courses' ? (
          treeData ? (
            <NächsteEmpfehlungGraph maxHeight={250} aspectRatio="21 / 9" data={treeData} />
          ) : undefined
        ) : level === 'topics' || level === 'learningElements' ? (
          treeData ? (
            <NächsteEmpfehlungGraph maxHeight={250} data={treeData} />
          ) : undefined
        ) : undefined
      } // todo: laaz + dimi branch
      handleBack={back}
      disabledBack={level === 'courses'}
    />
  )
}

export default memo(Scoreboard)

/*
type DashboardTableItemProps2 = {
  name: string
  score: number
  maxScore: number
  progress: number
  avgTime: number
  avgScore: number
  doneDate: number
  attempts: number
  maxAttempts: number
  watchDate: number
  finishedStudents: number
  studentCount: number
  done: boolean
}
  */
// todo: laaz <AccessTime /> für andere Dashboard wichtig!
