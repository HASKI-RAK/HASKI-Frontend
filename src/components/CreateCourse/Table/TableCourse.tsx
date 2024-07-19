import FormatAlignLeftIcon from '@mui/icons-material/ViewList'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import log from 'loglevel'
import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@common/components'
import { SkeletonList } from '@components'
import { Course, CourseResponse, RemoteCourse } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'
import { fetchRemoteCourses } from '../../../services/RemoteCourses'
import {
  StyledTableCell,
  StyledTableCellWithoutBorder,
  StyledTableRow
} from '../../Questionnaire/QuestionnaireResults/Table/QuestionnaireResultTableStyle'

type TableCourseProps = {
  open?: boolean
  onCourseSelect: (course: RemoteCourse) => void
}

const formatUnixDate = (unixTime: number): string => {
  if (unixTime === 0) return '---'
  const date = new Date(unixTime * 1000)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const TableCourse = memo(({ open = false, onCourseSelect }: TableCourseProps) => {
  const [remoteLmsCourses, setRemoteLmsCourses] = useState<RemoteCourse[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [view, setView] = useState<string>('list')
  const [alreadyCreatedCourses, setAlreadyCreatedCourses] = useState<RemoteCourse[]>([])
  const [availableCourses, setAvailableCourses] = useState<RemoteCourse[]>([])
  const getCourses = useStore((state) => state.getCourses)
  const getUser = usePersistedStore((state) => state.getUser)
  const { addSnackbar } = useContext(SnackbarContext)
  const { t } = useTranslation()

  useEffect(() => {
    getUser().then((user) => {
      fetchRemoteCourses()
        .then((response) => {
          setRemoteLmsCourses(response)
          return response
        })
        .then((remoteCourses) => {
          getCourses(user.settings.user_id, user.lms_user_id, user.id)
            .then((CourseResponse) => {
              setAlreadyCreatedCourses(
                remoteCourses.filter((remoteCourse) => {
                  return CourseResponse.courses.find((course) => course.lms_id === remoteCourse.id)
                })
              )
              setAvailableCourses(
                remoteCourses.filter((remoteCourse) => {
                  return !CourseResponse.courses.find((course) => course.lms_id === remoteCourse.id)
                })
              )
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
    })
  }, [open])

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView)
    if (nextView !== null) {
      const selectedCourse = remoteLmsCourses.find((course) => course.fullname === nextView)
      if (selectedCourse) {
        onCourseSelect(selectedCourse)
      }
    }
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {remoteLmsCourses.length === 0 ? (
        <TableRow key={'TableCourseTableRow'}>
          <SkeletonList />
        </TableRow>
      ) : (
        <Grid>
          <Grid>
            <Typography variant={'h4'} align={'center'} sx={{ mb: 1 }}>
              {'Kurse aus dem LMS'}
            </Typography>
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
              sx={{
                '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                  borderColor: 'black'
                }
              }}>
              {availableCourses.map((LmsCourse) => (
                <ToggleButton
                  value={LmsCourse.fullname}
                  aria-label={LmsCourse.fullname}
                  key={LmsCourse.id}
                  sx={{ minWidth: '30rem', mb: 1, borderColor: 'black' }}>
                  <Grid item container direction="column" justifyContent="center" alignItems="center">
                    <Typography variant={'subtitle1'} sx={{ color: 'black' }}>
                      {LmsCourse.fullname}
                    </Typography>
                  </Grid>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
          <Grid>
            <Typography variant={'h4'} align={'center'} sx={{ mb: 1 }}>
              {'Bereits erstellte Kurse'}
            </Typography>
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              onChange={handleChange}
              sx={{
                '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
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
                    <Typography variant={'subtitle1'} sx={{ color: 'black' }}>
                      {course.fullname}
                    </Typography>
                  </Grid>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableCourse.displayName = 'TableCourse'
export default TableCourse
