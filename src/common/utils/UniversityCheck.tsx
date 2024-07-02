import log from 'loglevel'
import { usePersistedStore } from '@store'
import { useMemo } from 'react'

export type UniversityCheckReturn = {
  readonly checkUniversity: () => Promise<string>
}

export const UniversityCheck = (): UniversityCheckReturn => {
  const getUser = usePersistedStore((state) => state.getUser)
  //fetch the university from the current user and return university
  const checkUniversity = async () => {
    return getUser()
      .then((user) => {
        return user.university
      })
      .catch((reason) => {
        log.error(reason)
        return ''
      })
  }

  return useMemo(
    () => ({
      checkUniversity
    }),
    [checkUniversity]
  )
}
