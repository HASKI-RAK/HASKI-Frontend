import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Breadcrumbs, Link } from '@common/components'
import { handleError } from '@components'
import { Course, Topic } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// Regex to check if a string contains only numbers
const onlyNumbersRegex = /^\d+$/

/**
 * BreadcrumbsContainer component.
 *
 * @example
 * URL: Home / Page / 1 / Page / 2 / Page / 3
 * Breadcrumbs: Home / Page / Page / Page
 *
 * @remarks
 * It contains the breadcrumbs of the application and is used in the main frame.
 *
 * @category Components
 */
const BreadcrumbsContainer = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { addSnackbar } = useContext(SnackbarContext)

  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getTopics = useStore((state) => state.getLearningPathTopic)

  const [course, setCourse] = useState<Course | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)

  // Check if current index is numbern, if yes return name of course/topic
  const showCurrentBreadcrumb = (
    path: string,
    index: number,
    array: string[],
    course: Course | null, // todo maybe remove
    topic: Topic | null, // todo maybe remove
    locationPathname: string
  ) => {
    const segment = array[index]
    const prev = array[index - 1]
    const isNumeric = onlyNumbersRegex.test(segment)

    const isCourseId = isNumeric && !!course && String(course.id) === segment && prev === 'course'

    const isTopicId = isNumeric && !!topic && String(topic.id) === segment && prev === 'topic'

    const baseKey = (value: string) => value.replace(onlyNumbersRegex, '').replaceAll('/', '')

    const getLabel = () => {
      if (isCourseId) return course.name
      if (isTopicId) return topic.name
      return t(`pages.${baseKey(isNumeric ? prev : path)}`)
    }

    const id = path.concat('-link').replaceAll(' ', '-')

    return index === array.length - 1 ? (
      <Link id={id} component={'span'} underline="always" color={'textPrimary'}>
        {getLabel()}
      </Link>
    ) : (
      <Link
        id={id}
        key={path + index}
        underline="hover"
        component={'button'}
        color={'textPrimary'}
        onClick={() => {
          navigate(
            locationPathname
              .split('/')
              .slice(0, index + 1)
              .join('/')
          )
        }}>
        {getLabel()}
      </Link>
    )
  }

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

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {location.pathname !== '/' ? (
          location.pathname.split('/').map((path, index, array) => {
            if (path === '') {
              return (
                <Link
                  id="home-link"
                  key={'home-' + index}
                  underline="hover"
                  color="textPrimary"
                  onClick={() => {
                    navigate('/')
                  }}>
                  {t('pages.home')}
                </Link>
              )
            }

            if (onlyNumbersRegex.test(array[index + 1] ?? '')) return null

            return showCurrentBreadcrumb(path, index, array, course, topic, location.pathname)
          })
        ) : (
          <Box display="flex">
            <Link
              id="home-link"
              onClick={() => {
                navigate('/')
              }}
              color="textPrimary">
              {t('pages.home')}
            </Link>
          </Box>
        )}
      </Breadcrumbs>
    </Box>
  )
}

export default memo(BreadcrumbsContainer)
