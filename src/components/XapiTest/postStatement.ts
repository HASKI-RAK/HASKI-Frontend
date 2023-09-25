import { getData } from '../../services/RequestResponse'
// import { Statement } from '../../../node_modules/@xapi/xapi/dist/types/resources/statement'
import { SendStatementParams } from '../../../node_modules/@xapi/xapi/dist/types/resources/statement/sendStatement/SendStatementParams'

const sendStatement = async (params: SendStatementParams): Promise<string[]> => {
  const response = await fetch('https://xapi1.free.beeceptor.com', {
    method: 'POST',
    //credentials: 'include',
    headers: {
      // 'Content-Type': 'application/json'
      'Content-Type': 'multipart/form-data'
    },
    body: JSON.stringify(params.statement)
  })
  return getData<string[]>(response)
}

export default sendStatement
