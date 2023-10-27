import { QuestionnaireQuestionsModal } from '@components'
import { TableILSQuestions } from '../QuestionnaireQuestions/Table/TableILSQuestions'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  PrivacyModalHookReturn,
  usePrivacyModal as _usePrivacyModal
} from 'src/components/PrivacyModal/PrivacyModal.hooks'
import { useCookies } from 'react-cookie'

export type PrivacyModalProps = {
  usePrivacyModal?: () => PrivacyModalHookReturn
}

const OpenQuestionnaire = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const [modalOpenILSLong, setModalOpenILSLong] = useState(true)
  const [successSendILSLong, setSuccessSendILSLong] = useState(false)
  const [cookie, setCookie] = useCookies(['questionnaire_sent_token'])
  const { privacyPolicyCookie } = usePrivacyModal()
  const handleCloseILSLongModal = (event: object, reason: string) => {
    if (reason == 'backdropClick')
      if (window.confirm(t('components.Menubar.CloseDialog'))) {
        setModalOpenILSLong(false)
        setCookie('questionnaire_sent_token', true, { path: '/' })
      }
  }
  if (!privacyPolicyCookie || cookie['questionnaire_sent_token']) {
    return null
  }
  return (
    <QuestionnaireQuestionsModal open={modalOpenILSLong} handleClose={handleCloseILSLongModal}>
      <TableILSQuestions ilsLong={true} successSend={successSendILSLong} setSuccessSend={setSuccessSendILSLong} />
    </QuestionnaireQuestionsModal>
  )
}
export default OpenQuestionnaire
