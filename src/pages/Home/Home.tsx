import dayjs from 'dayjs'
import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, IconButton, Skeleton, Typography } from '@common/components'
import { AddCircle, MoreVert } from '@common/icons'
import { CreateCourseModal } from '@components'
import { Course } from '@core'
import { AuthContext, RoleContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import CourseCard from '../../components/CourseCard/CourseCard'
import { commonCardStyle } from '../../components/CourseCard/CourseCard'
import CreateCourseCard from '../../components/CourseCard/CreateCourseCard'

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

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)
  const clearCoursesCache = useStore((state) => state.clearCoursesCache)
  const coursesCache = useStore((state) => state._cache_Courses_record)

  const handleCloseCourseModal = () => {
    clearCoursesCache()
    setCreateCourseModalOpen(false)
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

  const noCourses = () => {
    return (
      <Card sx={commonCardStyle}>
        <CardContent>
          <Typography variant="h5" align="center">
            {t('pages.home.noCourses')}
          </Typography>
        </CardContent>
      </Card>
    )
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
          noCourses()
        ) : (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} isCourseCreatorRole={isCourseCreatorRole} />
          ))
        )}
        {isCourseCreatorRole && (
          <CreateCourseCard
            createCourseModalOpen={createCourseModalOpen}
            handleCloseCourseModal={handleCloseCourseModal}
            activeStepCreateCourseModal={activeStepCreateCourseModal}
            setActiveStepCreateCourseModal={setActiveStepCreateCourseModal}
            setCreateCourseModalOpen={setCreateCourseModalOpen}
          />
        )}
      </Grid>
    </Grid>
  )
}
export default Home
