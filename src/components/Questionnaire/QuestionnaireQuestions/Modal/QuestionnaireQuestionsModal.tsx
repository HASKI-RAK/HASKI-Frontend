import React, {memo} from 'react'
import { Close } from '@common/icons'
import { Box, Modal, Fab } from '@common/components'

const styleBox = {
  position: 'absolute',
  left: '12%',
  right: '12%',
  top: '10%',
  overflow: 'auto',
  maxHeight: '83%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1
}

type QuestionnaireQuestionsModalProps = {
  open?: boolean
  handleClose: (event: object, reason: string) => void
  children: React.ReactNode
}

const QuestionnaireQuestionsModal = ({ open = false, handleClose, children }: QuestionnaireQuestionsModalProps) => {
  return (
    <Modal data-testid={'Questions Modal'} open={open} onClose={handleClose}>
      <Box sx={styleBox}>
        <Fab
          color="primary"
          onClick={() => handleClose({} as object, 'backdropClick')}
          style={{
            position: 'absolute',
            top: '4%',
            left: '90.5%'
          }}>
          <Close />
        </Fab>
        {children}
      </Box>
    </Modal>
  )
}

export default memo(QuestionnaireQuestionsModal)

// eslint-disable-next-line immutable/no-mutation
QuestionnaireQuestionsModal.setDisplayName = 'QuestionnaireQuestionsModal'
