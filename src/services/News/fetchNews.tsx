import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { NewsResponse } from '@core'

/**
 *
 * @returns {@link News} object
 */
export const fetchNews = async (languageId?: string, university?: string): Promise<NewsResponse> => {
  return fetchData<NewsResponse>(getConfig().BACKEND + `/news?language_id=${languageId}&university=${university}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
