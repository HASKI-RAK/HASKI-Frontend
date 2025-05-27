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
import { handleError, SkeletonList } from '@components'
import { RemoteCourse } from '@core'
import { fetchRemoteCourses, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

type CreateCourseTableProps = {
  onCourseSelect: (course: RemoteCourse) => void
  selectedCourse?: RemoteCourse
}

const CreateCourseTable = ({ onCourseSelect, selectedCourse }: CreateCourseTableProps) => {
  //Hooks
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const [remoteLmsCourses, setRemoteLmsCourses] = useState<RemoteCourse[]>([])
  const [alreadyCreatedCourses, setAlreadyCreatedCourses] = useState<RemoteCourse[]>([])
  const [availableCourses, setAvailableCourses] = useState<RemoteCourse[]>([])

  //Stores
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
                handleError(t, addSnackbar, 'error.fetchCourses', error, 5000)
              })
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.getRemoteCourses', error, 5000)
          })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.getUser', error, 5000)
      })
  }, [])

  const handleSelectedCourseChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: { name: string; id: number }
  ) => {
    const selectedCourse = remoteLmsCourses.find((course) => course.id === nextView.id)
    selectedCourse && onCourseSelect(selectedCourse)
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
            value={{ name: selectedCourse?.fullname, id: selectedCourse?.id }}
            exclusive
            onChange={handleSelectedCourseChange}
            sx={{
              '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                borderColor: (theme) => theme.palette.common.black
              },
              backgroundColor: (theme) => theme.palette.background.paper
            }}>
            {availableCourses.length === 0 ? (
              <ToggleButton
                id="create-course-modal-no-courses-found"
                value={t('components.CreateCourseTable.noCoursesFound')}
                aria-label={t('components.CreateCourseTable.noCoursesFound')}
                key={t('components.CreateCourseTable.noCoursesFound')}
                sx={{
                  minWidth: '30rem',
                  mb: 1,
                  backgroundColor: (theme) => theme.palette.common.white,
                  borderColor: (theme) => theme.palette.common.black
                }}>
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
                  value={{ name: LmsCourse.fullname, id: LmsCourse.id }}
                  aria-label={LmsCourse.fullname}
                  key={LmsCourse.id}
                  sx={{
                    minWidth: '30rem',
                    mb: 1,
                    backgroundColor: (theme) =>
                      selectedCourse?.id === LmsCourse.id ? theme.palette.secondary.light : theme.palette.common.white,
                    borderColor: (theme) => theme.palette.common.black,
                    '&.Mui-selected': {
                      backgroundColor: (theme) => theme.palette.secondary.light,
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.secondary.light
                      }
                    }
                  }}>
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
            value={selectedCourse?.fullname}
            onChange={handleSelectedCourseChange}
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
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
                  mb: 1,
                  backgroundColor: (theme) => theme.palette.common.white
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
}

export default memo(CreateCourseTable)
