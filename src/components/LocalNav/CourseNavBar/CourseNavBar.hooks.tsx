import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLearningPathTopicProgress } from '@common/hooks'
import { LocalNavBarHookReturn } from '../LocalNavBar/LocalNavBar.hooks' // todo @components
import { LocalNavItemProps } from '../LocalNavItem/LocalNavItem' // todo @components

// todo docu + test
export const useCourseNavBar = (): LocalNavBarHookReturn => {
  // State
  const [localNavItemProps, setLocalNavItemProps] = useState<LocalNavItemProps[]>([])

  // Hooks
  const { courseId, topicId } = useParams<string>()
  const { isLoading, topics, topicProgress } = useLearningPathTopicProgress({ courseId })

  useEffect(() => {
    setLocalNavItemProps(
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

  return {
    isLoading,
    localNavItemProps
  }
}
