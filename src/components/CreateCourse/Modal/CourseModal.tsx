import dayjs, { Dayjs } from 'dayjs'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Modal,
  Tooltip,
  Typography
} from '@common/components'
import { Close } from '@common/icons'
import { Course, RemoteCourse, User } from '@core'
import { usePersistedStore } from '@store'
import { postCourse } from '../../../services/Course/postCourse'
import TableCourse from '../Table/TableCourse'
import TableCourseDetails from '../Table/TableCourseDetails'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

const CourseModal = memo(({ open = false, handleClose }: CourseModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState<RemoteCourse>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()))
  const getUser = usePersistedStore((state) => state.getUser)
  const [user, setUser] = useState<User>()

  const handleCourseSelection = (course: RemoteCourse) => {
    setSelectedCourse(course)
  }

  useEffect(() => {
    getUser().then((user) => {
      setUser(user)
    })
  }, [])

  const handleCreateCourse = () => {
    // Given Dateformat:Fri Jul 19 2024 08:47:15 GMT+0200 -
    // Returned Dateformat: 2024-07-18T14:23:09Z - YYYY-MM-DDTHH:MM:SSZ
    const formatDate = (date: Date) => {
      console.log(date)
      return date.toISOString().split('.')[0] + 'Z'
    }

    const createCourse = {
      lms_id: selectedCourse?.id || 1,
      name: selectedCourse?.fullname || 'Test',
      start_date: value ? formatDate(value.toDate()) : formatDate(new Date()),
      university: user?.university || 'Test',
      created_by: user?.settings.user_id || 1,
      created_at: formatDate(new Date())
    }
    console.log(createCourse)

    postCourse({ outputJson: JSON.stringify(createCourse) })
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid container justifyContent="center" alignItems="center">
        <Box
          sx={{
            position: 'absolute',
            left: '20%',
            right: '20%',
            top: '10%',
            overflow: 'auto',
            maxHeight: '83%',
            bgcolor: 'background.paper',
            border: (theme) => '2px solid' + theme.palette.secondary.dark,
            boxShadow: 24,
            p: 1
          }}>
          <Fab
            color="primary"
            data-testid={'QuestionnaireResultsCloseButton'}
            onClick={handleClose}
            sx={{
              position: 'sticky',
              top: '0%',
              left: '95.5%'
            }}>
            <Close />
          </Fab>
          {activeStep === 0 ? (
            <Grid>
              <TableCourse onCourseSelect={handleCourseSelection} />
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(1)}>
                  {'Select Course'}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <TableCourseDetails course={selectedCourse} datePickerValue={value} setDatePickerValue={setValue} />
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                  {'Back'}
                </Button>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => handleCreateCourse()}>
                  {'create Course'}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Modal>
  )
})
// eslint-disable-next-line immutable/no-mutation
CourseModal.displayName = 'CourseModal'
export default CourseModal
