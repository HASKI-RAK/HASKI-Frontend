import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLearningPathTopicProgress } from '@common/hooks'
import { LocalNavItemProps } from '@components'

type CourseNavBarHookReturn = {
  readonly isLoading: boolean
  readonly localNavItems: LocalNavItemProps[]
}

export const useCourseNavBar = (): CourseNavBarHookReturn => {
  // State
  const [localNavItems, setLocalNavItems] = useState<LocalNavItemProps[]>([])

  // Hooks
  const { courseId, topicId } = useParams<string>()
  const { isLoading, topics, topicProgress } = useLearningPathTopicProgress({ courseId })

  useEffect(() => {
    setLocalNavItems(
      topics.map((topic, index) => ({
        key: topic.id,
        isLoading,
        currentProgress: topicProgress[index]?.[0],
        isSelected: topicId === String(topic.id),
        maxProgress: topicProgress[index]?.[1],
        name: topic.name,
        url: courseId && `/course/${courseId}/topic/${topic.id}`
      }))
    )
  }, [isLoading, topics, topicProgress, topicId, courseId])

  return useMemo(() => ({ isLoading, localNavItems }), [isLoading, localNavItems])
}
