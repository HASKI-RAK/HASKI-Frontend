import { QuestionnaireQuestionsModal } from '@components'
import { TableILSQuestions } from '../QuestionnaireQuestions/Table/TableILSQuestions'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

const OpenQuestionnaire = () => {
  const { t } = useTranslation()
  const [modalOpenILSLong, setModalOpenILSShort] = useState(true)
  const [successSendILSLong, setSuccessSendILSLong] = useState(false)
  const handleCloseILSShortModal = (event: object, reason: string) => {
    if (reason == 'backdropClick') if (window.confirm(t('components.Menubar.CloseDialog'))) setModalOpenILSShort(false)
  }
  return (
    <QuestionnaireQuestionsModal open={modalOpenILSLong} handleClose={handleCloseILSShortModal}>
      <TableILSQuestions ilsLong={true} successSend={successSendILSLong} setSuccessSend={setSuccessSendILSLong} />
    </QuestionnaireQuestionsModal>
  )
}
export default OpenQuestionnaire
