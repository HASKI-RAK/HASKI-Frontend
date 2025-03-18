import { StateCreator } from 'zustand'
import { fetchDisabledClassifications } from '@services'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface DisabledClassificationsSlice {
  _disabledClassifications: Record<string, string[] | undefined>
  getDisabledClassifications: (university: string) => Promise<string[]>
  clearDisabledClassificationsCache: () => void
}

export const createDisabledClassifications: StateCreator<PersistedStoreState, [], [], DisabledClassificationsSlice> = (
  set,
  get
) => {
  resetters.push(() => set({ _disabledClassifications: {} }))
  return {
    _disabledClassifications: {},
    clearDisabledClassificationsCache: () => {
      set({ _disabledClassifications: {} })
    },
    getDisabledClassifications: async (university: string) => {
      const cached = get()._disabledClassifications[`${university}`]

      if (!cached) {
        const disabledClassifications = await fetchDisabledClassifications(university)
        set({
          _disabledClassifications: {
            ...get()._disabledClassifications,
            [`${university}`]: disabledClassifications
          }
        })
        return disabledClassifications
      } else return cached
    }
  }
}
