import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox, Fab,
  FormControlLabel,
  FormGroup,
  Link,
  Modal,
  Tooltip,
  Grid,
  Typography
} from '@common/components'
import { Close } from '@common/icons'
import TableCourse from '../../Course/Table/TableCourse'

type CourseModalProps = {
  open?: boolean
  handleClose: () => void
}

const CourseModal = memo(({open = false, handleClose}: CourseModalProps) => {
  const {t} = useTranslation()
  const navigate = useNavigate()

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
        <Typography variant={'h3'} align={"center"} sx={{ mb: 1 }}>
          {'Kurse aus dem LMS'}
        </Typography>
        <TableCourse />
        <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          <Button
            id="add-course-button"
            variant="contained"
            color="primary">
            {'Create Course'}
          </Button>
        </Grid>
      </Box>
      </Grid>
    </Modal>
  )
}
)
// eslint-disable-next-line immutable/no-mutation
CourseModal.displayName = 'CourseModal'
export default CourseModal