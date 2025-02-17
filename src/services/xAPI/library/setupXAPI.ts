import BaseXAPI from '@xapi/xapi'
import { Versions } from '@xapi/xapi/dist/types/constants'

export type XAPIRepositories = {
  component: string
  page: string
  verb: string
} | string

export type XAPIConfig = {
  projectURL: string
  projectVersion: string
  repositories: XAPIRepositories
  translateToEN: (key: string) => string
  userAuthenticated: boolean
  userID: string
  userLocation: string
}

export type XAPI = XAPIConfig & { xAPI: BaseXAPI }

export const setupXAPI = ({
  xAPI,
  ...props
}: XAPIConfig & {
  xAPI: {
    auth: { username: string; password: string } | string
    endpoint: string
    version: Versions
  }
}): XAPI => ({
  ...props,
  xAPI: new BaseXAPI({
    auth: typeof xAPI.auth === 'string' ? xAPI.auth : BaseXAPI.toBasicAuth(xAPI.auth.username, xAPI.auth.password),
    endpoint: xAPI.endpoint,
    version: xAPI.version,
    adapter: 'fetch'
  })
})

