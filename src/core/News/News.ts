type NewsReturn = (languageId?: string, university?: string) => Promise<NewsList>

type NewsList = {
  news: News[]
}

type News = {
  news_content: string
}
export default News
export type { NewsList, NewsReturn }
