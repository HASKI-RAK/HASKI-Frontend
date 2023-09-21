import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { Box, Modal, IconButton } from '@common/components'

const styleButtonClose = {
    position: 'sticky',
    left: '99%',
    top: '0%',
    p: 2
}

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
    handleClose: (event: object, reason: string) => void,
    children: React.ReactNode
}

const QuestionnaireQuestionsModal = ({
                                       open = false,
                                       handleClose,
                                       children
                                   }: QuestionnaireQuestionsModalProps) => {
    const { t } = useTranslation()
    // Before reload or close window ask the user if he is sure
    /*window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
        // Cancel the event
        e.preventDefault()

        // Chrome requires returnValue to be set
        e.returnValue = ''
    })*/

    return (
            <Modal data-testid={'ILS Questions Modal'} open={open} onClose={handleClose}>
                    <Box sx={styleBox}>
                        <IconButton
                            color="primary"
                            sx={styleButtonClose}
                            onClick={()=>handleClose({} as object, 'backdropClick')}
                            data-testid={'QuestionnaireResultsCloseButton'}>
                            <CloseIcon />
                        </IconButton>
                        {children}
                    </Box>
            </Modal>
    )
}

export default QuestionnaireQuestionsModal
