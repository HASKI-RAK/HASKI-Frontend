import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
import { useScoreboard } from './Scoreboard.hooks'

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

  // Hooks
  const { currentItems, select, level, back, selection } = useDashboardNavigation()
  const { topicProgress, getCourseProgress, isLoading } = useCourseProgress()
  const { scores, maxScores, timesSpent, lastElements, bestAttempts } = useScoreboard({
    courseId: selection.course?.id,
    topicId: selection.topic?.id,
    since: undefined, // todo fill
    until: undefined // todo fill
  })

  const isLearningElementLevel = level === 'learningElements'
  const isLearningElement = (item: LearningElement | Course | Topic): item is LearningElement =>
    'classification' in item

  const selectedCourseId = selection.course?.id

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
      topRight={undefined} // todo: laaz + dimi branch
      bottomRight={undefined} // todo: laaz + dimi branch
      disabledBack={level === 'courses'}
    />
  )
}

export default memo(Scoreboard)
