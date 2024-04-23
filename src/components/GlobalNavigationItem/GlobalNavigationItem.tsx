import log from 'loglevel'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Divider, Menu, MenuItem, Popover, Tooltip } from '@common/components'
import { Grid, Link } from '@common/components'
import { ArrowDropDown } from '@common/icons'
import { SkeletonList } from '@components'
import { Course, Topic } from '@core'
import { AuthContext, SnackbarContext } from '@services'
import { usePersistedStore, useStore } from '@store'

type GlobalNavigationItemProps = {
  courseSelected: boolean
}

const GlobalNavigationItem = ({ courseSelected }: GlobalNavigationItemProps) => {
  const navigate = useNavigate()
  const [anchorElTopics, setAnchorElTopics] = useState<null | HTMLElement>(null)
  const { addSnackbar } = useContext(SnackbarContext)
  const { courseId } = useParams<string>()
  const { t } = useTranslation()
  const [loadingTopics, setLoadingTopics] = useState(true)
  const [topicsPath, setTopicsPath] = useState<Topic[]>([])
  const [coursePath, setCoursePath] = useState<Course[]>([])
  const getUser = usePersistedStore((state) => state.getUser)
  const getLearningPathTopic = useStore((state) => state.getLearningPathTopic)
  const getCourses = useStore((state) => state.getCourses)

  const handleOpen = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTopics(event.currentTarget)
    getUser()
      .then((user) => {
        getCourses(user.settings.user_id, user.lms_user_id, user.id)
          .then((CourseResponse) => {
            setCoursePath(CourseResponse.courses)
            setLoadingTopics(false)
          })
          .catch((error) => {
            // 🍿 snackbar error
            addSnackbar({
              message: error.message,
              severity: 'error',
              autoHideDuration: 5000
            })
            log.error(error.message)
          })
      })
      .catch((error) => {
        // 🍿 snackbar error
        addSnackbar({
          message: error.message,
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(error.message)
      })
  }

  const handleOpenTopicsMenu = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTopics(event.currentTarget)
    getUser()
      .then((user) => {
        getLearningPathTopic(user.settings.user_id, user.lms_user_id, user.id, courseId)
          .then((TopicResponse) => {
            setTopicsPath(TopicResponse.topics)
            setLoadingTopics(false)
          })
          .catch((error) => {
            // 🍿 snackbar error
            addSnackbar({
              message: error.message,
              severity: 'error',
              autoHideDuration: 5000
            })
            log.error(error.message)
          })
      })
      .catch((error) => {
        // 🍿 snackbar error
        addSnackbar({
          message: error.message,
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(error.message)
      })
  }

  const handleCloseTopicsMenu = () => {
    setAnchorElTopics(null)
  }
  // check auth
  return (
    <>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flexGrow: 0, ml: 1 }}>
        <Tooltip title="Select a course">
          <Button
            id="course-button"
            endIcon={
              anchorElTopics ? (
                <ArrowDropDown sx={{ transform: 'rotate(180deg)', ml: -1 }} />
              ) : (
                <ArrowDropDown sx={{ ml: -1 }} />
              )
            }
            onClick={handleOpen}
            data-testid="Menubar-TopicButton"
            variant="text">
            {t('appGlobal.courses')}
          </Button>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorElTopics}
          open={Boolean(anchorElTopics)}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          sx={{
            alignItems: 'center',
            textAlign: 'center'
          }}
          onClose={handleCloseTopicsMenu}>
          {loadingTopics ? ( // display Skeleton component while loading
            <Box width={400}>
              <SkeletonList />
            </Box>
          ) : (
            <>
              {[...coursePath].reverse().map((course) => (
                <MenuItem
                  id={course.name.concat('-link').replaceAll(' ', '-')}
                  key={course.name}
                  data-testid={`Menubar-Topic-${course.name}`}
                  color="inherit"
                  onClick={() => {
                    navigate(`course/${course.id}`)
                    handleCloseTopicsMenu()
                  }}>
                  {course.name}
                </MenuItem>
              ))}
            </>
          )}
        </Menu>
      </Box>
    </>
  )
}

export default GlobalNavigationItem
