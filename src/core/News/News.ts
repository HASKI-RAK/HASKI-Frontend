type NewsList = {
  newslist: News[]
}

type News = {
  expiration_date: Date
  news_content: string
}
export default News
export type { NewsList }
