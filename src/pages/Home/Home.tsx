import log from 'loglevel'
import { DefaultButton as Button } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useContext } from 'react'
import { usePersistedStore, useStore } from '@store'
import { AuthContext, SnackbarContext } from '@services'
import { Stack } from '@mui/system'
import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Course } from '@core'

/**
 *
 * @returns
 */

//ToDo: create a Page for course id 99999 or make the button not clickable
const initialCourses: Course[] = [
  {
    id: 99999,
    lms_id: 99999,
    name: 'You are not enrolled in any Moodle Course',
    university: '',
    created_by: 'Please contact your teacher to get enrolled in a course',
    created_at: '',
    last_updated: ''
  }
]

export const Home = () => {
  log.setLevel('error')
  // UX
  const { t } = useTranslation()
  const authcontext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>(initialCourses)

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
        try {
          const user = await fetchUser()
          const courseResponse = await fetchCourses(user.settings.user_id, user.lms_user_id, user.id)
          setCourses(courseResponse.courses)
        } catch (err) {
          if (err instanceof Error) {
            // 🍿 snackbar error
            addSnackbar({
              message: err.message,
              severity: 'error',
              autoHideDuration: 5000
            })
          }
        }
        setLoading(false)
      }
    }
    loadData()
    return () => {
      clearTimeout(preventEndlessLoading)
    }
  }, [authcontext.isAuth, loading])

  // Card cointaining the courses with a button to the specific course
  return loading ? (
    <Skeleton variant="rectangular" width="100%" height={118} />
  ) : (
    <div>
      <Stack spacing={2} direction="row" justifyContent="center">
        <div>
          {courses.map((course) => {
            return (
              <Card key={course.id}>
                <CardContent>
                  <Typography variant="h5">{course.name}</Typography>
                  <Typography variant="body1">{course.university}</Typography>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={course.id === 99999}
                      onClick={() => {
                        navigate('/course/' + course.id)
                      }}>
                      {t('components.Home.Button.Course')}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Stack>
    </div>
  )
}

export default Home
