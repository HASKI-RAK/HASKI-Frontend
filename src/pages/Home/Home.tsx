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
  const navigate = useNavigate()

  // States
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true)
  const [activeStepCreateCourseModal, setActiveStepCreateCourseModal] = useState<number>(0)
  const [createCourseModalOpen, setCreateCourseModalOpen] = useState<boolean>(false)
  const [successRemoteCourseCreated, setSuccessRemoteCourseCreated] = useState<boolean>(false)

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const clearCoursesCache = useStore((state) => state.clearCoursesCache)
  const coursesCache = useStore((state) => state._cache_Courses_record)

  const handleCloseCourseModal = () => {
    clearCoursesCache()
    setCreateCourseModalOpen(false)
    setSuccessRemoteCourseCreated(false)
    setActiveStepCreateCourseModal(0)
  }

  useEffect(() => {
    if (isAuth) {
      getUser()
        .then((user) => {
          getCourses(user.settings.user_id, user.lms_user_id, user.id)
            .then((CourseResponse) => {
              setCourses(CourseResponse.courses)
              setCoursesLoading(false)
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
            message: t('error.getUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.getUser') + ' ' + error)
        })
    }
  }, [getUser, getCourses, isAuth, coursesCache, coursesLoading])

  const commonButtonStyle = {
    mt: '1rem',
    width: '85%'
  }

  const commonCardStyle = {
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
  }

  const handleCourseStartDate = (courseStartDate: string) => {
    // Parse the backend date string as a local time
    const courseStart = new Date(courseStartDate.replace('GMT', ''))

    // Compare timestamps
    return courseStart.getTime() > new Date().getTime()
  }

  // Card containing the courses with a button to the specific course
  return (
    <Grid container direction="row" spacing={2} justifyContent="center">
      <Grid item>
        {coursesLoading ? (
          <Card sx={commonCardStyle}>
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Card>
        ) : courses.length === 0 ? (
          <Card sx={commonCardStyle}>
            <CardContent>
              <Typography variant="h5" align="center">
                {t('pages.home.noCourses')}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          courses.map((course) => {
            return (
              <Card key={course.id} sx={commonCardStyle}>
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
                        ? t('pages.home.courseDisabled') +
                          ' ' +
                          dayjs(new Date(course.start_date.replace('GMT', ''))).format('DD.MM.YYYY - HH:mm')
                        : t('pages.home.courseButton')}
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
                  id="create-course-button"
                  data-testid={'create-course-button'}
                  variant="contained"
                  color="primary"
                  onClick={() => setCreateCourseModalOpen(true)}
                  sx={commonButtonStyle}>
                  <AddCircleIcon />
                </Button>
              </Grid>
            </CardContent>
            <CreateCourseModal
              openCreateCourseModal={createCourseModalOpen}
              handleCloseCreateCourseModal={handleCloseCourseModal}
              setSuccessRemoteCourseCreated={setSuccessRemoteCourseCreated}
              successRemoteCourseCreated={successRemoteCourseCreated}
              activeStepCreateCourseModal={activeStepCreateCourseModal}
              setActiveStepCreateCourseModal={setActiveStepCreateCourseModal}></CreateCourseModal>
          </Card>
        )}
      </Grid>
    </Grid>
  )
}
export default Home
