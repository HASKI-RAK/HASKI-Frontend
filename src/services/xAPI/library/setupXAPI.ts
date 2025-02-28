import BaseXAPI from '@xapi/xapi'
import { Versions } from '@xapi/xapi/dist/types/constants'

// TODO: Document the type
export type XAPIRepositories =
  | {
      component: string
      page: string
      verb: string
    }
  | string

// TODO: Document the type
export type XAPIConfig = {
  currentLanguage?: string
  onError?: (error: string) => void
  projectURL: string
  projectVersion: string
  repositories: XAPIRepositories
  userID?: string
}

// TODO: Document the type
export type XAPI = XAPIConfig & { xAPI: BaseXAPI }

// TODO: Document the function
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
