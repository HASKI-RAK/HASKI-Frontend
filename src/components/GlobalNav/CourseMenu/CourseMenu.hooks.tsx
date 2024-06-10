import log from 'loglevel'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CourseResponse } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { GlobalNavContent } from '../GlobalNavMenu/GlobalNavMenu'

// Type
export type CourseMenuHookReturn = {
  readonly content: GlobalNavContent[]
  readonly isLoading: boolean
}

// Comment
export const useCourseMenu = (): CourseMenuHookReturn => {
  // States
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<GlobalNavContent[]>([])
  const { t } = useTranslation()

  // Fetches
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)

  // Contexts
  const { addSnackbar } = useContext(SnackbarContext)
  const { isAuth } = useContext(AuthContext)

  // Logic
  const mapCourseToContent = useCallback((response: CourseResponse) => {
    return response.courses.map((element) => ({
      name: element.name,
      url: `/course/${element.id}`,
      isDisabled: element.id === 2,
      availableAt: new Date('3025-05-16T10:00:00Z')
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
