import XAPI from '@xapi/xapi'
import { XAPIConfig } from '@xapi/xapi/dist/types/XAPIConfig'

export type xAPIProps = XAPIConfig & {
  username?: string
  password?: string
  //!: Which additional parameters are needed? LOOK PAPER
}

export type xAPIReturnProps = XAPI & {}

const getXAPIObject = (props: xAPIProps) => {
  const auth = props.username && props.password ? XAPI.toBasicAuth(props.username, props.password) : props.auth

  return {
    xAPI: new XAPI({
      endpoint: props.endpoint,
      auth: auth,
      version: props.version
    })
  }
}
