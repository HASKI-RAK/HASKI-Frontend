import React, { memo } from 'react'

import { Box, Fab, Modal } from '@common/components'
import { Close } from '@common/icons'

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
          id="close-questionnaire-button"
          color="primary"
          data-testid={'QuestionnaireQuestionsModal-Close-Button'}
          onClick={() => handleClose({} as object, 'backdropClick')}
          style={{
            position: 'absolute',
            top: '1%',
            left: '95.5%'
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
