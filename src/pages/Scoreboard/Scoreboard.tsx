import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { use } from 'i18next'
import { Tooltip, Typography } from '@common/components'
import { useCourseProgress } from '@common/hooks'
import { CalendarMonthRounded, CancelRounded, CheckCircleRounded, StarRounded } from '@common/icons'
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
import { DateRange } from '../../components/DateRangePicker'
import AnzahlVersucheBarChart from '../ExampleGraphs/AnzahlVersucheBarChart'
import DatePickerForChart from '../ExampleGraphs/DatePickerForChart'
import NächsteEmpfehlungGraph from '../ExampleGraphs/NächsteEmpfehlung'
import PieChart from '../ExampleGraphs/PieChart'
import { useScoreboard } from './Scoreboard.hooks'

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
  // Translation
  const { t, i18n } = useTranslation()
  const classifications: { name: string; key: string }[] = t(
    'components.CreateLearningElementClassificationTable.classifications',
    { returnObjects: true }
  )
  const getClassificationName = useCallback(
    (key: string) => classifications.find((c) => c.key === key)?.name,
    [classifications]
  )

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: useMemo(() => dayjs().subtract(30, 'day'), []),
    endDate: useMemo(() => dayjs(), [])
  })

  const since = useMemo(() => dateRange.startDate.toDate(), [dateRange])
  const until = useMemo(() => dateRange.endDate.toDate(), [dateRange])

  // Hooks
  const { currentItems, select, level, back, selection } = useDashboardNavigation()
  const { topicProgress, getCourseProgress, isLoading } = useCourseProgress()
  const { scores, maxScores, timesSpent, lastElements, bestAttempts } = useScoreboard({
    courseId: selection.course?.id,
    courseLmsId: selection.course?.lms_id,
    topicId: selection.topic?.id,
    since: since,
    until: until
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

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange)
    // Filter your chart data based on the new date range here
    // console.log('Date range changed:', newDateRange)
  }

  const getProgressBarData = useCallback(
    (itemId: number) => {
      if (isLoading) return { value: 0, current: '?', total: '?' }

      if (level === 'courses') {
        const courseProgress = getCourseProgress(itemId)
        return {
          value: courseProgress.percentage,
          current: courseProgress.current,
          total: courseProgress.total,
          tooltip: t('pages.scoreboard.topicsCompleted', {
            current: courseProgress.current,
            total: courseProgress.total
          })
        }
      }

      if (level === 'topics' && selectedCourseId != null) {
        const currentTopicProgress = topicProgress[selectedCourseId]?.[itemId]
        return {
          value: currentTopicProgress?.percentage ?? 0,
          current: currentTopicProgress?.current ?? '?',
          total: currentTopicProgress?.total ?? '?',
          tooltip: t('pages.scoreboard.learningElementsCompleted', {
            current: currentTopicProgress?.current,
            total: currentTopicProgress?.total
          })
        }
      }

      return { value: 0, current: '?', total: '?' }
    },
    [level, selectedCourseId, getCourseProgress, topicProgress, isLoading]
  )

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
    [i18n.language]
  )

  const tableRows: DashboardListItemProps[] = useMemo(
    () =>
      currentItems.map((item) => {
        const bestAttempt = bestAttempts[item.id]
        const completedAt = bestAttempt?.completed_at
        const formattedDate = completedAt ? dateFormatter.format(new Date(completedAt)) : undefined

        return {
          id: item.id,
          title: item.name,
          disabled: isLearningElementLevel,
          onClick: isLearningElementLevel ? undefined : () => select(item),
          slots: isLearningElementLevel
            ? {
                icon: isLearningElement(item) ? (
                  <Tooltip
                    arrow
                    title={<Typography variant="body2">{getClassificationName(item.classification)}</Typography>}>
                    {getNodeIcon(item.classification, 40)}
                  </Tooltip>
                ) : undefined,
                headerRight: bestAttempt?.completion_status ? (
                  <DashboardListItemStat
                    icon={<CheckCircleRounded color="success" />}
                    tooltip={t('tooltip.completed')}
                  />
                ) : (
                  <DashboardListItemStat icon={<CancelRounded color="error" />} tooltip={t('tooltip.notCompleted')} />
                ),
                footerLeft: (
                  <DashboardListItemStat
                    icon={<CalendarMonthRounded color="primary" />}
                    text={formattedDate ?? '—'}
                    tooltip={formattedDate ? t('pages.scoreboard.completedAt', { date: formattedDate }) : undefined}
                  />
                ),
                footerRight:
                  bestAttempt?.score == null && maxScores[item.id] == null ? null : (
                    <DashboardListItemStat
                      icon={<StarRounded color="warning" />}
                      text={`${bestAttempt?.score ?? 0} / ${maxScores[item.id] ?? 0}`}
                      tooltip={t('pages.scoreboard.points', {
                        current: bestAttempt?.score ?? 0,
                        total: maxScores[item.id] ?? 0
                      })}
                    />
                  )
              }
            : {
                headerRight: (
                  <DashboardListItemStat
                    icon={<StarRounded color="warning" />}
                    text={`${scores[item.id] ?? 0} / ${maxScores[item.id] ?? 0}`}
                    tooltip={t('pages.scoreboard.points', {
                      current: scores[item.id] ?? 0,
                      total: maxScores[item.id] ?? 0
                    })}
                  />
                ),
                footerLeft: <LabeledProgressBar {...getProgressBarData(item.id)} />
              }
        }
      }),
    [
      currentItems,
      isLearningElementLevel,
      select,
      getProgressBarData,
      scores,
      maxScores,
      bestAttempts,
      dateFormatter,
      getClassificationName,
      t
    ]
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
                backLabel={t('appGlobal.back')}
                backTooltip={
                  level == 'topics'
                    ? t('pages.scoreboard.backToCourseSelection')
                    : t('pages.scoreboard.backToTopicSelection')
                }
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
          pieAndChartData.length > 0 ? (
            //attempts per learning element
            <AnzahlVersucheBarChart
              maxHeight={500}
              color={'#6EC6FF'}
              axisLeftText={t('pages.exampleGraphs.TimeSpentOnLearningElements')}
              axisBottomText={t('pages.exampleGraphs.TimeSpentOnLearningElementsName')}
              data={pieAndChartData}
            />
          ) : (
            t('pages.exampleGraphs.TimeSpentOnLearningElementsNoData')
          )
        ) : undefined
      }
      bottomRight={
        level === 'courses' ? (
          treeData ? (
            <NächsteEmpfehlungGraph maxHeight={250} aspectRatio="21 / 9" data={treeData} />
          ) : (
            t('pages.exampleGraphs.LastElementNoData')
          ) // todo: translate
        ) : level === 'topics' || level === 'learningElements' ? (
          treeData ? (
            <NächsteEmpfehlungGraph maxHeight={250} data={treeData} />
          ) : (
            t('pages.exampleGraphs.LastElementNoData')
          )
        ) : undefined
      }
      disabledBack={level === 'courses'}
    />
  )
}

export default memo(Scoreboard)
