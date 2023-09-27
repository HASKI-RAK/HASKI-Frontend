import XAPI from '@xapi/xapi'

// Create LRS conncection
const endpoint = 'http://127.0.0.1:5000/endpoint'
const username = 'test'
const password = 'test'

const auth = XAPI.toBasicAuth(username, password)

const xAPI: XAPI = new XAPI({
  endpoint: endpoint,
  auth: auth
})

export const supportingMedia = XAPI.AttachmentUsages.SUPPORTING_MEDIA

export default xAPI
