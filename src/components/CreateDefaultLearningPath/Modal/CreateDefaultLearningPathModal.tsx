import { Box, Fab, Modal } from '@common/components'
import { Close } from '@common/icons'
import CreateDefaultLearningPathModal from '../Table/CreateDefaultLearningPathTable'

type DefaultLearningPathModalProps = {
  open?: boolean
  handleClose: (event: object, reason: string) => void
}

const DefaultLearningPathModal = ({ open = false, handleClose }: DefaultLearningPathModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          left: '9%',
          right: '9%',
          top: '10%',
          height: '70%',
          width: '80%',
          overflow: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2
        }}>
        <Fab
          id="close-default-learning-path-modal-button"
          color="primary"
          onClick={() => handleClose({} as object, 'backdropClick')}
          style={{
            position: 'absolute',
            top: '1%',
            left: '94.5%'
          }}>
          <Close />
        </Fab>
        <CreateDefaultLearningPathModal />
      </Box>
    </Modal>
  )
}

export default DefaultLearningPathModal
