import type { BadgeResponse, PostBadgeReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const postBadge: PostBadgeReturn = async (course_id, topic_id) => {
  return fetchData<BadgeResponse>(`${getConfig().BACKEND}/course/${course_id}/topic/${topic_id}/badges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}
export default postBadge
