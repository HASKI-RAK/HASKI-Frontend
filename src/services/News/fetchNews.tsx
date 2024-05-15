import { getConfig } from '@shared'
import { fetchData } from '../RequestResponse'
import { NewsList } from '@core'

/**
 *
 * @returns {@link News} object
 */
export const fetchNews = async (languageId?: string, university?: string): Promise<NewsList> => {
  return fetchData<NewsList>(getConfig().BACKEND + `/news?language_id=${languageId}&university=${university}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}