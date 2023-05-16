import { DropdownLanguage, Text, QuestionnaireResultsModal } from '@components'
import log from 'loglevel'
import { DefaultButton as Button } from '@common/components'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useContext } from 'react'
import useBoundStore from '@store'
import { AuthContext, SnackbarContext } from '@services'
import { Stack } from '@mui/system'
import { Card, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 *
 * @returns
 */
export const Home = () => {
  log.setLevel('error')
  // UX
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const authcontext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)
  const navigate = useNavigate()

  // Store
  const fetchUser = useBoundStore((state) => state.fetchUser)
  const fetchCourses = useBoundStore((state) => state.fetchCourses)
  const courses = useBoundStore((state) => state._cache_courses)

  useEffect(() => {
    if (authcontext.isAuth)
      fetchUser()
        .then((user) => {
          fetchCourses(user.settings.user_id, user.lms_user_id, user.id).then((courses) => {
            // t('components.Home.Snackbar.Success')
            addSnackbar({
              message: courses.length.toString() + ' ' + t('components.Snackbar.CoursesLoaded'),
              severity: 'success',
              autoHideDuration: 5000
            })
            console.log(courses)
          })
        })
        .catch((error) => {
          // 🍿 snackbar error
          console.log(error)
          addSnackbar({
            message: error.message,
            severity: 'error',
            autoHideDuration: 5000
          })
        })
    else console.log('not logged in')
  }, [authcontext.isAuth])
  // Card cointaining the courses with a button to the specific course
  return (
    <div>
      <Stack spacing={2} direction="row" justifyContent="center">
        <div>
          {courses.map((course) => {
            return (
              <Card key={course.id}>
                <CardContent>
                  <Typography variant="h5">{course.name}</Typography>
                  <Typography variant="body1">{course.university}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate('/course/' + course.id)
                    }}>
                    {t('components.Home.Button.Course')}
                  </Button>
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
