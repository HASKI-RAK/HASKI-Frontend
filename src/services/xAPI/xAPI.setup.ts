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
  endpoint: getConfig().LRS ?? '', // 'http://127.0.0.1:5000/endpoint', // 'https://dev.lrs.haski.app/xapi', //
  auth: 'Basic MmUzYzEwMGJlNDRkNDI0MGM5MmJhN2Y3NzY4YzMwMDllNzU0MTBlZjJjNTQ4YzNkYWJlZjY0ZTlmYTZhODIzNjphNjFiYjQwYTAzMzMyNWM4NTZmYzcxNzZmZmRjZGE5MjgyZGQxYzcwMWIzOWM2ZDc3NGY2NTA3YzNjNjFhNzJm', // getConfig().LRS_AUTH,
  version: '1.0.3'
})

export default xAPI
