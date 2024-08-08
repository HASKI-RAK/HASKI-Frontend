import log from 'loglevel'
import { usePersistedStore } from '@store'
import { useState, useEffect, useMemo } from 'react'

export type UniversityHookReturn = {
  readonly university: string
}

export const useUniversity = (): UniversityHookReturn => {
  const [university, setUniversity] = useState('')
  const getUser = usePersistedStore((state) => state.getUser)
  useEffect(() => {
    //fetch the university from the current user and return university
    getUser().then((user)=> {
          setUniversity(user.university)
        })
        .catch((reason) => {
          log.error(reason)
          setUniversity('')
        })
    },[])
  return useMemo(
    () => ({
      university
    }),
    [university]
  )
}
