import XAPI from '@xapi/xapi'
import { Versions } from '@xapi/xapi/dist/types/constants'

export type XAPIConfig = {
  projectURL: string
  projectVersion: string
  repositories: { componentRepository: string; pageRepository: string; verbRepository: string } | string
  translateToEN: (key: string) => string
  userAuthenticated: boolean
  userID: string
  userLocation: string
}

export const setupXAPI = ({
  xAPI,
  ...props
}: XAPIConfig & {
  xAPI: {
    auth: { username: string; password: string } | string
    endpoint: string
    version: Versions
  }
}): XAPIConfig & { xAPI: XAPI } => ({
  ...props,
  xAPI: new XAPI({
    auth: typeof xAPI.auth === 'string' ? xAPI.auth : XAPI.toBasicAuth(xAPI.auth.username, xAPI.auth.password),
    endpoint: xAPI.endpoint,
    version: xAPI.version
  })
})
