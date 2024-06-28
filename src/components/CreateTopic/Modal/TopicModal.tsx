import { memo, useCallback, useState } from 'react'
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
import { RemoteCourse } from '@core'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

const TopicModal = memo(({ open = false, handleClose }: CourseModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState<RemoteCourse>()
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleCourseSelection = (course: RemoteCourse) => {
    setSelectedCourse(course)
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
              <Typography variant={'h3'} align={'center'} sx={{ mb: 1 }}>
                {'Topics aus dem Kurs'}
              </Typography>
              <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(1)}>
                  {'Select Topics'}
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <Typography variant={'h3'} align={'center'} sx={{ mb: 1 }}>
                {'Kursdetails'}
              </Typography>
              <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Button id="add-course-button" variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                  {'Back'}
                </Button>
                <Button
                  id="add-course-button"
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Selected Course:', selectedCourse)}>
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
TopicModal.displayName = 'TopicModal'
export default TopicModal
