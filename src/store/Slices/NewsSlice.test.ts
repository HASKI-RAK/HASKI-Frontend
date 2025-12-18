import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { NewsResponse } from '@core'
import { useSessionStore } from '@store'

const createDeferred = <T>() => {
  const deferred: { resolve?: (value: T) => void; reject?: (reason?: any) => void } = {}
  const promise = new Promise<T>((res, rej) => {
    deferred.resolve = res
    deferred.reject = rej
  })
  return { promise, resolve: deferred.resolve!, reject: deferred.reject! }
}

describe('NewsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('[HASKI-REQ-0046] should fetch news and cache them', async () => {
    const { getNews } = useSessionStore.getState()
    const news = {
      news: [
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 1,
          language_id: 'en',
          news_content: 'We are currently testing the site',
          university: 'TH-AB'
        },
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 2,
          language_id: 'en',
          news_content: 'We are currently testing the site',
          university: 'TH-AB'
        }
      ]
    }

    const languageId = 'en'
    const university = 'TH-AB'

    const result = await getNews(languageId, university)

    expect(result).toEqual(news)
    expect(getNews).toBeDefined()
    expect(getNews).toBeInstanceOf(Function)
    expect(mockServices.fetchNews).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchNews).toHaveBeenCalledWith('en', 'TH-AB')
    expect(useSessionStore.getState()._news[`${languageId}-${university}`]).toEqual({
      value: {
        news: [
          {
            date: 'Thu, 13 Jul 2023 16:00:00 GMT',
            expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
            id: 1,
            language_id: 'en',
            news_content: 'We are currently testing the site',
            university: 'TH-AB'
          },
          {
            date: 'Thu, 13 Jul 2023 16:00:00 GMT',
            expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
            id: 2,
            language_id: 'en',
            news_content: 'We are currently testing the site',
            university: 'TH-AB'
          }
        ]
      }
    })
    expect(getNews).not.toThrow() // counts as function call (getCourses), here it would be Called 2 times instead of 1
  })

  it('[HASKI-REQ-0046] should return cached news if available', async () => {
    const { getNews } = useSessionStore.getState()
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
    const university = 'TH-AB'

    await getNews(languageId, university)

    expect(useSessionStore.getState()._news[`${languageId}-${university}`]).toEqual({
      value: [
        {
          date: 'Thu, 13 Jul 2023 16:00:00 GMT',
          expiration_date: 'Sun, 20 Apr 2025 16:00:00 GMT',
          id: 1,
          language_id: 'de',
          news_content: 'We are currently testing the site',
          university: null
        }
      ]
    })

    const cached = await getNews('en', 'TH-AB')

    expect(mockServices.fetchNews).toHaveBeenCalledTimes(1)

    expect(cached).toEqual(news)
  })

  it('[HASKI-REQ-0046] should return the cached promise if a fetch is already pending', async () => {
    const deferred = createDeferred<NewsResponse>()

    mockServices.fetchNews = jest.fn(() => deferred.promise)

    const languageId = 'en'
    const university = 'TH-AB'

    const { getNews } = useSessionStore.getState()

    const promise1 = getNews(languageId, university)
    // Second call (before the promise resolves) should return the same in-flight promise.
    const promise2 = getNews(languageId, university)

    // Ensure fetchNews was called only once.
    expect(mockServices.fetchNews).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchNews).toHaveBeenCalledWith(languageId, university)

    // Now resolve the deferred promise with a fake NewsResponse.
    const fakeNews: NewsResponse = {
      news: [
        {
          news_content: 'Thu, 13 Jul 2023 16:00:00 GMT, Hello everyone'
        }
      ]
    }
    deferred.resolve(fakeNews)

    // Await the resolution of the promise.
    const result1 = await promise1
    const result2 = await promise2

    // Both results should match the fakeNews object.
    expect(result1).toEqual(fakeNews)
    expect(result2).toEqual(fakeNews)
  })
})
