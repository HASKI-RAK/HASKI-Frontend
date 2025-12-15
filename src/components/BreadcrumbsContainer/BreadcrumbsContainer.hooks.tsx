import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { handleError } from '@components'
import { Course, Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

export type BreadcrumbsContainerHookReturn = {
  course: Course | null
  topic: Topic | null
}

export const useBreadcrumbsContainer = (): BreadcrumbsContainerHookReturn => {
  const { t } = useTranslation()
  const { courseId, topicId } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getTopics = useStore((state) => state.getLearningPathTopic)
  const { addSnackbar } = useContext(SnackbarContext)

  useEffect(() => {
    if (!courseId) {
      setCourse(null)
      setTopic(null)
      return
    }

    const cid = Number(courseId)
    const tid = topicId ? Number(topicId) : null

    getUser()
      .then((user) =>
        Promise.all([
          getCourses(user.settings.user_id, user.lms_user_id, user.id)
            .then((courses) => courses.courses.find((c) => c.id === cid))
            .catch((error: string) => {
              handleError(t, addSnackbar, 'error.fetchCourses', error, 3000)
              return null
            }),

          tid
            ? getTopics(user.settings.user_id, user.lms_user_id, user.id, courseId)
                .then((topics) => topics.topics.find((tp) => tp.id === tid))
                .catch((error: string) => {
                  handleError(t, addSnackbar, 'error.fetchLearningPathTopic', error, 3000)
                  return null
                })
            : Promise.resolve(null)
        ])
      )
      .then(([course, topic]) => {
        setCourse(course ?? null)
        setTopic(topic ?? null)
      })
      .catch((error: string) => {
        handleError(t, addSnackbar, 'error.fetchUser', error, 3000)
      })
  }, [courseId, topicId, getUser, getCourses, getTopics])

  return useMemo(
    () => ({
      course,
      topic
    }),
    [course, topic]
  )
}
