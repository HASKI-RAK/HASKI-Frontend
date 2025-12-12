import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Breadcrumbs, Link } from '@common/components'
import { Course, Topic } from '@core'
import { usePersistedStore, useStore } from '@store'

// Regex to check if a string contains only numbers
const onlyNumbersRegex = /^\d+$/

// Check if current index is numbern, if yes return name of course/topic
const showCurrentBreadcrumb = (
  path: string,
  index: number,
  array: string[],
  navigate: NavigateFunction,
  t: (key: string) => string,
  isLast: boolean,
  course: Course | null,
  topic: Topic | null,
  locationPathname: string
) => {
  const segment = array[index]
  const prev = array[index - 1]
  const isNumeric = onlyNumbersRegex.test(segment)

  const isCourseId = isNumeric && !!course && String(course.id) === segment && prev === 'course'

  const isTopicId = isNumeric && !!topic && String(topic.id) === segment && prev === 'topic'

  const baseKey = (value: string) => value.replace(onlyNumbersRegex, '').replaceAll('/', '')

  const label = isCourseId
    ? course.name
    : isTopicId
    ? topic.name
    : isNumeric
    ? t(`pages.${baseKey(prev)}`)
    : t(`pages.${baseKey(path)}`)

  const id = path.concat('-link').replaceAll(' ', '-')

  return isLast ? (
    <Link id={id} component={'span'} underline="always" color={'textPrimary'}>
      {label}
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
      {label}
    </Link>
  )
}

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

  const { courseId, topicId } = useParams()
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const getTopics = useStore((state) => state.getLearningPathTopic)

  const [course, setCourse] = useState<Course | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)

  useEffect(() => {
    if (courseId) {
      getUser().then((user) => {
        getCourses(user.settings.user_id, user.lms_user_id, user.id).then((courses) => {
          // todo catch error
          courses.courses.forEach((c) => {
            if (c.id === Number(courseId)) {
              setCourse(c)
            }
          })
        })
        if (topicId) {
          getTopics(user.settings.user_id, user.lms_user_id, user.id, courseId).then((topics) => {
            topics.topics.forEach((t) => {
              if (t.id === Number(topicId)) {
                setTopic(t)
              }
            })
          })
        } else {
          setTopic(null)
        }
      })
    } else {
      setCourse(null)
      setTopic(null)
    }
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
                  key={`home-${index}`}
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

            return showCurrentBreadcrumb(
              path,
              index,
              array,
              navigate,
              t,
              index === array.length - 1,
              course,
              topic,
              location.pathname
            )
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
