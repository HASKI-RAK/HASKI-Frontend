import dayjs, { Dayjs } from 'dayjs'
import log from 'loglevel'
import { Dispatch, SetStateAction, memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress, Fab, Grid, Modal } from '@common/components'
import { Close } from '@common/icons'
import { CreateCourseDetailsTable, CreateCourseTable, HandleError } from '@components'
import { RemoteCourse, User } from '@core'
import { SnackbarContext, postCourse } from '@services'
import { usePersistedStore } from '@store'

type CreateCourseModalProps = {
  openCreateCourseModal?: boolean
  successRemoteCourseCreated: boolean
  setSuccessRemoteCourseCreated: Dispatch<SetStateAction<boolean>>
  handleCloseCreateCourseModal: () => void
  activeStepCreateCourseModal: number
  setActiveStepCreateCourseModal: Dispatch<SetStateAction<number>>
}

const CreateCourseModal = ({
  openCreateCourseModal = false,
  successRemoteCourseCreated,
  setSuccessRemoteCourseCreated,
  handleCloseCreateCourseModal,
  activeStepCreateCourseModal,
  setActiveStepCreateCourseModal
}: CreateCourseModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const [selectedRemoteCourse, setSelectedRemoteCourse] = useState<RemoteCourse>()
  const [courseStartDateValue, setCourseStartDateValue] = useState<Dayjs | null>(dayjs(new Date()))
  const [user, setUser] = useState<User>()
  const [isSending, setIsSending] = useState<boolean>(false)

  //Stores
  const getUser = usePersistedStore((state) => state.getUser)
  const { addSnackbar } = useContext(SnackbarContext)

  const handleCourseSelection = (course: RemoteCourse) => {
    setSelectedRemoteCourse(course)
  }

  useEffect(() => {
    getUser()
      .then((user) => {
        setUser(user)
      })
      .catch((error) => {
        HandleError(t, addSnackbar, 'error.getUser', error, 5000)
      })
  }, [])

  const handleCreateCourse = () => {
    setIsSending(true)

    const formatDate = (date: Dayjs) => {
      return date.format('YYYY-MM-DDTHH:mm:ss[Z]') // Format without timezone adjustments
    }

    const createCourse = {
      lms_id: selectedRemoteCourse?.id,
      name: selectedRemoteCourse?.fullname,
      start_date: courseStartDateValue ? formatDate(courseStartDateValue) : formatDate(dayjs(new Date())),
      university: user?.university,
      created_by: user?.settings.user_id
    }

    postCourse({ outputJson: JSON.stringify(createCourse) }).then((response) => {
      if (response) {
        addSnackbar({
          message: t('appGlobal.dataSendSuccessful'),
          severity: 'success',
          autoHideDuration: 5000
        })
        log.info(t('appGlobal.dataSendSuccessful'))
        setSuccessRemoteCourseCreated(true)
      } else {
        addSnackbar({
          message: t('appGlobal.dataSendUnsuccessful'),
          severity: 'error',
          autoHideDuration: 5000
        })
        log.error(t('appGlobal.dataSendUnsuccessful'))
        setSuccessRemoteCourseCreated(false)
      }
      setIsSending(false)
    })
  }

  return (
    <Modal open={openCreateCourseModal} onClose={handleCloseCreateCourseModal}>
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
            data-testid={'create-course-modal-close-button'}
            onClick={() => handleCloseCreateCourseModal()}
            sx={{
              position: 'sticky',
              top: '0%',
              left: '95.5%'
            }}>
            <Close />
          </Fab>
          {activeStepCreateCourseModal === 0 ? (
            <Grid>
              <CreateCourseTable
                onCourseSelect={handleCourseSelection}
                selectedCourseName={selectedRemoteCourse?.fullname ?? ''}
              />
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Button
                  id="create-course-modal-next-step"
                  data-testid={'create-course-modal-next-step'}
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveStepCreateCourseModal(1)}
                  disabled={selectedRemoteCourse === undefined}>
                  {t('components.CreateCourseModal.createCourse')}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <CreateCourseDetailsTable
                remoteCourse={selectedRemoteCourse}
                datePickerValue={courseStartDateValue}
                setDatePickerValue={setCourseStartDateValue}
              />
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button
                  id="create-course-modal-back-step"
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveStepCreateCourseModal(0)}>
                  {t('appGlobal.back')}
                </Button>
                <Button
                  id="create-course-modal-create-button"
                  variant="contained"
                  color="primary"
                  disabled={isSending || successRemoteCourseCreated}
                  sx={{
                    m: 2,
                    '&.Mui-disabled': {
                      border: (theme) => theme.palette.primary.main
                    }
                  }}
                  onClick={() => handleCreateCourse()}>
                  {isSending ? <CircularProgress size={24} /> : t('components.CreateCourseModal.createCourse')}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Grid>
    </Modal>
  )
}

export default memo(CreateCourseModal)
