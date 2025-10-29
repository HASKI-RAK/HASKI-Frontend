import { BadgeResponse, BadgeReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchTopicBadges: BadgeReturn = async (topic_id: string) => {
  return fetchData<BadgeResponse>(`${getConfig().BACKEND}/topic/${topic_id}/badges`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}
