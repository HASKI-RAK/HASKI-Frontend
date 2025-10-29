import { StudentBadgePostInput, StudentBadgePostReturn, StudentBadgeResponse } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../../RequestResponse'


export const postCheckStudentBadge: StudentBadgePostReturn = async (
    studentId: number,
    data: StudentBadgePostInput
): Promise<StudentBadgeResponse> => {
    return fetchData<StudentBadgeResponse>(`${getConfig().BACKEND}/student/${studentId}/badgeCheck`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}