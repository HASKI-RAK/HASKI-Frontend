import { memo, useCallback, useMemo } from 'react'
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
import { Box } from '@mui/material'

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

const totalHours = dataPieChart.reduce((sum, d) => sum + d.value, 0)

const dataBarChart = [
  {
    Klassifikationen: 'RQ',
    VerbrachteZeit: 141
  },
  {
    Klassifikationen: 'ÜB',
    VerbrachteZeit: 140
  },
  {
    Klassifikationen: 'SE',
    VerbrachteZeit: 84
  },
  {
    Klassifikationen: 'BE',
    VerbrachteZeit: 109
  },
  {
    Klassifikationen: 'AB',
    VerbrachteZeit: 141
  },
  {
    Klassifikationen: 'KÜ',
    VerbrachteZeit: 12
  },
  {
    Klassifikationen: 'ZL',
    VerbrachteZeit: 24
  }
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

const Scoreboard = () => {
  const { currentItems, select, level, back, selection } = useDashboardNavigation()
  const { topicProgress, getCourseProgress, isLoading } = useCourseProgress()
  const { scores, maxScores, timesSpent, lastElements, bestAttempts } = useScoreboard({
    courseId: selection.course?.id,
    topicId: selection.topic?.id
  })

  const isLearningElementLevel = level === 'learningElements'
  const isLearningElement = (item: LearningElement | Course | Topic): item is LearningElement =>
    'classification' in item

  const selectedCourseId = selection.course?.id

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
      topRight={
        level == 'courses' ? (
          //course hours
          <PieChart data={dataPieChart} maxHeight={500} totalHours={totalHours} />
        ) : level == 'topics' ? (
          //topic hours
          <PieChart data={dataPieChart} maxHeight={500} totalHours={totalHours} />
        ) : level == 'learningElements' ? (
          //attempts per learning element
          <AnzahlVersucheBarChart
            maxHeight={500}
            keys={['VerbrachteZeit']}
            indexBy={'Klassifikationen'}
            color={['#6EC6FF']}
            axisLeftText={'Verbrachte Zeit'}
            axisBottomText={'Klassifikationen'}
            data={dataBarChart}
          />
        ) : undefined
      } // todo: laaz + dimi branch
      bottomRight={
        level == 'courses' ? (
          //course hours
          <NächsteEmpfehlungGraph maxHeight={200} aspectRatio="21 / 9" data={treeData} />
        ) : level == 'topics' || level == 'learningElements' ? (
          //topic hours
          <NächsteEmpfehlungGraph maxHeight={200} data={treeData} />
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
