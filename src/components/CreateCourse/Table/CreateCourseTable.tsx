import log from 'loglevel'
import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@common/components'
import { SkeletonList } from '@components'
import { RemoteCourse } from '@core'
import { SnackbarContext, fetchRemoteCourses } from '@services'
import { usePersistedStore, useStore } from '@store'

type CreateCourseTableProps = {
  onCourseSelect: (course: RemoteCourse) => void
  selectedCourseName: string
}

const CreateCourseTable = memo(({ onCourseSelect, selectedCourseName }: CreateCourseTableProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)

  const [remoteLmsCourses, setRemoteLmsCourses] = useState<RemoteCourse[]>([])
  const [alreadyCreatedCourses, setAlreadyCreatedCourses] = useState<RemoteCourse[]>([])
  const [availableCourses, setAvailableCourses] = useState<RemoteCourse[]>([])

  const getCourses = useStore((state) => state.getCourses)
  const getUser = usePersistedStore((state) => state.getUser)

  useEffect(() => {
    getUser()
      .then((user) => {
        fetchRemoteCourses()
          .then((remoteCourses) => {
            setRemoteLmsCourses(remoteCourses)
            getCourses(user.settings.user_id, user.lms_user_id, user.id)
              .then((CourseResponse) => {
                setAvailableCourses(
                  remoteCourses.filter((remoteCourse) => {
                    return !CourseResponse.courses.find((course) => course.lms_id === remoteCourse.id)
                  })
                )
                setAlreadyCreatedCourses(
                  remoteCourses.filter((remoteCourse) => {
                    return CourseResponse.courses.find((course) => course.lms_id === remoteCourse.id)
                  })
                )
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
              message: t('error.getRemoteCourses'),
              severity: 'error',
              autoHideDuration: 5000
            })
            log.error(t('error.getRemoteCourses') + ' ' + error)
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
  }, [])

  const handleChange = (_event: React.MouseEvent<HTMLElement>, nextView: string) => {
    const selectedCourse = remoteLmsCourses.find((course) => course.fullname === nextView)
    if (selectedCourse) {
      onCourseSelect(selectedCourse)
    }
  }

  //Early return
  if (remoteLmsCourses.length === 0) {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <SkeletonList />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Grid>
    )
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid>
        <Grid>
          <Typography variant={'h4'} align={'center'} sx={{ mb: 1 }}>
            {t('components.CreateCourseTable.lmsCourses')}
          </Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={selectedCourseName}
            exclusive
            onChange={handleChange}
            sx={{
              '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                borderColor: (theme) => theme.palette.common.black
              }
            }}>
            {availableCourses.length === 0 ? (
              <ToggleButton
                id="create-course-modal-no-courses-found"
                value={t('components.CreateCourseTable.noCoursesFound')}
                aria-label={t('components.CreateCourseTable.noCoursesFound')}
                key={t('components.CreateCourseTable.noCoursesFound')}
                sx={{ minWidth: '30rem', mb: 1, borderColor: (theme) => theme.palette.common.black }}>
                <Grid item container direction="column" justifyContent="center" alignItems="center">
                  <Typography variant={'subtitle1'} sx={{ color: (theme) => theme.palette.common.black }}>
                    {t('components.CreateCourseTable.noCoursesFound')}
                  </Typography>
                </Grid>
              </ToggleButton>
            ) : (
              availableCourses.map((LmsCourse) => (
                <ToggleButton
                  id={'create-course-modal-' + LmsCourse.fullname + '-selected'}
                  value={LmsCourse.fullname}
                  aria-label={LmsCourse.fullname}
                  key={LmsCourse.id}
                  sx={{ minWidth: '30rem', mb: 1, borderColor: (theme) => theme.palette.common.black }}>
                  <Grid item container direction="column" justifyContent="center" alignItems="center">
                    <Typography variant={'subtitle1'} sx={{ color: (theme) => theme.palette.common.black }}>
                      {LmsCourse.fullname}
                    </Typography>
                  </Grid>
                </ToggleButton>
              ))
            )}
          </ToggleButtonGroup>
        </Grid>
        <Grid>
          <Typography variant={'h4'} align={'center'} sx={{ mb: 1 }}>
            {t('components.CreateCourseTable.alreadyCreatedCourses')}
          </Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={selectedCourseName}
            onChange={handleChange}
            sx={{
              '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                //is the exact same color as disabled togglebutton
                borderColor: '#e0e0e0'
              }
            }}>
            {alreadyCreatedCourses.map((course) => (
              <ToggleButton
                value={course.fullname}
                aria-label={course.fullname}
                key={course.id}
                disabled={true}
                sx={{
                  minWidth: '30rem',
                  mb: 1
                }}>
                <Grid item container direction="column" justifyContent="center" alignItems="center">
                  <Typography variant={'subtitle1'} sx={{ color: (theme) => theme.palette.common.black }}>
                    {course.fullname}
                  </Typography>
                </Grid>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
CreateCourseTable.displayName = 'CreateCourseTable'
export default CreateCourseTable
