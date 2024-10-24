import { useEffect, useState } from 'react'
import { usePersistedStore } from '@store'
import { RoleContextType } from '../RoleContext/RoleContext'

const useRoleProvider = (): RoleContextType => {
  const getUser = usePersistedStore((state) => state.getUser)
  const [isStudentState, setIsStudentState] = useState(false)
  const [isCourseCreatorState, setIsCourseCreatorState] = useState(false)

  useEffect(() => {
    getUser().then((user) => {
      setIsStudentState(user.role === 'student')
      setIsCourseCreatorState(user.role === 'course creator')
    })
  }, [getUser, setIsStudentState, setIsCourseCreatorState])

  return {
    isStudentRole: isStudentState,
    isCourseCreatorRole: isCourseCreatorState
  } as const
}

export { useRoleProvider }
