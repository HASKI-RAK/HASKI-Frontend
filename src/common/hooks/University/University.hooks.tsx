import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import log from 'loglevel'
import { usePersistedStore } from '@store'

export type UniversityHookReturn = {
  readonly university: string
}

export const useUniversity = (): UniversityHookReturn => {
  const { t } = useTranslation()
  const [university, setUniversity] = useState('')
  const getUser = usePersistedStore((state) => state.getUser)
  useEffect(() => {
    //fetch the university from the current user and return university
    getUser()
      .then((user) => {
        setUniversity(user.university)
      })
      .catch((error) => {
        log.error(t('error.getUser') + ' ' + error)
        setUniversity('')
      })
  }, [])
  return useMemo(
    () => ({
      university
    }),
    [university]
  )
}
