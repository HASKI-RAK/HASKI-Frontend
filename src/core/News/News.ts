type NewsReturn = (languageId?: string, university?: string) => Promise<NewsResponse>

type NewsResponse = {
  news: News[]
}

type News = {
  news_content: string
}
export default News
export type { NewsResponse, NewsReturn }
