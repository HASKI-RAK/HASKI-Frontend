import { Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@common/components'
import { DeleteForever, MoreVert } from '@common/icons'
import { DeleteEntityModal } from '@components'
import { Course } from '@core'
import { SnackbarContext,deleteCourse } from '@services'
import { useStore } from '@store'
import dayjs from 'dayjs'
import { MouseEvent, memo, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type CourseCardProps = {
  course: Course
  isCourseCreatorRole: boolean
}

export const courseCardStyle = {
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

export const courseCardButtonStyle = {
  mt: '1rem',
  width: '85%'
}

const CourseCard = ({ course, isCourseCreatorRole }: CourseCardProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addSnackbar } = useContext(SnackbarContext)

  const [deleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [courseName, setCourseName] = useState<string>('')
  const [courseId, setCourseId] = useState<number>(0)
  const [lmsCourseId, setLmsCourseId] = useState<number>(0)

  const clearCoursesCache = useStore((state) => state.clearCoursesCache)

  const openCourseCardMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }, [])

  const handleCloseCourseCardMenu = useCallback(() => {
    setMenuAnchorEl(null)
  }, [])

  const handleOpenDeleteCourseModal = useCallback(
    (courseName: string, courseId: number, lmsCourseId: number) => {
      handleCloseCourseCardMenu()
      setDeleteCourseModalOpen(true)
      setCourseName(courseName)
      setCourseId(courseId)
      setLmsCourseId(lmsCourseId)
    },
    [handleCloseCourseCardMenu]
  )

  const handleAcceptDeleteCourseModal = useCallback(
    (courseId: number, lmsCourseId: number) => {
      deleteCourse(courseId, lmsCourseId).then(() => {
        addSnackbar({
          message: t('components.CourseCard.deleteCourseSuccessful'),
          severity: 'success',
          autoHideDuration: 5000
        })
        clearCoursesCache()
        setDeleteCourseModalOpen(false)
      })
    },
    [addSnackbar, clearCoursesCache, t]
  )

  const handleCourseStartDate = (courseStartDate: string) => {
    return new Date(courseStartDate).getTime() > new Date().getTime()
  }

  return (
    <Card key={course.id} sx={courseCardStyle}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography variant="h5" align="center">
              {course.name}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'right' }}>
            {isCourseCreatorRole && (
              <IconButton onClick={openCourseCardMenu} id="course-card-menu" data-testid="CourseSettingsButton">
                <MoreVert />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Grid container item direction="column" justifyContent="center" alignItems="center">
          <Button
            id="course-button"
            variant="contained"
            color="primary"
            sx={courseCardButtonStyle}
            disabled={handleCourseStartDate(course.start_date)}
            onClick={() => navigate('/course/' + course.id)}>
            {handleCourseStartDate(course.start_date)
              ? t('pages.home.courseDisabled') + ' ' + dayjs(course.start_date).format('DD.MM.YYYY - HH:mm')
              : t('pages.home.courseButton')}
          </Button>
        </Grid>
      </CardContent>
      <Menu
        id="course-card-menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseCourseCardMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        data-testid="CourseSettingsMenu">
        <MenuItem
          onClick={() => handleOpenDeleteCourseModal(course.name, course.id, course.lms_id)}
          id="delete-course-settings-menu-item">
          <Tooltip arrow title={t('components.CourseCard.deleteTooltip')} placement="left">
            <Grid container direction="row">
              <DeleteForever fontSize="small" />
              <Typography sx={{ ml: 1 }}>{t('appGlobal.delete')}</Typography>
            </Grid>
          </Tooltip>
        </MenuItem>
      </Menu>
      <DeleteEntityModal
        openDeleteEntityModal={deleteCourseModalOpen}
        setDeleteEntityModalOpen={setDeleteCourseModalOpen}
        entityName={courseName}
        entityId={courseId}
        entityLmsId={lmsCourseId}
        onDeleteConfirm={handleAcceptDeleteCourseModal}
        entityType={t('pages.course')}
      />
    </Card>
  )
}

export default memo(CourseCard)
