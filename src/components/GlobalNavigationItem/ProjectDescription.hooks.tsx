import { useContext, useEffect, useMemo, useState } from 'react'
import { GlobalNavigationItemReturn } from './GlobalNavigationItem.hooks'

// Comment
export const useProjectDescription = (): GlobalNavigationItemReturn => {
  // States
  const isLoading = false
  const content = [
    { name: 'Project Description', url: '/projectinformation/projectdescription' },
    { name: 'Glossary', url: '/projectinformation/glossary' },
    { name: 'About Us', url: '/projectinformation/aboutus' }
  ]

  return useMemo(
    () => ({
      content,
      isLoading
    }),
    [content, isLoading]
  )
}
