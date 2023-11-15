import XAPI from '@xapi/xapi'
import { getConfig } from '@shared'

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

const xAPI: XAPI = new XAPI({
  endpoint: 'https://lrs.haski.app/xapi',
  auth: 'Basic OGQ2OWEzZGNkZmI2Y2YyNzBkZGI2OGJlOGQ0ZWEwMTBmMTI1YTU4YTI5NTVjZDg0YmQyODk3OTk5YzE4YTI2NjplMzU1MjUxNTE5ZjM2OGQ3YWQ2ZTg2ODM3ZWNmMjE0MDZiZGFmZTBhZjVmMTE1NTI0OWM5Y2U5YzhmYzU0OTEz',
  version: '1.0.3'
})

export default xAPI
