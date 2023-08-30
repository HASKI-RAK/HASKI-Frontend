import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import PropTypes from 'prop-types'

interface SendStatusModalProps {
  open: boolean
  onClose: () => void
  isSuccess: boolean
}

const SendStatusModal: React.FC<SendStatusModalProps> = ({ open, onClose, isSuccess }) => {
  const title = isSuccess ? 'Success' : 'Error'
  const message = isSuccess ? 'Data sent successfully!' : 'An error occurred while sending data. Please try again.'

  return (
    <Dialog open={open} onClose={onClose} data-testid={'QuestionnaireSendStatusModal'}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" data-testid={'QuestionnaireSendStatusModalButton'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SendStatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired
}

export default SendStatusModal
