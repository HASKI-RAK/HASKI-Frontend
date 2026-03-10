import { LocalNavItemProps } from '@components'

export type LocalNavBarHookReturn = {
  readonly isLoading: boolean
  readonly localNavItems: LocalNavItemProps[]
  readonly localNavTitle: string
}

export const useLocalNavBar = (): LocalNavBarHookReturn => {
  return {
    isLoading: false,
    localNavItems: [],
    localNavTitle: ''
  }
}
