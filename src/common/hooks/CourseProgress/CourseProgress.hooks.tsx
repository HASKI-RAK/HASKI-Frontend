import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { handleError } from '@components'
import { Course, LearningPathElementStatus, LearningPathLearningElement, Topic, User } from '@core'
import { AuthContext, SnackbarContext } from '@services'
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
  const { t } = useTranslation()

  const getUser = usePersistedStore((state) => state.getUser)
  const getDefaultLearningPath = usePersistedStore((state) => state.getDefaultLearningPath)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const getLearningPathElementStatus = usePersistedStore((state) => state.getLearningPathElementStatus)
  const getLearningPathElement = useStore((s) => s.getLearningPathElement)

  const [topicProgress, setTopicProgress] = useState<Record<number, Record<number, Progress>>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { isAuth } = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)

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

      if (!isAuth) return

      // Get user
      const user: User | undefined = await getUser().catch((error) => {
        handleError(t, addSnackbar, 'error.fetchUser', error, 5000)
        return undefined
      })
      if (!user) return

      // Get all courses
      const courses: Course[] = await getCourses(user.settings.user_id, user.lms_user_id, user.id)
        .then((courseResponse) => courseResponse.courses)
        .catch((error) => {
          handleError(t, addSnackbar, 'error.fetchCourses', error, 5000)
          return []
        })

      const courseIds = courses.map((course) => course.id)

      // Get all topics per course
      const topics: { courseId: number; courseTopics: Topic[] }[] = await Promise.all(
        courseIds.map(async (courseId) => {
          const courseTopics: Topic[] = await getLearningPathTopic(
            user.settings.user_id,
            user.lms_user_id,
            user.id,
            courseId.toString()
          )
            .then((learningPathTopic) => learningPathTopic.topics)
            .catch((error) => {
              handleError(t, addSnackbar, 'error.fetchLearningPathTopic', error, 5000)
              return []
            })

          return { courseId, courseTopics }
        })
      )

      // Get disabled classifications from default learning path
      const disabledClassifications: string[] = await getDefaultLearningPath(user.settings.user_id, user.lms_user_id)
        .then((defaultLearningPath) => {
          return defaultLearningPath
            .filter((classificationElement) => classificationElement.disabled)
            .map((classificationElement) => classificationElement.classification)
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.fetchDefaultLearningPath', error, 5000)
          return []
        })

      // Get completed learning element ids
      const completedLearningElementIdSet: Set<number> = new Set(
        (
          await Promise.all(
            courseIds.map(async (courseId) => {
              const statuses: LearningPathElementStatus[] = await getLearningPathElementStatus(
                courseId.toString(),
                user.lms_user_id
              ).catch((error) => {
                handleError(t, addSnackbar, 'error.fetchLearningPathElementStatus', error, 5000)
                return []
              })

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
                  .catch((error) => {
                    handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 5000)
                    return []
                  })

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

      // Set progress
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

  return useMemo(
    () => ({
      topicProgress,
      getCourseProgress,
      isLoading
    }),
    [topicProgress, getCourseProgress, isLoading]
  )
}
