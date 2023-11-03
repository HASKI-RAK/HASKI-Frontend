import { QuestionnaireQuestionsModal } from '@components'
import { TableILSQuestions } from '../QuestionnaireQuestions/Table/TableILSQuestions'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
  PrivacyModalHookReturn,
  usePrivacyModal as _usePrivacyModal
} from 'src/components/PrivacyModal/PrivacyModal.hooks'
import { useCookies } from 'react-cookie'
import { useStore, usePersistedStore } from '@store'
import { ILS } from '@core'

//** Was macht OpenQuestionnaire? */
//öffnet questionnaire sobald privaymodal geschlossen und akzeptiert wurde (fertig)
//checkt ob ilslong daten schon da sind mit getILS -> backend benötigt
//setzt ils cookie sobald questionnaire gesendet wurde (fertig)
//cookie gilt nur für das questionnaire popup (sollte)
//cookie in einen hook auslagern
export type PrivacyModalProps = {
  usePrivacyModal?: () => PrivacyModalHookReturn
}

const OpenQuestionnaire = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const [modalOpenILSLong, setModalOpenILSLong] = useState(true)
  const [successSendILSLong, setSuccessSendILSLong] = useState(false)
  const [cookie, setCookie] = useCookies(['questionnaire_sent_token'])
  const [ilsData, setILSData] = useState<ILS | undefined>(undefined)
  const { privacyPolicyCookie } = usePrivacyModal()
  const handleCloseILSLongModal = (event: object, reason: string) => {
    if (reason == 'backdropClick')
      if (window.confirm(t('components.Menubar.CloseDialog'))) {
        setModalOpenILSLong(false)
      }
  }
  const handleSend = () => {
    setSuccessSendILSLong(true)
    setCookie('questionnaire_sent_token', true, { path: '/' })
  }
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchILS = useStore((state) => state.fetchILS)
  //aktuellen User holen
  //ils von user holen
  //ils daten bekommen
  useEffect(() => {
    fetchUser().then((user) => {
      fetchILS(user.settings.user_id, user.lms_user_id, user.id).then((data) => {
        setILSData(data)
      })
    })
  }, [])
  //überprüft ob ils keine antworten hat
  const checkIfNoContent = () => {
    if (ilsData?.perception_dimension == undefined && ilsData?.perception_value == undefined) return true
    return false
  }

  return (
    <>
      {privacyPolicyCookie && !cookie['questionnaire_sent_token'] && checkIfNoContent() && (
        <QuestionnaireQuestionsModal open={modalOpenILSLong} handleClose={handleCloseILSLongModal}>
          <TableILSQuestions ilsLong={true} successSend={successSendILSLong} setSuccessSend={handleSend} />
        </QuestionnaireQuestionsModal>
      )}
    </>
  )
}
export default OpenQuestionnaire
