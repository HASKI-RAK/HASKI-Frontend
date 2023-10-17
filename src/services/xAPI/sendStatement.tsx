import { xAPI, getOnClickStatement } from '@services'

export const sendOnClickStatement = async (s: string) => {
  const statement = getOnClickStatement(s)
  console.log(statement)
  xAPI.sendStatement({ statement: statement })
}
