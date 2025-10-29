import { BadgeResponse, CourseBadgesReturn } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchCourseBadges: CourseBadgesReturn = async (
    courseId: string
): Promise<BadgeResponse> => {
  return fetchData<BadgeResponse>(`${getConfig().BACKEND}/course/${courseId}/badges`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
}