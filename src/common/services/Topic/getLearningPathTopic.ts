import { LearningPathTopic, LearningPathTopicReturn } from '@core'

export const getLearningPathTopic: LearningPathTopicReturn = async (userId, lmsUserId, studentId, course_id) => {
    if (!course_id) {
        throw new Error('course_id is required')
    }
    return fetch(
        process.env.BACKEND +
        `/user/${userId}/${lmsUserId}/student/${studentId}/course/${course_id}/topic`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if (response.ok) {
            return response.json().then((data: unknown) => {
                return data as LearningPathTopic
            })
        } else {
            // If response has error variable, then throw error
            return response.json().then((data) => {
                if ('error' in data) {
                    throw new Error(data['error'] + ' ' + data['message'])
                } else {
                    throw new Error('Unknown error')
                }
            })
        }
    })
}
