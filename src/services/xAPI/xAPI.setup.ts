import XAPI from '@xapi/xapi'

// Create LRS conncection
// endpoint: endpoint url
// auth: string with basic auth credentials
// version: used xAPI version
/**
 *
 */
const xAPI: XAPI = new XAPI({
  endpoint: 'http://127.0.0.1:5000/endpoint',
  auth: XAPI.toBasicAuth('test', 'test'),
  version: '1.0.3'
})

export default xAPI
