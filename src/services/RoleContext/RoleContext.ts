import { createContext } from 'react'

export type RoleContextType = {
  isStudentRole: boolean
  isCourseCreatorRole: boolean
}
const RoleContext = createContext<RoleContextType>({
  isStudentRole: false,
  isCourseCreatorRole: false
})
export default RoleContext
