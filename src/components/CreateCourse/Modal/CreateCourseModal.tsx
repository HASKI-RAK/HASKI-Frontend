import dayjs, { Dayjs } from 'dayjs'
import log from 'loglevel'
import React, { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, CircularProgress, Fab, Grid, Modal } from '@common/components'
import { Close } from '@common/icons'
import { CreateCourseDetailsTable, CreateCourseTable } from '@components'
import { RemoteCourse, User } from '@core'
import { SnackbarContext, postCourse } from '@services'
import { usePersistedStore } from '@store'

type CreateCourseModalProps = {
  openCreateCourseModal?: boolean
  successRemoteCourseCreated: boolean
  setSuccessRemoteCourseCreated: React.Dispatch<React.SetStateAction<boolean>>
  handleCloseCreateCourseModal: () => void
}

const CreateCourseModal = memo(
  ({
    openCreateCourseModal = false,
    successRemoteCourseCreated,
    setSuccessRemoteCourseCreated,
    handleCloseCreateCourseModal
  }: CreateCourseModalProps) => {
    const { t } = useTranslation()

    const [selectedRemoteCourse, setSelectedRemoteCourse] = useState<RemoteCourse>()
    const [activeStep, setActiveStep] = useState<number>(0)
    const [courseStartDateValue, setCourseStartDateValue] = useState<Dayjs | null>(dayjs(new Date()))
    const [user, setUser] = useState<User>()
    const [isSending, setIsSending] = useState<boolean>(false)

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
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error',
            autoHideDuration: 5000
          })
          log.error(t('error.getUser') + ' ' + error)
        })
    }, [])

    const handleCreateCourse = () => {
      setIsSending(true)
      // Given Dateformat:Fri Jul 19 2024 08:47:15 GMT+0200 -
      // Returned Dateformat: 2024-07-18T14:23:09Z - YYYY-MM-DDTHH:MM:SSZ
      const formatDate = (date: Date) => {
        return date.toISOString().split('.')[0] + 'Z'
      }

      const createCourse = {
        lms_id: selectedRemoteCourse?.id || 99999,
        name: selectedRemoteCourse?.fullname || 'No value given',
        start_date: courseStartDateValue ? formatDate(courseStartDateValue.toDate()) : formatDate(new Date()),
        university: user?.university || 'No value given',
        created_by: user?.settings.user_id || 1,
        created_at: formatDate(new Date())
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
              onClick={() => handleCloseCreateCourseModal()}
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
                  selectedCourseName={selectedRemoteCourse?.fullname || ''}
                />
                <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                  <Button
                    id="create-course-modal-next-step"
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep(1)}
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
                    onClick={() => setActiveStep(0)}>
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
                        border: (theme) => theme.palette.primary.dark
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
)
// eslint-disable-next-line immutable/no-mutation
CreateCourseModal.displayName = 'CreateCourseModal'
export default CreateCourseModal
