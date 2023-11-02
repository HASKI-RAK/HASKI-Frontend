import XAPI from '@xapi/xapi'

// Create LRS connection
// endpoint: endpoint url
// auth: string with basic auth credentials
// version: used xAPI version
/**
 * getConfig in config.ts
 * variablen in public/config
 */
const xAPI: XAPI = new XAPI({
  endpoint: 'http://127.0.0.1:5000/endpoint', //'https://dev.lrs.haski.app/xapi', //
  auth: 'Basic MmUzYzEwMGJlNDRkNDI0MGM5MmJhN2Y3NzY4YzMwMDllNzU0MTBlZjJjNTQ4YzNkYWJlZjY0ZTlmYTZhODIzNjphNjFiYjQwYTAzMzMyNWM4NTZmYzcxNzZmZmRjZGE5MjgyZGQxYzcwMWIzOWM2ZDc3NGY2NTA3YzNjNjFhNzJm', // XAPI.toBasicAuth('test', 'test'),
  version: '1.0.3'
})

export default xAPI
