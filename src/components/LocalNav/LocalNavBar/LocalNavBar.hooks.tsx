import { LocalNavItemProps } from '@components'

export type LocalNavBarHookReturn = {
  isLoading: boolean
  localNavItems: LocalNavItemProps[]
}

export const useLocalNavBar = (): LocalNavBarHookReturn => {
  return {
    isLoading: false,
    localNavItems: []
  }
}
