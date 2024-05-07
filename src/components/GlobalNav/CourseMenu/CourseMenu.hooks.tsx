import log from 'loglevel'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { CourseResponse } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

// Type
export type CourseMenuHookReturn = {
  readonly content: { name: string; url: string }[]
  readonly isLoading: boolean
}

// Comment
export const useCourseMenu = (): CourseMenuHookReturn => {
  // States
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<{ name: string; url: string }[]>([])

  // Fetches
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)

  // Contexts
  const { addSnackbar } = useContext(SnackbarContext)
  const { isAuth } = useContext(AuthContext)

  // Logic
  const mapCourseToContent = useCallback((response: CourseResponse) => {
    return response.courses.map((element) => ({ name: element.name, url: `/course/${element.id}` }))
  }, [])

  useEffect(() => {
    isAuth &&
      getUser()
        .then((user) => {
          getCourses(user.settings.user_id, user.lms_user_id, user.id)
            .then((response) => {
              setContent(mapCourseToContent(response))
              setIsLoading(false)
            })
            .catch((error) => {
              // 🍿 snackbar error
              addSnackbar({
                message: error.message,
                severity: 'error',
                autoHideDuration: 5000
              })
              log.error(error.message)
            })
        })
        .catch((error) => {
          // 🍿 snackbar error
          addSnackbar({
            message: error.message,
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(error.message)
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
