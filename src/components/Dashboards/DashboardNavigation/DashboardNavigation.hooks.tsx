import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { handleError } from '@components'
import { Course, LearningElement, Topic, User } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

type NavLevel = 'courses' | 'topics' | 'learningElements'

type NavLevelSelection = {
  course: Course | null
  topic: Topic | null
}

type NavItems = Course[] | Topic[] | LearningElement[]

type DashboardNavigationHookReturn = {
  back: () => void
  currentItems: NavItems
  level: NavLevel
  select: (item: Course | Topic | LearningElement) => void
  selection: NavLevelSelection
}

export const useDashboardNavigation = (): DashboardNavigationHookReturn => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const getLearningPathElement = useStore((state) => state.getLearningPathElement)

  const [selection, setSelection] = useState<NavLevelSelection>({
    course: null,
    topic: null
  })

  const level: NavLevel = useMemo(
    () => (!selection.course ? 'courses' : !selection.topic ? 'topics' : 'learningElements'),
    [selection.course, selection.topic]
  )

  const [currentItems, setCurrentItems] = useState<NavItems>([])

  const select = useCallback((item: Course | Topic | LearningElement) => {
    setSelection((prevSelection) => {
      if (!prevSelection.course) return { course: item as Course, topic: null }
      if (!prevSelection.topic) return { ...prevSelection, topic: item as Topic }
      return { ...prevSelection, learningElement: item as LearningElement }
    })
  }, [])

  const back = useCallback(() => {
    setSelection((prevSelection) => {
      if (prevSelection.topic) return { ...prevSelection, topic: null }
      if (prevSelection.course) return { course: null, topic: null }
      return prevSelection
    })
  }, [])

  const fetchMap: Record<NavLevel, (user: User, selection: NavLevelSelection) => Promise<NavItems>> = useMemo(
    () => ({
      courses: (user) =>
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then((courses) => {
            return courses.courses
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchCourses', error, 5000)
            return []
          }),
      topics: (user, selection) =>
        !selection.course
          ? Promise.resolve([])
          : getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, selection.course.id.toString())
              .then((topics) => {
                return topics.topics
              })
              .catch((error) => {
                handleError(t, addSnackbar, 'error.getTopics', error, 5000)
                return []
              }),
      learningElements: (user, selection) =>
        !selection.course || !selection.topic
          ? Promise.resolve([])
          : getLearningPathElement(
              user.settings.user_id,
              user.lms_user_id,
              user.id,
              selection.course.id.toString(),
              selection.topic.id.toString()
            )
              .then((learningElements) => {
                return learningElements.path.map((learningPathElement) => learningPathElement.learning_element)
              })
              .catch((error) => {
                handleError(t, addSnackbar, 'error.fetchLearningPathElement', error, 5000)
                return []
              })
    }),
    [getCourses, getLearningPathTopic, getLearningPathElement]
  )

  useEffect(() => {
    getUser()
      .then((user) => {
        fetchMap[level](user, selection).then((items) => {
          setCurrentItems(items)
        })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchUser', error, 5000)
      })
  }, [fetchMap, getUser, level, selection])

  return useMemo(
    () => ({
      back,
      currentItems,
      level,
      select,
      selection
    }),
    [back, currentItems, level, select, selection]
  )
}
