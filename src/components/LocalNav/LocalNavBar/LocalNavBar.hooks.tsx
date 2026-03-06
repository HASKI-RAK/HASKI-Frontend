import { LocalNavItemProps } from '../LocalNavItem/LocalNavItem'

export type LocalNavBarHookReturn = {
  isLoading: boolean
  localNavItemProps: LocalNavItemProps[]
  // Todo: Title?????
}

export const useLocalNavbar = (): LocalNavBarHookReturn => {
  return {
    isLoading: false,
    localNavItemProps: []
  }
}
