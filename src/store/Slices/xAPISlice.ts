import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'
import { XAPI } from 'src/services/xAPI/library/setupXAPI' 

export default interface XAPISlice {
  _xAPI: XAPI | undefined
  getXAPI: () => XAPI | undefined
  setXAPI: (xAPI: XAPI) => void
}

/**
 * xAPI object.
 *
 * @prop endpoint - URL to LRS endpoint
 * @prop auth - Credentials to login to LRS
 * @prop version - xAPI version
 *
 * @remarks
 * xAPI object that is used to send statements to an LRS with the URL and credentials of the endpoint.
 * Adds xAPI version to the header of an xAPI statement.
 *
 * @category Services
 */
export const createXAPISlice: StateCreator<PersistedStoreState, [], [], XAPISlice> = (set, get) => {
  resetters.push(() => set({ _xAPI: undefined }))
  return {
    _xAPI: undefined,
    getXAPI: () => {
      const xAPI = get()._xAPI
      return xAPI
    },
    setXAPI: (xAPI: XAPI) => {
      set({ _xAPI: xAPI })
    }
  }
}