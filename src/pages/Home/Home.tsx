import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { Card, CardContent, Grid, Skeleton, Typography } from '@common/components'
import { BarChart, CourseCard, courseCardStyle, CreateCourseCard } from '@components'
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

  const barValues = [60, 40, 30, 40, 50, 60, 70, 80, 80, 60]
  const barLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const barColor = '#3f51b5'

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
      <Card sx={courseCardStyle}>
        <CardContent>
          <Typography variant="h5" align="center">
            {t('pages.home.noCourses')}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const coursesGrid = () => {
    return (
      <Grid item direction="column" spacing={2} justifyContent="center" alignItems="center" mt="1rem">
        <Grid item>
          {coursesLoading ? (
            <Card sx={courseCardStyle}>
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

  /*
  -- Layout
  <Grid container bgcolor={"green"} direction="row" height={"100%"} spacing={2}>
      <Grid container direction={"column"} bgcolor={"red"} width={"50%"}>
          <Grid item bgcolor={"lightGreen"} flexGrow={1}/>
          <Grid item bgcolor={"lightBlue"} flexGrow={1}/>
          <Grid item bgcolor={"lightPink"} flexGrow={1}/>
      </Grid>
      <Grid container direction={"column"} bgcolor={"blue"} width={"50%"} height={"100%"}/>
    </Grid>
    */

  // Card containing the courses with a button to the specific course
  return (
    <Grid container bgcolor={'green'} direction="row" height={'100%'} spacing={2}>
      <Grid container direction={'column'} bgcolor={'red'} width={'50%'}>
        <Grid item bgcolor={'lightGreen'} flexGrow={1}>
          <BarChart barValues={barValues} yAxisLabels={barLabels} barColor={barColor} />
        </Grid>
        <Grid item bgcolor={'lightBlue'} flexGrow={1} />
        <Grid item bgcolor={'lightPink'} flexGrow={1} />
      </Grid>
      {coursesGrid()}
    </Grid>
  )
}
export default Home
