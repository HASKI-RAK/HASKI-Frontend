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
      topRight={undefined} // todo: laaz + dimi branch
      bottomRight={undefined} // todo: laaz + dimi branch
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
