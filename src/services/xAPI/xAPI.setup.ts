import XAPI from '@xapi/xapi'

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
  auth: 'Basic ODJhZjczZDlkY2I0OWY5Mjg4N2I3ODNjOTdmNWM4OTZlZWVmM2Q2OGIxOTU2MTQxN2I3YTU0NjI3YzRiMjdhZjo4NDQ1MDIxOTQyY2YzZGMyYjNmZTZlODI0ZTliZDc5MzRhNzIzNDU3NTNhMDk3MTRmMjcxMzI1MzEzM2MzZjNm',
  version: '1.0.3'
})

export default xAPI
