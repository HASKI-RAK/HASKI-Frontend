import log from 'loglevel'
import {
  DefaultButton as Button,
  DefaultSkeleton as Skeleton,
  DefaultTypography as Typography,
  DefaultCard as Card,
  DefaultCardContent as CardContent
} from '@common/components'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useContext } from 'react'
import { usePersistedStore, useStore } from '@store'
import { AuthContext, SnackbarContext } from '@services'
import { Stack } from '@mui/system'
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
                <Typography variant="h5">{t('components.Home.NoCourses')}</Typography>
              </CardContent>
            </Card>
          ) : (
            courses.map((course) => {
              return (
                <Card key={course.id}>
                  <CardContent>
                    <Typography variant="h5">{course.name}</Typography>
                    <Typography variant="body1">{course.university}</Typography>
                    <Stack direction="row" justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          navigate('/course/' + course.id)
                        }}>
                        {t('components.Home.Button.Course')}
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
