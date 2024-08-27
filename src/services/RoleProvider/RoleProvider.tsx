import React from 'react'
import RoleContext, { RoleContextType } from '../RoleContext/RoleContext'
import { useRoleProvider as _useRoleProvider } from './RoleProvider.hooks'

type RoleProviderProps = {
  children: React.ReactNode
  useRoleProvider?: () => RoleContextType
}

const RoleProvider = ({ useRoleProvider = _useRoleProvider, ...props }: RoleProviderProps) => (
  <RoleContext.Provider value={useRoleProvider()}>{props.children}</RoleContext.Provider>
)

export default RoleProvider
