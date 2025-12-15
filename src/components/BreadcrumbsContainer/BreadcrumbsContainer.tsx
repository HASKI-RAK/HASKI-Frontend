import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Breadcrumbs, Link } from '@common/components'
import { Course, Topic } from '@core'
import {
  BreadcrumbsContainerHookReturn,
  useBreadcrumbsContainer as _useBreadcrumbsContainer
} from './BreadcrumbsContainer.hooks'

type BreadcrumbsContainerProps = {
  useBreadcrumbsContainer?: () => BreadcrumbsContainerHookReturn
}

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
const BreadcrumbsContainer = ({ useBreadcrumbsContainer = _useBreadcrumbsContainer }: BreadcrumbsContainerProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { course, topic } = useBreadcrumbsContainer()

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
