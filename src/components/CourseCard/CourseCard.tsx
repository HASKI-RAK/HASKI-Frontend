import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, Grid, IconButton, Menu, MenuItem, Typography } from '@common/components'
import { MoreVert } from '@common/icons'
import { Course } from '@core'
import DeleteCourseModal from '../DeleteCourseModal/DeleteCourseModal'

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

  const [isDeleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [courseName, setCourseName] = useState<string>('')

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = useCallback(() => {
    setMenuAnchorEl(null)
  }, [setMenuAnchorEl])

  const handleOpenDeleteCourseModal = useCallback(
    (courseName: string) => {
      handleCloseMenu()
      setDeleteCourseModalOpen(true)
      setCourseName(courseName)
    },
    [handleCloseMenu, setDeleteCourseModalOpen, setCourseName]
  )

  const handleCloseDeleteCourseModal = useCallback(() => {
    setDeleteCourseModalOpen(false)
  }, [setDeleteCourseModalOpen])

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
        <MenuItem onClick={() => handleOpenDeleteCourseModal(course.name)} id="delete-course-settings-menu-item">
          <Tooltip arrow title="Delete Course with all of its Content">
            <>
              <DeleteForeverIcon fontSize="small" />
              <Typography sx={{ ml: 1 }}>Löschen</Typography>
            </>
          </Tooltip>
        </MenuItem>
      </Menu>
      <DeleteCourseModal
        open={isDeleteCourseModalOpen}
        onClose={handleCloseDeleteCourseModal}
        courseName={courseName}
        onConfirm={handleCloseDeleteCourseModal}
      />
    </Card>
  )
}

export default memo(CourseCard)
