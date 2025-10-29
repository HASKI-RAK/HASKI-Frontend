import { StudentBadgeResponse, StudentBadgeReturn } from "@core"
import { getConfig } from "@shared"
import { fetchData } from "../../RequestResponse"

export const fetchStudentBadge: StudentBadgeReturn = async (
    studentId: string
): Promise<StudentBadgeResponse> => {
    return fetchData<StudentBadgeResponse>(`${getConfig().BACKEND}/student/${studentId}/studentBadge`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}
