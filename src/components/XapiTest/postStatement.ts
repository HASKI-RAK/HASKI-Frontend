import { getData } from '../../services/RequestResponse'
// import { Statement } from '../../../node_modules/@xapi/xapi/dist/types/resources/statement'
import { SendStatementParams } from '../../../node_modules/@xapi/xapi/dist/types/resources/statement/sendStatement/SendStatementParams'

export const postStatement = async (params: SendStatementParams): Promise<string[]> => {
  //const response = await fetch('https://haski.free.beeceptor.com', {
  const response = await fetch('http://127.0.0.1:5000/endpoint/statements', {
    method: 'POST',
    //credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params.statement)
  })
  return getData<string[]>(response)
}
