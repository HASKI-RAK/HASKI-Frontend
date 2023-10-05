// TODO: Folder structure: xAPI / statements
// services / xAPI / xAPI.setup.ts
// services / xAPI / xAPI.statements.ts

import { xAPI, myStatement2, sendMyStatement } from '@services'
import { Button } from '@mui/material'
import { postStatement } from './postStatement'

// sendStatement eventuell auch noch auslagern
const handleClick = () => {
  xAPI
    .sendStatement({
      statement: myStatement2
    })
    .then((response: any) => {
      console.log(response)
    })
    .catch((error: any) => {
      console.log(error)
    })
}

const handleClick2 = async () => {
  postStatement({ statement: myStatement2 })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

const XapiTest = () => {
  return (
    <>
      <Button onClick={() => sendMyStatement('Harald Töpfer')}>Send statement</Button>
    </>
  )
}

export default XapiTest
