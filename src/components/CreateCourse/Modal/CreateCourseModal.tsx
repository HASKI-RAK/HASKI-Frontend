import dayjs, { Dayjs } from 'dayjs'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Fab, Grid, Modal } from '@common/components'
import { Close } from '@common/icons'
import { CreateCourseDetailsTable, CreateCourseTable } from '@components'
import { RemoteCourse, User } from '@core'
import { postCourse } from '@services'
import { usePersistedStore } from '@store'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

const CreateCourseModal = memo(({ open = false, handleClose }: CourseModalProps) => {
  const { t } = useTranslation()

  const [selectedCourse, setSelectedCourse] = useState<RemoteCourse>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(dayjs(new Date()))
  const [user, setUser] = useState<User>()

  const getUser = usePersistedStore((state) => state.getUser)

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
      return date.toISOString().split('.')[0] + 'Z'
    }

    const createCourse = {
      lms_id: selectedCourse?.id || 1,
      name: selectedCourse?.fullname || 'Test',
      start_date: startDateValue ? formatDate(startDateValue.toDate()) : formatDate(new Date()),
      university: user?.university || 'Test',
      created_by: user?.settings.user_id || 1,
      created_at: formatDate(new Date())
    }

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
            id={'create-course-modal-close-button'}
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
              <CreateCourseTable
                onCourseSelect={handleCourseSelection}
                selectedCourseName={selectedCourse?.fullname || ''}
              />
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(1)}>
                  {t('components.CourseModal.selectCourse')}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <CreateCourseDetailsTable
                remoteCourse={selectedCourse}
                datePickerValue={startDateValue}
                setDatePickerValue={setStartDateValue}
              />
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                  {t('appGlobal.back')}
                </Button>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => handleCreateCourse()}>
                  {t('components.CreateCourseModal.createCourse')}
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
CreateCourseModal.displayName = 'CourseModal'
export default CreateCourseModal
