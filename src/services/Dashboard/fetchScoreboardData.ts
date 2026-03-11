import { ScoreboardDataReturn, ScoreboardResponse } from '@core'
import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'

export const fetchScoreboardData: ScoreboardDataReturn = async (
  userId,
  courseId,
  courseLmsId,
  topicId,
  since,
  until
) => {
  const base = getConfig().BACKEND + `/user/${userId}/`
  const path =
    (topicId && `course/${courseId}/topic/${topicId}/scoreboard`) ||
    (courseId && `course/${courseId}/${courseLmsId}/scoreboard`) ||
    'scoreboard'
  const url = new URL(base + path)
  if (since) url.searchParams.append('since', since.toISOString())
  if (until) url.searchParams.append('until', until.toISOString())

  return fetchData<ScoreboardResponse>(url.toString(), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
