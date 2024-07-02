import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { useStore } from '../Zustand/Store'

describe('NewsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch news and cache them', async () => {
    const { getNews } = useStore.getState()
    const news = {
      news: [
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 1,
          language_id: 'en',
          news_content: 'We are currently testing the site',
          university: 'HS-AS'
        },
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 2,
          language_id: 'en',
          news_content: 'We are currently testing the site',
          university: 'HS-AS'
        }
      ]
    }

    const languageId = 'en'
    const university = 'HS-AS'

    const result = await getNews(languageId, university)

    expect(result).toEqual(news)
    expect(getNews).toBeDefined()
    expect(getNews).toBeInstanceOf(Function)
    expect(mockServices.fetchNews).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchNews).toHaveBeenCalledWith('en', 'HS-AS')
    expect(useStore.getState()._news[`${languageId}-${university}`]).toEqual(news)
    expect(getNews).not.toThrow() // counts as function call (getCourses), here it would be Called 2 times instead of 1
  })

  it('should return cached news if available', async () => {
    const { getNews } = useStore.getState()
    const news = [
      {
        date: 'Thu, 13 Jul 2023 16:00:00 GMT',
        expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
        id: 1,
        language_id: 'de',
        news_content: 'We are currently testing the site',
        university: null
      }
    ]
    mockServices.fetchNews = jest.fn().mockResolvedValueOnce(news)

    const languageId = 'en'
    const university = 'HS-AS'

    await getNews(languageId, university)

    expect(useStore.getState()._news[`${languageId}-${university}`]).toEqual(news)

    const cached = await getNews('en', 'HS-AS')

    expect(mockServices.fetchNews).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(news)
  })
})
