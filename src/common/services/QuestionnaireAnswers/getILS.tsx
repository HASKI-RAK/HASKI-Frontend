import { ILS } from '@core'
import { getData } from '../RequestResponse'
import {ILSReturn} from "../../core/QuestionnaireResults/ILS";

export const getILS: ILSReturn = async (
    userId,
    lmsUserId,
    studentId
) => {
    const response = await fetch(
        process.env.BACKEND +
        `/user/${userId}/${lmsUserId}/student/${studentId}/learningStyle`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return getData<ILS>(response)
}
