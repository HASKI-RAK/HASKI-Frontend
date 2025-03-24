import log from 'loglevel'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { PrivacyModalHookReturn, TableILSQuestions, usePrivacyModal as _usePrivacyModal } from '@components'
import { AuthContext, RoleContext, fetchDefaultLearningPath, fetchILS } from '@services'
import { usePersistedStore, useStore } from '@store'
import DefaultLearningPathModal from '../Modal/CreateDefaultLearningPathModal'

//** usePrivacyPolicy gets the 'privacy_accept_token' from the hook */
export type PrivacyModalProps = {
  usePrivacyModal?: () => PrivacyModalHookReturn
}

const OpenCreateDefaultLearningPath = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const { isAuth } = useContext(AuthContext)
  const [modalOpenDefaultLearningPath, setModalOpenDefaultLearningPath] = useState(true)
  const [cookie, setCookie] = useCookies(['default_learningpath_sent_token'])
  const [defaultLearningPathExists, setDefaultLearningPathExists] = useState(true)
  const { privacyPolicyCookie } = usePrivacyModal()
  const getUser = usePersistedStore((state) => state.getUser)
  const { isCourseCreatorRole } = useContext(RoleContext)
  const clearLearningPathTopicCache = useStore((state) => state.clearLearningPathTopicCache)
  const clearLearningPathElement = useStore((state) => state.clearLearningPathElementCache)
  const clearLearningPathElementStatusCache = usePersistedStore((state) => state.clearLearningPathElementStatusCache)

  //closes the modal
  const handleCloseILSLongModal = (event: object, reason: string) => {
    if (!defaultLearningPathExists) {
      if (reason == 'backdropClick')
        if (window.confirm(t('components.Menubar.CloseDialog'))) {
          setModalOpenDefaultLearningPath(false)
          window.location.reload()
        }
    } else {
      setModalOpenDefaultLearningPath(false)
    }
  }

  //only if there is no cookie, the ils data of the user gets fetched (case: different browser)
  //check if there is already ils data
  useEffect(() => {
    if (!cookie['default_learningpath_sent_token'] && isAuth) {
      getUser().then((user) => {
        return fetchDefaultLearningPath({ userId: user.settings.user_id, lmsUserId: user.lms_user_id })
          .then((data) => {
            if (data.length > 0) {
              console.log('what')
              setCookie('default_learningpath_sent_token', true, { path: '/' })
            } else {
              console.log('No default learning path found')
              setDefaultLearningPathExists(false)
            }
          })
          .catch((error) => {
            log.error(error)
            setDefaultLearningPathExists(false)
          })
      })
    }
  })

  return (
    <>
      {privacyPolicyCookie && !defaultLearningPathExists && isCourseCreatorRole && (
        <DefaultLearningPathModal open={modalOpenDefaultLearningPath} handleClose={handleCloseILSLongModal} />
      )}
    </>
  )
}
export default OpenCreateDefaultLearningPath
