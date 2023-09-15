import XAPI, { Statement } from '@xapi/xapi'
import { Button } from '@mui/material'

// Create LRS connection
const endpoint = 'https://webhook.site/36fc7f53-621f-4d77-aae7-35c4a97ee1bc'
const username = '36fc7f53-621f-4d77-aae7-35c4a97ee1bc@email.webhook.site'
const password = ''
const auth = XAPI.toBasicAuth(username, password)
const xapi: XAPI = new XAPI({
  endpoint: endpoint,
  auth: auth
})

const myStatement: Statement = {
  actor: {
    objectType: 'Agent',
    name: 'Test Agent',
    mbox: 'mailto:hello@example.com'
  },
  verb: {
    id: 'http://example.com/verbs/tested',
    display: {
      'en-GB': 'tested'
    }
  },
  object: {
    objectType: 'Activity',
    id: 'https://github.com/xapijs/xapi'
  }
}

const handleClick = () => {
  xapi.sendStatement({
    statement: myStatement
  })
}

const XapiTest = () => {
  return (
    <>
      <Button onClick={handleClick}>Send statement</Button>
    </>
  )
}

export default XapiTest
