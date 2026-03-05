import { useCallback, useEffect, useState } from 'react'
import { Course, LearningPathElementStatus, LearningPathLearningElement, Topic, User } from '@core'
import { usePersistedStore, useStore } from '@store'

type Progress = {
  current: number
  total: number
  percentage: number
}

type CourseProgressHookReturnType = {
  topicProgress: Record<number, Record<number, Progress>>
  getCourseProgress: (courseId: number) => Progress
  isLoading: boolean
}

export const useCourseProgress = (): CourseProgressHookReturnType => {
  const getUser = usePersistedStore((state) => state.getUser)
  const getDefaultLearningPath = usePersistedStore((state) => state.getDefaultLearningPath)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getLearningPathElement = useStore((s) => s.getLearningPathElement)

  const [topicProgress, setTopicProgress] = useState<Record<number, Record<number, Progress>>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getCourseProgress = useCallback(
    (courseId: number) => {
      const topics = Object.values(topicProgress[courseId] ?? {})
      const total = topics.length

      if (total === 0) {
        return { current: 0, total: 0, percentage: 0 }
      }

      const current = topics.filter((topic) => topic.total > 0 && topic.current >= topic.total).length
      const percentage = Math.round((current / total) * 100)

      return { current, total, percentage }
    },
    [topicProgress]
  )

  useEffect(() => {
    const run = async () => {
      setIsLoading(true)

      // get user
      const user: User | undefined = await getUser().catch(() => undefined)
      if (!user) return

      // get all courses
      const courses: Course[] = await getCourses(user.settings.user_id, user.lms_user_id, user.id)
        .then((courseResponse) => courseResponse.courses)
        .catch(() => [])

      const courseIds = courses.map((course) => course.id)

      // get all topics per course
      const topics: { courseId: number; courseTopics: Topic[] }[] = await Promise.all(
        courseIds.map(async (courseId) => {
          const courseTopics: Topic[] = await getLearningPathTopic(
            user.settings.user_id,
            user.lms_user_id,
            user.id,
            courseId.toString()
          )
            .then((learningPathTopic) => learningPathTopic.topics)
            .catch(() => [])

          return { courseId, courseTopics }
        })
      )

      // get disabled classifications from default learning path
      const disabledClassifications: string[] = await getDefaultLearningPath(user.settings.user_id, user.lms_user_id)
        .then((defaultLearningPath) => {
          return defaultLearningPath
            .filter((classificationElement) => classificationElement.disabled)
            .map((classificationElement) => classificationElement.classification)
        })
        .catch(() => {
          return []
        })

      // get completed learning element ids
      const completedLearningElementIdSet: Set<number> = new Set(
        (
          await Promise.all(
            courseIds.map(async (courseId) => {
              const statuses: LearningPathElementStatus[] = await getLearningPathElementStatus(
                courseId.toString(),
                user.lms_user_id
              ).catch(() => [])

              return statuses.filter((s) => s.state === 1).map((s) => s.cmid)
            })
          )
        ).flat()
      )

      //
      const computedTopicProgress: Record<number, Record<number, Progress>> = Object.fromEntries(
        await Promise.all(
          topics.map(async ({ courseId, courseTopics }) => {
            const topicEntries: Array<[number, Progress]> = await Promise.all(
              courseTopics.map(async (courseTopic) => {
                const learningPathElements: LearningPathLearningElement[] = await getLearningPathElement(
                  user.settings.user_id,
                  user.lms_user_id,
                  user.id,
                  courseId.toString(),
                  courseTopic.id.toString()
                )
                  .then((learningPathElement) => learningPathElement.path)
                  .catch(() => [])

                const availableLearningElementIds: number[] = learningPathElements
                  .filter(
                    (learningElement) =>
                      !disabledClassifications.includes(learningElement.learning_element.classification)
                  )
                  .map((learningElement) => learningElement.learning_element.lms_id)

                const total = availableLearningElementIds.length
                const current = availableLearningElementIds.filter((id) => completedLearningElementIdSet.has(id)).length

                const percentage = total === 0 ? 0 : Math.round((current / total) * 100)

                return [courseTopic.id, { current, total, percentage }]
              })
            )

            return [courseId, Object.fromEntries(topicEntries)]
          })
        )
      )

      // set progress
      setTopicProgress(computedTopicProgress)
      setIsLoading(false)
    }

    run()
  }, [
    getUser,
    getCourses,
    getLearningPathTopic,
    getDefaultLearningPath,
    getLearningPathElementStatus,
    getLearningPathElement
  ])

  return {
    topicProgress,
    getCourseProgress,
    isLoading
  }
}

// todo: error handling
// todo: is auth???
// todo: caching mit usememo
