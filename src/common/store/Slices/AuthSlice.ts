import { User } from '@core'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { getLoginStatus, getUser } from '@services'

export default interface AuthSlice {
    expire: number // Unix timestamp
    setExpire: (value: number) => void
}

export const createAuthSlice: StateCreator<PersistedStoreState, [], [], AuthSlice> = (set, get) => ({
    expire: 0,
    setExpire: (value: number) => {
        set({ expire: value })
    }

    // isAuth: async () => {
    //     const cached = get()._isAuth

    //     if (!cached) {
    //         const loginStatus = await getLoginStatus()
    //         if (loginStatus.status === 200) {
    //             const user: User = await getUser()
    //             set({ _user: user, _isAuth: true })
    //         } else {
    //             set({ _isAuth: false })
    //         }
    //     }
    //     return get()._isAuth
    // }
})
