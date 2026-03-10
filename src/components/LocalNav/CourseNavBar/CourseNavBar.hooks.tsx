import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useLearningPathTopicProgress } from '@common/hooks'
import { LocalNavBarHookReturn, LocalNavItemProps } from '@components'

export const useCourseNavBar = (): LocalNavBarHookReturn => {
  // Translation
  const { t } = useTranslation()
  const localNavTitle = t('appGlobal.topics')

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

  return useMemo(() => ({ isLoading, localNavItems, localNavTitle }), [isLoading, localNavItems, localNavTitle])
}
