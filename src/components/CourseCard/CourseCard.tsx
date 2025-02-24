import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import { memo, useCallback, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@common/components'
import { MoreVert } from '@common/icons'
import { Course } from '@core'
import { SnackbarContext, deleteCourse } from '@services'
import { useStore } from '@store'
import DeleteEntityModal from '../DeleteEntityModal/DeleteEntityModal'

type CourseCardProps = {
  course: Course
  isCourseCreatorRole: boolean
}

export const commonCardStyle = {
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

export const commonButtonStyle = {
  mt: '1rem',
  width: '85%'
}

const CourseCard = ({ course, isCourseCreatorRole }: CourseCardProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addSnackbar } = useContext(SnackbarContext)
  const clearCoursesCache = useStore((state) => state.clearCoursesCache)

  const [isDeleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [courseName, setCourseName] = useState<string>('')
  const [courseId, setCourseId] = useState<number>(0)
  const [lmsCourseId, setLmsCourseId] = useState<number>(0)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null)
  }, [setMenuAnchorEl])

  const handleOpenDeleteCourseModal = useCallback(
    (courseName: string, courseId: number, lmsCourseId: number) => {
      handleCloseMenu()
      setDeleteCourseModalOpen(true)
      setCourseName(courseName)
      setCourseId(courseId)
      setLmsCourseId(lmsCourseId)
    },
    [handleCloseMenu, setDeleteCourseModalOpen, setCourseName]
  )

  const handleAcceptDeleteCourseModal = useCallback(
    (courseId: number, lmsCourseId: number) => {
      deleteCourse(courseId, lmsCourseId).then(() => {
        addSnackbar({
          message: t('success.deleteCourse'),
          severity: 'success',
          autoHideDuration: 5000
        })
        clearCoursesCache()
        setDeleteCourseModalOpen(false)
      })
    },
    [setDeleteCourseModalOpen]
  )

  const handleCourseStartDate = (courseStartDate: string) => {
    return new Date(courseStartDate).getTime() > new Date().getTime()
  }

  return (
    <Card key={course.id} sx={commonCardStyle}>
      <CardContent sx={{ position: 'relative' }}>
        <Typography variant="h5" align="center">
          {course.name}
        </Typography>
        {isCourseCreatorRole && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8
            }}
            onClick={openMenu}
            id="course-menu"
            data-testid="CourseSettingsButton">
            <MoreVert />
          </IconButton>
        )}
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Button
            id="course-button"
            variant="contained"
            color="primary"
            sx={commonButtonStyle}
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
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        data-testid="TopicSettingsMenu">
        <MenuItem
          onClick={() => handleOpenDeleteCourseModal(course.name, course.id, course.lms_id)}
          id="delete-course-settings-menu-item">
          <Tooltip arrow title="Delete Course with all of its Content" placement="left">
            <Grid container direction={'row'}>
              <DeleteForeverIcon fontSize="small" />
              <Typography sx={{ ml: 1 }}>Löschen</Typography>
            </Grid>
          </Tooltip>
        </MenuItem>
      </Menu>
      <DeleteEntityModal
        open={isDeleteCourseModalOpen}
        setDeleteEntityModalOpen={setDeleteCourseModalOpen}
        entityName={courseName}
        entityId={courseId}
        extraId={lmsCourseId}
        onConfirm={handleAcceptDeleteCourseModal}
        entityType={'course'}
      />
    </Card>
  )
}

export default memo(CourseCard)
