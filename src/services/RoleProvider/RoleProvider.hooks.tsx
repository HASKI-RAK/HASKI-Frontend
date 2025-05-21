import { useEffect, useState } from 'react'

import { RoleContextType } from '@services'
import { usePersistedStore } from '@store'

const useRoleProvider = (): RoleContextType => {
  const getUser = usePersistedStore((state) => state.getUser)
  const userCache = usePersistedStore((state) => state._user)
  const [isStudentState, setIsStudentState] = useState(false)
  const [isCourseCreatorState, setIsCourseCreatorState] = useState(false)

  useEffect(() => {
    getUser().then((user) => {
      setIsStudentState(user.role === 'student')
      setIsCourseCreatorState(user.role === 'course creator')
    })
  }, [userCache])

  return {
    isStudentRole: isStudentState,
    isCourseCreatorRole: isCourseCreatorState
  } as const
}

export { useRoleProvider }
