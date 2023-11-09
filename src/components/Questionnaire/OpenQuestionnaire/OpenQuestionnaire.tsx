import { QuestionnaireQuestionsModal } from '@components'
import { TableILSQuestions } from '../QuestionnaireQuestions/Table/TableILSQuestions'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, memo } from 'react'
import {
  PrivacyModalHookReturn,
  usePrivacyModal as _usePrivacyModal
} from 'src/components/PrivacyModal/PrivacyModal.hooks'
import { useCookies } from 'react-cookie'
import { usePersistedStore } from '@store'
import { getILS } from '@services'
import log from 'loglevel'

//** usePrivacyPolicy gets the 'privacy_accept_token' from the hook */
export type PrivacyModalProps = {
  usePrivacyModal?: () => PrivacyModalHookReturn
}

const OpenQuestionnaire = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const [modalOpenILSLong, setModalOpenILSLong] = useState(true)
  const [successSendILSLong, setSuccessSendILSLong] = useState(false)
  const [cookie, setCookie] = useCookies(['questionnaire_sent_token'])
  const [questionnaireILSExists, setQuestionnaireILSExists] = useState(true)
  const { privacyPolicyCookie } = usePrivacyModal()
  const fetchUser = usePersistedStore((state) => state.fetchUser)

  //closes the modal
  const handleCloseILSLongModal = (event: object, reason: string) => {
    if (!successSendILSLong) {
      if (reason == 'backdropClick')
        if (window.confirm(t('components.Menubar.CloseDialog'))) {
          setModalOpenILSLong(false)
          window.location.reload()
        }
    } else {
      setModalOpenILSLong(false)
    }
  }

  //only if there is no cookie, the ils data of the user gets fetched (case: different browser)
  //check if there is already ils data
  useEffect(() => {
    if (!cookie['questionnaire_sent_token']) {
      fetchUser().then((user) => {
        return getILS(user.settings.user_id, user.lms_user_id, user.id)
          .then((data) => {
            if (data?.perception_dimension == 'sns' && data?.perception_value == 0) {
              setQuestionnaireILSExists(false)
            } else {
              setCookie('questionnaire_sent_token', true, { path: '/' })
            }
          })
          .catch((error) => {
            log.error(error)
            setQuestionnaireILSExists(false)
          })
      })
    }
  })

  return (
    <>
      {privacyPolicyCookie && !questionnaireILSExists && (
        <QuestionnaireQuestionsModal open={modalOpenILSLong} handleClose={handleCloseILSLongModal}>
          <TableILSQuestions ilsLong={true} successSend={successSendILSLong} setSuccessSend={setSuccessSendILSLong} />
        </QuestionnaireQuestionsModal>
      )}
    </>
  )
}
export default OpenQuestionnaire
