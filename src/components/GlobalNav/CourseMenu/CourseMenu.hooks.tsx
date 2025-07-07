import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { CourseResponse } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { GlobalNavContent } from '../GlobalNavMenu/GlobalNavMenu'

export type CourseMenuHookReturn = {
  readonly content: GlobalNavContent[]
  readonly isLoading: boolean
}

/**
 * useCourseMenu hook.
 * @remarks
 * Hook for the CourseMenu logic.
 * Provides a list of courses available to the user.
 *
 * @returns - content and loading state.
 *
 * @category Hooks
 */
export const useCourseMenu = (): CourseMenuHookReturn => {
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<GlobalNavContent[]>([])
  const { t } = useTranslation()

  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)

  const { addSnackbar } = useContext(SnackbarContext)
  const { isAuth } = useContext(AuthContext)

  const mapCourseToContent = useCallback((response: CourseResponse) => {
    return response.courses.map((element) => ({
      name: element.name,
      url: `/course/${element.id}`,
      isDisabled: new Date(element.start_date) >= new Date(),
      availableAt: new Date(element.start_date)
    }))
  }, [])

  useEffect(() => {
    isAuth &&
      getUser()
        .then((user) => {
          getCourses(user.settings.user_id, user.lms_user_id, user.id)
            .then((courses) => {
              setContent(mapCourseToContent(courses))
              setIsLoading(false)
            })
            .catch((error) => {
              addSnackbar({
                message: t('error.fetchCourses'),
                severity: 'error',
                autoHideDuration: 5000
              })
              log.error(t('error.fetchCourses') + ' ' + error)
            })
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.fetchUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.fetchUser') + ' ' + error)
        })
  }, [isAuth, addSnackbar, getUser, getCourses, mapCourseToContent])

  return useMemo(
    () => ({
      content,
      isLoading
    }),
    [content, isLoading]
  )
}
