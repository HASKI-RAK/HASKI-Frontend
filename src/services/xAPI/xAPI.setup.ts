import XAPI from '@xapi/xapi'
import {getConfig} from "@shared";

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
const lrs = getConfig().LRS

if (lrs === undefined) {
  // Handle the case when LRS is undefined, e.g., provide a default value or throw an error
  throw new Error('LRS is undefined')
}

const xAPI: XAPI = new XAPI({
  endpoint: lrs,
  auth: getConfig().LRS_AUTH,
  version: '1.0.3'
})

export default xAPI
