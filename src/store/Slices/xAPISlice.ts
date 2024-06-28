import XAPI from '@xapi/xapi'
import { StateCreator } from 'zustand'
import { PersistedStoreState } from '@store'
import { resetters } from '../Zustand/Store'

export default interface xAPISlice /*NOSONAR*/ {
  _xAPI: XAPI | undefined
  getXAPI: () => XAPI | undefined
  setXAPI: (endpoint: string, username: string, password: string) => void
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
export const createXAPISlice: StateCreator<PersistedStoreState, [], [], xAPISlice> = (set, get) => {
  resetters.push(() => set({ _xAPI: undefined }))
  return {
    _xAPI: undefined,
    getXAPI: () => {
      const xAPI = get()._xAPI
      return xAPI
    },
    setXAPI: (endpoint: string, username: string, password: string) => {
      const xAPI = new XAPI({
        endpoint: endpoint,
        auth: XAPI.toBasicAuth(username, password),
        version: '1.0.3'
      })
      set({ _xAPI: xAPI })
    }
  }
}
