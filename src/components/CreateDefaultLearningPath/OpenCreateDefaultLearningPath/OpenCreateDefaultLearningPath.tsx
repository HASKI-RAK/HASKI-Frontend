import { memo, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { CreateDefaultLearningPathModal, handleError, usePrivacyModal as _usePrivacyModal } from '@components'
import { AuthContext, RoleContext, SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import type { PrivacyModalProps } from '../../PrivacyModal/PrivacyModal'

const OpenCreateDefaultLearningPath = ({ usePrivacyModal = _usePrivacyModal }: PrivacyModalProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const { isAuth } = useContext(AuthContext)
  const [modalOpenDefaultLearningPath, setModalOpenDefaultLearningPath] = useState(true)
  const [cookie, setCookie] = useCookies(['default_learningpath_sent_token'])
  const [defaultLearningPathExists, setDefaultLearningPathExists] = useState(true)
  const { privacyPolicyCookie } = usePrivacyModal()
  const getUser = usePersistedStore((state) => state.getUser)
  const { isCourseCreatorRole } = useContext(RoleContext)
  const getDefaultLearningPath = usePersistedStore((state) => state.getDefaultLearningPath)

  const handleCloseDefaultLearningPathModal = (event: object, reason: string) => {
    if (reason == 'backdropClick') {
      if (!defaultLearningPathExists) {
        if (window.confirm(t('components.Menubar.CloseDialog'))) {
          setModalOpenDefaultLearningPath(false)
          window.location.reload()
        }
      }
    } else {
      setModalOpenDefaultLearningPath(false)
    }
  }

  //only if there is no cookie, the ils data of the user gets fetched (case: different browser)
  //check if there is already ils data
  useEffect(() => {
    if (!cookie['default_learningpath_sent_token'] && isAuth) {
      getUser()
        .then((user) => {
          return getDefaultLearningPath(user.settings.user_id, user.lms_user_id)
            .then((data) => {
              if (data.length > 0) {
                setCookie('default_learningpath_sent_token', true, { path: '/' })
              } else {
                setDefaultLearningPathExists(false)
              }
            })
            .catch((error) => {
              handleError(t, addSnackbar, 'error.fetchDefaultLearningPath', error, 3000)
              setDefaultLearningPathExists(false)
            })
        })
        .catch((error) => {
          handleError(t, addSnackbar, 'error.fetchUser', error, 3000)
          setDefaultLearningPathExists(false)
        })
    }
  }, [])

  return (
    <>
      {privacyPolicyCookie && !defaultLearningPathExists && isCourseCreatorRole && (
        <CreateDefaultLearningPathModal
          open={modalOpenDefaultLearningPath}
          handleClose={handleCloseDefaultLearningPathModal}
        />
      )}
    </>
  )
}
export default memo(OpenCreateDefaultLearningPath)
