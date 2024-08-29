import AddCircleIcon from '@mui/icons-material/AddCircle'
import dayjs from 'dayjs'
import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, Skeleton, Typography } from '@common/components'
import { CreateCourseModal } from '@components'
import { Course } from '@core'
import { AuthContext, RoleContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

/**
 * # Home Page
 * Presents an overview of the courses.
 * @category Pages
 */

export const Home = () => {
  log.setLevel('error')
  // UX
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const { isCourseCreatorRole } = useContext(RoleContext)
  const { addSnackbar } = useContext(SnackbarContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [modalOpen, setModalOpen] = useState(false)

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)

  const handleCloseCourseModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    if (isAuth) {
      getUser()
        .then((user) => {
          getCourses(user.settings.user_id, user.lms_user_id, user.id)
            .then((CourseResponse) => {
              setCourses(CourseResponse.courses)
            })
            .catch((error) => {
              addSnackbar({
                message: t('error.getCourses'),
                severity: 'error',
                autoHideDuration: 5000
              })
              log.error(t('error.getCourses') + ' ' + error)
            })
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.getUser') + ' ' + error)
        })
      setLoading(false)
    }
  }, [getUser, getCourses, setCourses, isAuth])

  const commonButtonStyle = {
    mt: '1rem',
    width: '85%'
  }

  const handleCourseStartDate = (courseStartDate: string) => {
    return new Date(courseStartDate) > new Date()
  }

  const formatDate = (date: string) => {
    return dayjs(date).format('DD.MM.YYYY - HH:mm')
  }

  // Card containing the courses with a button to the specific course
  return loading ? (
    <Skeleton variant="rectangular" width="100%" height={118} />
  ) : (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          {courses.length === 0 ? (
            <Card
              sx={{
                mb: '1rem',
                width: {
                  xs: '20rem',
                  sm: '20rem',
                  md: '20rem',
                  lg: '30rem',
                  xl: '40rem',
                  xxl: '45rem',
                  xxxl: '50rem'
                }
              }}>
              <CardContent>
                <Typography variant="h5" align="center">
                  {t('pages.home.noCourses')}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            courses.map((course) => {
              return (
                <Card
                  key={course.id}
                  sx={{
                    mb: '1rem',
                    width: {
                      xs: '20rem',
                      sm: '20rem',
                      md: '20rem',
                      lg: '30rem',
                      xl: '40rem',
                      xxl: '45rem',
                      xxxl: '50rem'
                    }
                  }}>
                  <CardContent>
                    <Typography variant="h5" align="center">
                      {course.name}
                    </Typography>
                    <Grid container justifyContent="center">
                      <Button
                        id="course-button"
                        variant="contained"
                        color="primary"
                        sx={commonButtonStyle}
                        disabled={handleCourseStartDate(course.start_date)}
                        onClick={() => {
                          navigate('/course/' + course.id)
                        }}>
                        {handleCourseStartDate(course.start_date)
                          ? `Course is Available on ${formatDate(course.start_date)}`
                          : t('pages.course.courseButton')}
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              )
            })
          )}
          {isCourseCreatorRole && (
            <Card>
              <CardContent>
                <Grid container justifyContent="center">
                  <Button
                    id="course-button"
                    variant="contained"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                    sx={commonButtonStyle}>
                    <AddCircleIcon />
                  </Button>
                </Grid>
              </CardContent>
              <CreateCourseModal open={modalOpen} handleClose={handleCloseCourseModal}></CreateCourseModal>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
export default Home
