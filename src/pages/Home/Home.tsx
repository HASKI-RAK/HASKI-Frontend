import log from 'loglevel'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Skeleton, Stack, Typography, Menu, MenuItem, IconButton } from '@common/components'
import { CardHeader} from '@mui/material'
import { AlgorithmSettingsModal } from '@components'
import { MoreVert, Settings} from '@common/icons'
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
  const authcontext = useContext(AuthContext)
  const { addSnackbar } = useContext(SnackbarContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])

  // Store
  const getUser = usePersistedStore((state) => state.getUser)
  const getCourses = useStore((state) => state.getCourses)

  //TODO: Find an actual way to check if the user is a tutor
  const [isTutor, setIsTutor] = useState(true)
  const [isAlgorithmSettingsModalOpen, setIsAlgorithmSettingsModalOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCourseID, setSelectedCourseID] = useState<null | string>(null)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedCourseID(event.currentTarget?.dataset?.courseid ?? null)
  }
  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null)
  },[setMenuAnchorEl])
  const handleAlgorithmMenuOpen = useCallback(() => {
    handleCloseMenu()
    setIsAlgorithmSettingsModalOpen(true)
  },[handleCloseMenu, setIsAlgorithmSettingsModalOpen])
  const getIDs = useCallback(() => {
    return { courseID: selectedCourseID, topicID: null }
  },[selectedCourseID])

  useEffect(() => {
    const preventEndlessLoading = setTimeout(() => {
      navigate('/login')
    }, 1000)
    const loadData = async () => {
      if (authcontext.isAuth) {
        clearTimeout(preventEndlessLoading)
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
                log.error(error.message)
              })
          })
          .catch((error) => {
            addSnackbar({
              message: t('error.getUser'),
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
      <AlgorithmSettingsModal isOpen={isAlgorithmSettingsModalOpen} handleClose={() => {setIsAlgorithmSettingsModalOpen(false)}} getIDs={getIDs}/>
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
                  <CardHeader
                    action={
                      <IconButton onClick={openMenu} data-courseid={course.id}>
                        <Settings />
                      </IconButton>
                    }
                    title={course.name}/>
                  <CardContent>
                    {/*<Typography variant="h5">{course.name}</Typography>
                    <IconButton sx={{position:'absolute', top:'11rem', left:'55rem'}}><Settings/></IconButton>*/}
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
          <Menu
            id='menu'
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <MenuItem onClick={handleAlgorithmMenuOpen}>Select Algorithm</MenuItem>
          </Menu>
        </div>
      </Stack>
    </div>
  )
}
export default Home
