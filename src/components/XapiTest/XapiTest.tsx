// TODO: Folder structure: xAPI / statements
// services / xAPI / xAPI.setup.ts
// services / xAPI / xAPI.statements.ts

import { xAPI, myStatement2, sendMyStatement, sendOnClickStatement, getOnClickStatement } from '@services'
import { Button } from '@mui/material'
import { postStatement } from './postStatement'
import { get } from 'http'

const handleClick2 = async () => {
  postStatement({ statement: myStatement2 })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
// <Button onClick={() => sendMyStatement('Harald Töpfer')}>Send statement</Button>
const XapiTest = () => {
  // sendStatement eventuell auch noch auslagern
  const handleClick = async (s: string) => {
    await sendOnClickStatement(s)
  }

  return (
    <>
      <Button
        href={'#test-button'}
        // document.getElementById('button')[2]!.getAttribute('href')!
        onClick={() => handleClick('test')}>
        Send statement
      </Button>
    </>
  )
}

export default XapiTest
