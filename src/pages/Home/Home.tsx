import log from 'loglevel'
import { Button, Skeleton, Typography, Card, CardContent, Stack } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useContext } from 'react'
import { usePersistedStore, useStore } from '@store'
import { AuthContext, SnackbarContext } from '@services'
import { useNavigate } from 'react-router-dom'
import { Course } from '@core'

/**
 * # Home Page
 * Presents an overview of the courses.
 * @category Pages
 */

export const Home = () => {
  log.setLevel('error')
  // UX
  const { t } = useTranslation()
  const authcontext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])

  // Store
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchCourses = useStore((state) => state.fetchCourses)

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      navigate('/login')
    }, 5000)
    const loadData = async () => {
      if (authcontext.isAuth) {
        clearTimeout(preventEndlessLoading)
        fetchUser()
          .then((user) => {
            fetchCourses(user.settings.user_id, user.lms_user_id, user.id)
              .then((CourseResponse) => {
                setCourses(CourseResponse.courses)
              })
              .catch((error) => {
                addSnackbar({
                  message: t('Error.fetchCourses'),
                  severity: 'error',
                  autoHideDuration: 5000
                })
                log.error(error.message)
              })
          })
          .catch((error) => {
            addSnackbar({
              message: t('Error.fetchUser'),
              severity: 'error',
              autoHideDuration: 5000
            })
            log.error(error.message)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
    loadData()
    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [loading])

  // Card cointaining the courses with a button to the specific course
  return loading ? (
    <Skeleton variant="rectangular" width="100%" height={118} />
  ) : (
    <div>
      <Stack spacing={2} direction="row" justifyContent="center">
        <div>
          {courses.length === 0 ? (
            <Card>
              <CardContent>
                <Typography variant="h5">{t('pages.home.noCourses')}</Typography>
              </CardContent>
            </Card>
          ) : (
            courses.map((course) => {
              return (
                <Card key={course.id} sx={{ mb: '1rem' }}>
                  <CardContent>
                    <Typography variant="h5">{course.name}</Typography>
                    <Typography variant="body1">{course.university}</Typography>
                    <Stack direction="row" justifyContent="center">
                      <Button
                        id="course-button"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate('/course/' + course.id)
                        }}>
                        {t('pages.course.courseButton')}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </Stack>
    </div>
  )
}
export default Home
