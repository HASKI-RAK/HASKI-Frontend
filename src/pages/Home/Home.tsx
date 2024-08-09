import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Skeleton, Stack, Typography } from '@common/components'
import { Course } from '@core'
import { AuthContext, SnackbarContext } from '@services'
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
  const { addSnackbar } = useContext(SnackbarContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)

  /*
  * Temporarily removed, because setting of topic algorithms is not implemented yet
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCourseID, setSelectedCourseID] = useState<undefined | string>(undefined)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedCourseID(event.currentTarget.dataset.courseid)
  }
  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null)
  }, [setMenuAnchorEl])
  */

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
                  {/*
                  * Temporarily removed, because setting of topic algorithms is not implemented yet/
                  * setting of learning path algorithm for all topics at once, will probably not be implemented
                  <Grid container direction="row" justifyContent="flex-end" alignItems="flex-start">
                    <IconButton
                      onClick={openMenu}
                      data-courseid={course.id}
                      data-testid="settings-button"
                      sx={{ position: 'relative', mt:'0.4rem'}}>
                      <MoreVert />
                    </IconButton>
                  </Grid>*/}
                  <Typography variant="h5" align="center" sx={{ mt: '0.5rem' }}>
                    {course.name}
                  </Typography>
                  <CardContent>
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
                    <Stack direction="row" alignItems={'center'} justifyContent={'center'} sx={{ mt: '0.5rem' }}>
                      <Typography variant="body1">
                        {t('pages.course.cardText')}
                        {t('pages.course.fixed')}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              )
            })
          )}
          {/*
          * see other commented out code above
          <Menu
            id="menu"
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            data-testid="settings-menu">
            <MenuItem onClick={handleAlgorithmMenuOpen} data-testid="menu-item-algorithm">
              {t('pages.home.menuItemAlgorithms')}
            </MenuItem>
          </Menu>
          */}
        </div>
      </Stack>
    </div>
  )
}
export default Home
