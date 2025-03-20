import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import log from 'loglevel'
import { Dispatch, SetStateAction, memo, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress, Fab, Grid, Modal } from '@common/components'
import { Close } from '@common/icons'
import { CreateCourseDetailsTable, CreateCourseTable, handleError } from '@components'
import { RemoteCourse } from '@core'
import { SnackbarContext, postAddAllStudentsToCourse, postCourse } from '@services'
import { usePersistedStore } from '@store'

dayjs.extend(utc)

type CreateCourseModalProps = {
  openCreateCourseModal?: boolean
  handleCloseCreateCourseModal: () => void
  activeStepCreateCourseModal: number
  setActiveStepCreateCourseModal: Dispatch<SetStateAction<number>>
}

const CreateCourseModal = ({
  openCreateCourseModal = false,
  handleCloseCreateCourseModal,
  activeStepCreateCourseModal,
  setActiveStepCreateCourseModal
}: CreateCourseModalProps) => {
  //Hooks
  const { t } = useTranslation()
  const [selectedRemoteCourse, setSelectedRemoteCourse] = useState<RemoteCourse>()
  const [courseStartDateValue, setCourseStartDateValue] = useState<Dayjs>(dayjs(new Date()))
  const [isSending, setIsSending] = useState<boolean>(false)

  //Stores
  const getUser = usePersistedStore((state) => state.getUser)
  const { addSnackbar } = useContext(SnackbarContext)

  const handleCourseSelection = (course: RemoteCourse) => {
    setSelectedRemoteCourse(course)
  }
  const handleCreateCourse = async () => {
    setIsSending(true)

    const formatDate = (date: Dayjs) => {
      return date.utc().format('YYYY-MM-DDTHH:mm:ss[Z]') // Format without timezone adjustments for the Backend
    }

    const createCourse = {
      lms_id: selectedRemoteCourse?.id,
      name: selectedRemoteCourse?.fullname,
      start_date: formatDate(courseStartDateValue),
      university: await getUser().then((user) => {
        return user.university
      }),
      created_by: await getUser().then((user) => {
        return user.settings.user_id
      })
    }

    postCourse({ outputJson: JSON.stringify(createCourse) })
      .then((course) => {
        postAddAllStudentsToCourse(course.id).then(() => {
          addSnackbar({
            message: t('appGlobal.dataSendSuccessful'),
            severity: 'success',
            autoHideDuration: 5000
          })
          log.info(t('appGlobal.dataSendSuccessful'))
          setIsSending(false)
          handleCloseCreateCourseModal()
        })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'appGlobal.dataSendUnsuccessful', error, 5000)
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
            id="create-course-modal-close-button"
            data-testid="create-course-modal-close-button"
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
              <CreateCourseTable onCourseSelect={handleCourseSelection} selectedCourse={selectedRemoteCourse} />
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
                  disabled={isSending}
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
