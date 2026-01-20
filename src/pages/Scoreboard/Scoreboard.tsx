import { memo, useMemo } from 'react'
import { CalendarMonthRounded, CancelRounded, CheckCircleRounded, StarRounded } from '@mui/icons-material'
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

const Scoreboard = () => {
  const passed = false // todo: laac

  const { currentItems, select, level, back, selection } = useDashboardNavigation()
  const isLearningElementLevel = level === 'learningElements'

  const isLearningElement = (item: LearningElement | Course | Topic): item is LearningElement =>
    'classification' in item

  const tableRows: DashboardListItemProps[] = useMemo(
    () =>
      currentItems.map((item) => ({
        id: item.id,
        title: item.name,
        disabled: isLearningElementLevel,
        onClick: isLearningElementLevel ? undefined : () => select(item),
        slots: isLearningElementLevel
          ? {
              icon: isLearningElement(item) ? getNodeIcon(item.classification, 40) : undefined,
              headerRight: passed ? (
                <DashboardListItemStat icon={<CheckCircleRounded color="success" />} />
              ) : (
                <DashboardListItemStat icon={<CancelRounded color="error" />} />
              ),
              footerLeft: <DashboardListItemStat icon={<CalendarMonthRounded color="primary" />} text="Bottom Left" />, // todo: laac
              footerRight: <DashboardListItemStat icon={<StarRounded color="warning" />} text="Bottom Right" /> // todo: laaz
            }
          : {
              headerRight: <DashboardListItemStat icon={<StarRounded color="warning" />} text="Top Right" />, // todo: laaz
              footerLeft: <LabeledProgressBar value={60} current={6} total={10} /> // todo: backend
            }
      })),
    [currentItems, isLearningElementLevel, select]
  )

  return (
    <DashboardLayout
      left={
        <DashboardList
          header={
            level !== 'courses' ? (
              <DashboardNavHeader
                title={selection.course?.name}
                subtitle={level == 'learningElements' ? selection.topic?.name : undefined}
                handleBack={back}
                backLabel="Zurück"
              />
            ) : undefined
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
