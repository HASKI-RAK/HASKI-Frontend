import XAPI from '@xapi/xapi'

// Create LRS conncection
const endpoint = 'https://webhook.site/36fc7f53-621f-4d77-aae7-35c4a97ee1bc'
const username = '36fc7f53-621f-4d77-aae7-35c4a97ee1bc@email.webhook.site'
const password = 'test'

const auth = XAPI.toBasicAuth(username, password)

const xAPI: XAPI = new XAPI({
  endpoint: endpoint
  //auth: auth
})

export const supportingMedia = XAPI.AttachmentUsages.SUPPORTING_MEDIA

export default xAPI
