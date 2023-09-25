// TODO: Folder structure: xAPI / statements
// xAPI / setup
import { myStatement } from './xAPI.statements'
import xAPI from './xAPI.setup'
import { Button } from '@mui/material'
import postStatement from './postStatement'

// sendStatement eventuell auch noch auslagern
const handleClick = () => {
  xAPI
    .sendStatement({
      statement: myStatement
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
/*,
attachments: [arrayBuffer]*/

const handleClick2 = async () => {
  postStatement({ statement: myStatement })
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
      <Button onClick={handleClick}>Send statement</Button>
    </>
  )
}

export default XapiTest
