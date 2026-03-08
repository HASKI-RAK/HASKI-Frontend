import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { Card, CardContent, Divider, Grid, Skeleton, Typography } from '@common/components'
import { 
  BarChart,
  CourseCard,
  courseCardStyle,
  CreateCourseCard,
  XpBarChart,
  XpLeaderboard
} from '@components'
import { Course, GamificationSettings } from '@core'
import { AuthContext, ILSContext, RoleContext, SnackbarContext } from '@services'
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
  const { visualInput } = useContext(ILSContext)

  // States
  const [courses, setCourses] = useState<Course[]>([])
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true)
  const [activeStepCreateCourseModal, setActiveStepCreateCourseModal] = useState<number>(0)
  const [createCourseModalOpen, setCreateCourseModalOpen] = useState<boolean>(false)
  const [gamificationSettings, setGamificationSettings] = useState<GamificationSettings>({} as GamificationSettings)

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getGamificationSettings = usePersistedStore((state) => state.getGamificationSettings)
  const getCourses = useStore((state) => state.getCourses)
  const clearCoursesCache = useStore((state) => state.clearCoursesCache)
  const coursesCache = useStore((state) => state._cache_Courses_record)

  const handleCloseCourseModal = () => {
    clearCoursesCache()
    setCreateCourseModalOpen(false)
    setActiveStepCreateCourseModal(0)
  }

  const maxRows = 10
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
          getGamificationSettings(user.id)
            .then((gamificationSettings) => {
              setGamificationSettings(gamificationSettings)
            })
            .catch((error) => {
              addSnackbar({
                message: t('error.fetchGamificationSettings'),
                severity: 'error',
                autoHideDuration: 5000
              })
              log.error(t('error.fetchGamificationSettings') + ' ' + error)
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
      <Grid container item direction="column" spacing={2} justifyContent="start" alignItems="center" mt="0.5rem" id='coursesGrid' width ={'70%'}>
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
  // Card containing the courses with a button to the specific course
  return (
    <Grid container mt='1rem' direction="row" height={'100%'} spacing={2} id='homeBaseGrid'>
      <Grid container item direction={'column'} width={'30%'}>
        <Grid item  flexGrow={1} />
        <Grid item flexGrow={1} />
        <Grid item flexGrow={1}>
          <BarChart leaderboardEntries={barValues.map((entry, index)=>{
            return {
              rank:index,
              metric: entry,
              student_id: index+1
            }
          }
          )} barColor={barColor} />
        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem />
      {coursesGrid()}
    </Grid>
  )
}
export default Home
