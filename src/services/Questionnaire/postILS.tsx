import {getData} from "../RequestResponse";
import {ILS} from "@core";

interface PostILSProps {
  studentId: number
  outputJson: string
}

export const postILS = async ({ studentId, outputJson }: PostILSProps): Promise<ILS> => {
    const response = await fetch(process.env.BACKEND + `/lms/student/${studentId}/questionnaire/ils`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: outputJson
    })

    return getData<ILS>(response)
}
